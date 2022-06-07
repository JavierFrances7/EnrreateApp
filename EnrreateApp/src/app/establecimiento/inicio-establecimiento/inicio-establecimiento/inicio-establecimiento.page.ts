import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-inicio-establecimiento',
  templateUrl: './inicio-establecimiento.page.html',
  styleUrls: ['./inicio-establecimiento.page.scss'],
})
export class InicioEstablecimientoPage implements OnInit {

  constructor(private menuCtrl: MenuController, private router: Router, public firebaseAuthService: FirebaseAuthService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  //MÉTODOS MENÚ

  clickMenuInicioEstablecimiento() {
    this.router.navigate(['/inicio-establecimiento']);
  }

  //Método que redirecciona hacia el perfil del establecimiento
  clickMenuVerPerfil() {
    this.router.navigate(['/perfil-establecimiento']);
  }

  //Método que redirecciona hacia el perfil del establecimiento
  clickMenuConfiguracion() {
    this.router.navigate(['/configuracion-establecimiento']);
  }

  //Método que detecta si el menú esta abierto (si es así lo cierra) y viceversa
  activarMenuEstablecimiento() {
    this.menuCtrl.toggle();
  }

  //Método que redirecciona hacia el login de la app
  irLoginApp() {
    this.navCtrl.navigateRoot("/home");
  }

  //FIN MÉTODOS REDIRECCIONES MENÚ

  //MÉTODOS LOGOUT
  //Método que cierra la sesión del usuario  
  async cerrarSesionEstablecimiento() {
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
