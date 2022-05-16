import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {

  private validation_registro_usuario: FormGroup;


  constructor(public firebaseAuthService: FirebaseAuthService, private router: Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
        //Inicializamos el formulario reactivo que controlará el formato del email y que la contraseña no se deje vacía.
        this.validation_registro_usuario = this.formBuilder.group({
          correo: new FormControl('', Validators.compose([
            Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]     
            )),
          contrasena: new FormControl('', Validators.compose([
            Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),
          ])),
          contrasenaConfirmada: new FormControl('', Validators.compose([
            Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),
          ]))
          });
  }

  onSubmit(values) {
    //Al pulsar el boton de sumbit se inicia el metodo login con los valores del formulario.
    this.registroUsuario(values['correo'], values['contrasena'])
    }

//Método asíncrono que registra a un nuevo usuario en la aplicación
async registroUsuario(email:string, contrasena:string){

  //TODO: Este método tambien guardará los objetos usuario en la base de datos, para posteriormente con su uid de firebase comprobar el role que tiene y asi dar acceso a un sitio u otro.

  this.firebaseAuthService.registerUser(email,contrasena)
  .then((data) => {
    console.log("Registro Exitoso");
    this.firebaseAuthService.userDetails()
      .subscribe(data => {
        console.log(data);
      });
      this.router.navigate(['/home']);
  })
  .catch((error) => {
    console.log("Error en el registro: " + error);
    this.router.navigate(['/registro-usuario']);

  });
}

}
