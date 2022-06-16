import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Establecimiento } from 'src/app/modelo/Establecimiento';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';

@Component({
  selector: 'app-lista-establecimientos',
  templateUrl: './lista-establecimientos.page.html',
  styleUrls: ['./lista-establecimientos.page.scss'],
})
export class ListaEstablecimientosPage implements OnInit {

  establecimientos = new Array<Establecimiento>();


  constructor(public apiServiceProvider: ApiServiceProvider, public router: Router, public navCtrl: NavController) { }

  ngOnInit() {
    this.cargarEstablecimientosVerificados();
  }


  cargarEstablecimientosVerificados() {
    this.apiServiceProvider.getEstablecimientos()
      .then((establecimientos: Establecimiento[]) => {
        for (let inx in establecimientos) {
          if (establecimientos[inx].verificadoAdmin == true) {
            this.establecimientos.push(establecimientos[inx]);
          }
        }
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  irPerfilEstablecimiento(inx) {
    this.establecimientos[inx].uidEstablecimiento;
    this.navCtrl.navigateForward(['cliente-ver-perfil-establecimiento', {
      data: this.establecimientos[inx].uidEstablecimiento
    }]);
  }

}
