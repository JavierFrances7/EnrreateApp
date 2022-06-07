import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Administrador } from '../modelo/Administrador';
import { Establecimiento } from '../modelo/Establecimiento';
import { Usuario } from '../modelo/usuario';
import { ApiServiceProvider } from '../providers/api-service/apiservice';
import { FirebaseAuthService } from '../providers/firebase-auth-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private validation_login: FormGroup;
  private usuarios = new Array<Usuario>();
  private establecimientos = new Array<Establecimiento>();
  private administradores = new Array<Administrador>();


  constructor(public firebaseAuthService: FirebaseAuthService, private router: Router, public formBuilder: FormBuilder, public apiServiceProvider: ApiServiceProvider) { }

  ngOnInit() {

    //Obtenemos todos los uids (Sin más información) de los usuarios para comprobar luego la redirección al inicio de usuario al hacer login

    this.apiServiceProvider.getUidsUsuarios()
      .then((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      })
      .catch((error: string) => {
        console.log(error);
      });

    //Obtenemos todos los uids (Sin más información) de los establecimientos para comprobar luego la redirección al inicio de establecimiento al hacer login

    this.apiServiceProvider.getUidsEstablecimientos()
      .then((establecimientos: Establecimiento[]) => {
        this.establecimientos = establecimientos;
      })
      .catch((error: string) => {
        console.log(error);
      });

    //Obtenemos todos los uids (Sin más información) de los administradores para comprobar luego la redirección al inicion de admin al hacer login

    this.apiServiceProvider.getUidsAdmins()
      .then((administradores: Administrador[]) => {
        this.administradores = administradores;
      })
      .catch((error: string) => {
        console.log(error);
      });

    //Obtenemos todos los uids (Sin más información) de los establecimientos para comprobar luego la redirección al inicio de establecimiento al hacer login

    this.apiServiceProvider.getUidsEstablecimientos()
      .then((establecimientos: Establecimiento[]) => {
        this.establecimientos = establecimientos;
      })
      .catch((error: string) => {
        console.log(error);
      });

    //Inicializamos el formulario reactivo que controlará el formato del email y que la contraseña no se deje vacía.

    this.validation_login = this.formBuilder.group({
      correo: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
      )),
      contrasena: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  onSubmit(values) {

    //Al pulsar el boton de sumbit se inicia el metodo login con los valores del formulario.

    this.loginUsuario(values['correo'], values['contrasena'])
  }


  //Método asíncrono que inicia sesión en la aplicación comprobando el rol de usuario

  async loginUsuario(email: string, contrasena: string) {
    this.firebaseAuthService.loginUser(email, contrasena)
      .then((data) => {
        console.log("Login Exitoso");
        this.firebaseAuthService.userDetails()
          .subscribe(data => {

            if (data != null) {

              for (let inx in this.administradores) {

                //Comprobamos si es un admin

                if (data.uid == this.administradores[inx].uidAdministrador) {

                  this.router.navigate(['/inicio-admin']);

                }
              }

              for (let inx in this.establecimientos) {

                //Comprobamos si es un establecimiento

                if (data.uid == this.establecimientos[inx].uidEstablecimiento) {

                  this.router.navigate(['/inicio-establecimiento']);

                }
              }

              //Comprobamos si el usuario es un usuario

              for (let inx in this.usuarios) {

                if (data.uid == this.usuarios[inx].uidUsuario) {

                  this.router.navigate(['/inicio-usuario-base']);

                }
              }
            }
          });
      })
      .catch((error) => {
        console.log("Error en el login: " + error);
        this.router.navigate(['/home']);
      });
  }

  //Método que redirecciona a la página de registro de usuarios

  abrirRegistroUsuario() {
    this.router.navigate(['/registro-usuario']);
  }

}
