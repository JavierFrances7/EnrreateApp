import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-eventos-guardados-usuario',
  templateUrl: './eventos-guardados-usuario.page.html',
  styleUrls: ['./eventos-guardados-usuario.page.scss'],
})
export class EventosGuardadosUsuarioPage implements OnInit {

  constructor(public menuCtrl: MenuController, private router: Router, private navCtrl: NavController, public firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
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
    this.menuCtrl.toggle("menu-eventos-usuario");
  }
  //FIN MÉTODOS MENÚ

}
