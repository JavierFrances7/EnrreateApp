import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  constructor(public menuCtrl: MenuController, private router: Router, private navCtrl: NavController, public firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
  }


  //Método que redirecciona hacia el login de la aplicacion
  irLoginApp() {
    this.navCtrl.navigateRoot("/home");
  }


    //MÉTODOS LOGOUT
  //Método que cierra la sesión del usuario  
  async cerrarSesionUsuario() {
    this.firebaseAuthService.logoutUser()
      .then((data) => {
        console.log("Logout Exitoso");
        this.firebaseAuthService.userDetails()
          .subscribe(data => {
            console.log(data);
          });
        this.irLoginApp();
      })
      .catch((error) => {
        console.log("Error en el logout: " + error);
      });
  }
  //FIN MÉTODOS LOGOUT

}
