import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/modelo/usuario';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  
  //Inicializamos el usuario al que le cargaremos los datos del formulario de registro
  usuario: Usuario=new Usuario();
  private validation_registro_usuario: FormGroup;


  constructor(public firebaseAuthService: FirebaseAuthService, private router: Router, public formBuilder: FormBuilder, public apiService : ApiServiceProvider, public menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false);

        //Inicializamos el formulario reactivo que controlará el formato del email y que la contraseña no se deje vacía.
        this.validation_registro_usuario = this.formBuilder.group({
          nombre: new FormControl('', Validators.compose([
            Validators.required
          ])),
          apellidos: new FormControl('', Validators.compose([
            Validators.required
          ])),      
          nombreUsuario: new FormControl('', Validators.compose([
            Validators.required
          ])),
          fechaNacimiento: new FormControl('', Validators.compose([
            Validators.required
          ])),
          correo: new FormControl('', Validators.compose([
            Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]     
            )),
            contrasena: new FormControl('', Validators.compose([
              Validators.required
            ])),
            contrasenaConfirmada: new FormControl('', Validators.compose([
                Validators.required]))
          });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  onSubmit(values) {
    this.usuario.nombre=values['nombre'];
    this.usuario.apellidos=values['apellidos'];
    this.usuario.nombreUsuario=values['nombreUsuario'];
    this.usuario.fechaNacimiento=values['fechaNacimiento'];
    this.usuario.correo=values['correo'];
    this.registroUsuario(values['correo'], values['contrasena']);
    }

//Método asíncrono que registra a un nuevo usuario en la aplicación
async registroUsuario(email:string, contrasena:string){

  //TODO: Este método tambien guardará los objetos usuario en la base de datos, para posteriormente con su uid de firebase comprobar el role que tiene y asi dar acceso a un sitio u otro.

  this.firebaseAuthService.registerUser(email,contrasena)
  .then((data) => {
    console.log("Registro Usuario Exitoso");
    this.firebaseAuthService.userDetails()
      .subscribe(data => {
        this.usuario.uidUsuario=data.uid;
        this.apiService.insertarUsuario(this.usuario);
      });
      this.router.navigate(['/home']);
  })
  .catch((error) => {
    console.log("Error en el registro: " + error);
    this.router.navigate(['/registro-usuario']);

  });
}

abrirRegistroEstablecimiento(){
  this.router.navigate(['/registro-establecimiento']);
}

}
