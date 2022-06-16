import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Establecimiento } from 'src/app/modelo/Establecimiento';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-perfil-establecimiento',
  templateUrl: './perfil-establecimiento.page.html',
  styleUrls: ['./perfil-establecimiento.page.scss'],
})
export class PerfilEstablecimientoPage implements OnInit {

  private establecimiento = new Establecimiento();

  constructor(public menuCtrl: MenuController, private router: Router, private navCtrl: NavController, public firebaseAuthService: FirebaseAuthService, public apiService: ApiServiceProvider) { }

  ngOnInit() {
    this.firebaseAuthService.userDetails()
      .subscribe(data => {
        this.apiService.getEstablecimientoByUid(data.uid)
          .then((establecimiento: any) => {
            this.establecimiento = establecimiento;
          })
          .catch((error: string) => {
            console.log(error);
          });
      });

  }

}
