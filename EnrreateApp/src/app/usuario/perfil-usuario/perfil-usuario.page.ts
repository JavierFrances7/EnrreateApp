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

  ionViewWillEnter(){
  }


  //MÉTODOS MENÚ
  //Método que redirecciona a eventos

  irInicioUsuario(){
    this.router.navigate(['/inicio-usuario-base']);
    this.menuCtrl.enable(true, "menu-inicio-usuario");
  }

  verEventosGuardados() {
    this.router.navigate(['/eventos-guardados-usuario']);
    this.menuCtrl.enable(true, "menu-eventos-usuario");
  }

  //Método que redirecciona a notificaciones
  verNotificaciones() {
    this.router.navigate(['/notificaciones-usuario']);
  }

  //Método que redirecciona hacia el perfil de usuario
  verPerfil() {
    this.router.navigate(['/perfil-usuario']);
    this.menuCtrl.enable(true, "menu-perfil-usuario");
  }

  //Método que redirecciona hacia el login de la aplicacion
  irLoginApp() {
    this.navCtrl.navigateRoot("/home");
  }

  //Método que redirecciona hacia la configuracion del usuario
  verConfiguracion(){
    this.router.navigate(['/configuracion-usuario']);
    this.menuCtrl.enable(true, "menu-configuracion-usuario");
  }

  //Método que detecta si el menú esta abierto (si es así lo cierra) y viceversa
  activarMenuUsuario() {
    this.menuCtrl.toggle("menu-perfil-usuario");
  }
  //FIN MÉTODOS MENÚ


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
