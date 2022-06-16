import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { ComentarioEstablecimiento } from 'src/app/modelo/ComentarioEstablecimiento';
import { Establecimiento } from 'src/app/modelo/Establecimiento';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-inicio-establecimiento',
  templateUrl: './inicio-establecimiento.page.html',
  styleUrls: ['./inicio-establecimiento.page.scss'],
})
export class InicioEstablecimientoPage implements OnInit {

  comentarios = new Array<ComentarioEstablecimiento>();
  private establecimiento = new Establecimiento();


  constructor(private menuCtrl: MenuController, private router: Router, public firebaseAuthService: FirebaseAuthService, private navCtrl: NavController, public apiService: ApiServiceProvider) { }


  ngOnInit() {
    this.menuCtrl.enable(true);
    this.cargarComentarios();

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

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.cargarComentarios();
  }

  cargarComentarios() {
    this.apiService.getComentariosEstablecimientos()
      .then((comentariosEstablecimiento: ComentarioEstablecimiento[]) => {
        this.comentarios = comentariosEstablecimiento;
      })
      .catch((error: string) => {
        console.log(error);
      });
  }
}
