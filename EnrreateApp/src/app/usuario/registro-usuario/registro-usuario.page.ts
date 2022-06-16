import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/modelo/usuario';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';
import * as moment from 'moment';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {

  //Inicializamos el usuario al que le cargaremos los datos del formulario de registro
  usuario: Usuario = new Usuario();
  private validation_registro_usuario: FormGroup;
  private usuarios = new Array<Usuario>();
  nombreDuplicado: boolean;



  constructor(public firebaseAuthService: FirebaseAuthService, private router: Router, public formBuilder: FormBuilder, public apiService: ApiServiceProvider, public menuCtrl: MenuController, private alertController: AlertController) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.apiService.getUsuarios()
      .then((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      })
      .catch((error: string) => {
        console.log(error);
      });


    //Inicializamos el formulario reactivo que controlará el formato del email y que la contraseña no se deje vacía.
    this.validation_registro_usuario = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      apellidos: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      nombreUsuario: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      fechaNacimiento: new FormControl('', Validators.compose([
        Validators.required
      ])),
      correo: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)]
      )),
      contrasena: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      contrasenaConfirmada: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  onSubmit(values) {
    this.nombreDuplicado = false;
    this.usuario.nombre = values['nombre'];
    this.usuario.apellidos = values['apellidos'];
    this.usuario.nombreUsuario = values['nombreUsuario'];
    this.usuario.fechaNacimiento = values['fechaNacimiento'];
    this.usuario.correo = values['correo'];
    this.usuario.imagenPerfil = "https://firebasestorage.googleapis.com/v0/b/proyecto-fin-grado-1.appspot.com/o/sinfoto.jpeg?alt=media&token=97bb7a51-3dd9-478c-a795-3b6e734259e5";

    for (let inx in this.usuarios) {
      if (this.usuarios[inx].nombreUsuario == values['nombreUsuario']) {
        this.nombreDuplicado = true
      } else {
        this.nombreDuplicado = false
      }
    }

    if (this.nombreDuplicado == true) {
      this.abrirVentanaNombreUsuarioDuplicado();
    } else {
      if (values['contrasena'] != values['contrasenaConfirmada']) {
        this.abrirVentanaContrasenaNoIgual();
      } else if (values['contrasena'] == values['contrasenaConfirmada']) {

        if (!this.chequeoMayorEdad(values['fechaNacimiento'])) {
          this.abrirVentanaFechaIncorrecta();
        } else {
          this.registroUsuario(values['correo'], values['contrasena']);
          values=null;
        }
      }
    }


  }

  //Método asíncrono que registra a un nuevo usuario en la aplicación
  async registroUsuario(email: string, contrasena: string) {

    //TODO: Este método tambien guardará los objetos usuario en la base de datos, para posteriormente con su uid de firebase comprobar el role que tiene y asi dar acceso a un sitio u otro.

    this.firebaseAuthService.registerUser(email, contrasena)
      .then((data) => {
        console.log("Registro Usuario Exitoso");
        this.firebaseAuthService.userDetails()
          .subscribe(data => {
            this.usuario.uidUsuario = data.uid;
            this.apiService.insertarUsuario(this.usuario);
          });
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log("Error en el registro: " + error);
        this.abrirVentanaCorreoDuplicado();

      });
  }

  abrirRegistroEstablecimiento() {
    this.router.navigate(['/registro-establecimiento']);
  }

  irLoginApp() {
    this.router.navigate(['/home']);
  }

  async abrirVentanaCorreoDuplicado() {
    const alert = await this.alertController.create({
      header: 'Ya existe una cuenta asociada a este correo',
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.alertController.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

  async abrirVentanaNombreUsuarioDuplicado() {
    const alert = await this.alertController.create({
      header: 'Este nombre de usuario ya está ocupado',
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.alertController.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

  async abrirVentanaContrasenaNoIgual() {
    const alert = await this.alertController.create({
      header: 'Las contraseñas no coinciden',
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.alertController.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }


  async abrirVentanaFechaIncorrecta() {
    const alert = await this.alertController.create({
      header: 'Lo sentimos, no eres mayor de edad...',
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.alertController.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

  chequeoMayorEdad(fecha: Date) {
    return moment(fecha).add(18, 'years') <= moment();
  }
  
}
