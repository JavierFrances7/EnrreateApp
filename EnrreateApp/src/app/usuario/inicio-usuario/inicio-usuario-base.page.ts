import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-inicio-usuario-base',
  templateUrl: './inicio-usuario-base.page.html',
  styleUrls: ['./inicio-usuario-base.page.scss'],
})
export class InicioUsuarioBasePage implements OnInit {

  constructor(private menuCtrl : MenuController, private router: Router, public firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
  }

  //Método que detecta si el menú esta abierto (si es así lo cierra) y viceversa
  activarMenuUsuario(){
    this.menuCtrl.toggle();
  }

 clickItem1Menu(){
      this.router.navigate(['/registro-usuario']);
  }


//Método que cierra la sesión del usuario  
  async cerrarSesionUsuario(){
    this.firebaseAuthService.logoutUser()
    .then((data) => {
      console.log("Logout Exitoso");
      this.firebaseAuthService.userDetails()
        .subscribe(data => {
          console.log(data);
        });
        this.router.navigate(['/home']);
    })
    .catch((error) => {
      console.log("Error en el logout: " + error);
    });
  }

  verPerfil(){
    this.router.navigate(['/perfil-usuario']);
  }
}

