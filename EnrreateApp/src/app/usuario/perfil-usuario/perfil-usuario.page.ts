import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  constructor(public menuCtrl: MenuController, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }


  //MÉTODOS MENÚ
  //Método que redirecciona a eventos
  verEventosGuardados() {
    this.router.navigate(['/eventos-usuario']);
  }

  //Método que redirecciona a notificaciones
  verNotificaciones() {
    this.router.navigate(['/notificaciones-usuario']);
  }

  //Método que redirecciona hacia el perfil de usuario
  verPerfil() {
    this.router.navigate(['/perfil-usuario']);
  }

  //Método que redirecciona hacia el login de la aplicacion
  irLoginApp() {
    this.navCtrl.navigateRoot("/home");
  }

  //Método que redirecciona hacia la configuracion del usuario
  verConfiguracion(){
    this.router.navigate(['/configuracion-usuario']);
  }

  //Método que detecta si el menú esta abierto (si es así lo cierra) y viceversa
  activarMenuUsuario() {
    this.menuCtrl.toggle();
  }
  //FIN MÉTODOS MENÚ


}
