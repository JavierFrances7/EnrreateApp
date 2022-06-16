import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/modelo/usuario';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  private usuario = new Usuario();

  constructor(public menuCtrl: MenuController, private router: Router, private navCtrl: NavController, public firebaseAuthService: FirebaseAuthService, public apiService: ApiServiceProvider) { }

  ngOnInit() {
    this.firebaseAuthService.userDetails()
      .subscribe(data => {
        console.log(data.uid);

        this.apiService.getUsuarioByUid(data.uid)
          .then((usuario: any) => {
            this.usuario = usuario;
          })
          .catch((error: string) => {
            console.log(error);
          });

      });
  }


}
