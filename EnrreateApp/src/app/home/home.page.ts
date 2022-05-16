import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../modelo/usuario';
import { FirebaseAuthService } from '../providers/firebase-auth-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private validation_login: FormGroup;


  constructor(public firebaseAuthService: FirebaseAuthService, private router: Router, public formBuilder: FormBuilder) {}


  ngOnInit()  {
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

//Método asíncrono que inicia sesión en la aplicación
async loginUsuario(email:string, contrasena:string){
    this.firebaseAuthService.loginUser(email,contrasena)
    .then((data) => {
      console.log("Login Exitoso");
      this.firebaseAuthService.userDetails()
        .subscribe(data => {
          console.log(data);
        });
        this.router.navigate(['/inicio-usuario-base']);
    })
    .catch((error) => {
      console.log("Error en el login: " + error);
      this.router.navigate(['/home']);
    });
  }

  //Método que redirecciona a la página de registro de usuarios
abrirRegistroUsuario(){
  this.router.navigate(['/registro-usuario']);
}

}
