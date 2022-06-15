import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { FirebaseAuthService } from './providers/firebase-auth-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent{
  constructor(public menuCtrl: MenuController, private router: Router, private navCtrl: NavController, public firebaseAuthService: FirebaseAuthService) { }
  
  nombrePerfil: string;
  urlImagen: string;
  esAdmin: boolean;
  esUsuario: boolean;
  esEstablecimiento: boolean;

  setEsAdmin(esAdmin: boolean) {
    this.esAdmin = esAdmin;
  }

  setEsUsuario(esUsuario: boolean) {
    this.esUsuario = esUsuario;
    console.log(this.esUsuario);
  }

  setEsEstablecimiento(esEstablecimiento: boolean) {
    this.esEstablecimiento = esEstablecimiento;
  }


  setNombrePerfil(nombrePerfil: string) {
    this.nombrePerfil = nombrePerfil;
  }

  setUrlImagen(urlImagen: string) {
    this.urlImagen = urlImagen;
  }

  //MÉTODOS MENÚ USUARIO
  //Método que redirecciona a eventos

  irInicioUsuario() {
    this.router.navigate(['/inicio-usuario-base']);
  }

  verEventosGuardados() {
    this.router.navigate(['/eventos-guardados-usuario']);
  }

  //Método que redirecciona a notificaciones
  verListaEstablecimientos() {
    this.router.navigate(['/lista-establecimientos']);
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
  verConfiguracion() {
    this.router.navigate(['/configuracion-usuario']);
  }

  //Método que detecta si el menú esta abierto (si es así lo cierra) y viceversa
  activarMenuUsuario() {
    this.menuCtrl.toggle();
  }

  //FIN METODOS MENUS USUARIOS

  //MÉTODOS MENÚ ESTABLECIMIENTO

  clickMenuInicioEstablecimiento() {
    this.router.navigate(['/inicio-establecimiento']);
  }

  //Método que redirecciona hacia el perfil del establecimiento
  clickMenuVerPerfil() {
    this.router.navigate(['/perfil-establecimiento']);
  }

  clickMisEventos() {
    this.router.navigate(['/mis-eventos-establecimiento']);
  }

  clickPreguntas() {
    this.router.navigate(['/preguntas-establecimiento']);
  }

  //Método que redirecciona hacia el perfil del establecimiento
  clickMenuConfiguracion() {
    this.router.navigate(['/configuracion-establecimiento']);
  }

  //Método que detecta si el menú esta abierto (si es así lo cierra) y viceversa
  activarMenuEstablecimiento() {
    this.menuCtrl.toggle();
  }

  //FIN METODOS MENUS ESTABLECIMIENTO


  //Método que redirecciona hacia el login de la app


  //MÉTODOS LOGOUT
  //Método que cierra la sesión del usuario  
  async cerrarSesion() {
    this.irLoginApp();
    this.firebaseAuthService.logoutUser()
      .then((data) => {
        console.log("Logout Exitoso");
      })
      .catch((error) => {
        console.log("Error en el logout: " + error);
      });
  }

  //FIN MÉTODOS LOGOUT

}
