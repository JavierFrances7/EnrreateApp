import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelo/usuario';
import { FirebaseAuthService } from '../providers/firebase-auth-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(public firebaseAuthService: FirebaseAuthService,private router: Router) {}
  ngOnInit()  {
   this.loginUsuario("javierfrances7213131@gmail.com", "prueba1");
   
  }

async loginUsuario(email:string, contrasena:string){
    this.firebaseAuthService.loginUser(email,contrasena)
    .then((data) => {
      console.log("Login Exitoso");
      this.firebaseAuthService.userDetails()
        .subscribe(data => {
          console.log(data);
        });
        this.router.navigate(['/home']);
    })
    .catch((error) => {
      console.log("Error en el login: " + error);
      this.router.navigate(['/home']);

    });

  }

  async registroUsuario(email:string, contrasena:string){
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
      this.router.navigate(['/home']);

    });

  }


}
