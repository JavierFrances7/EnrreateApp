import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Establecimiento } from 'src/app/modelo/Establecimiento';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.page.html',
  styleUrls: ['./inicio-admin.page.scss'],
})
export class InicioAdminPage implements OnInit {
  private secreto: string = "0500";
  private intentos: number = 0;
  establecimientos = new Array<Establecimiento>();


  constructor(private router: Router, public alertController: AlertController, private navCtrl: NavController, public apiServiceProvider: ApiServiceProvider) { }

  ngOnInit() {
    this.abrirVentanaComprobacion();
  }

  irCrearAdmin() {
    this.router.navigate(['/crear-admin']);
  }

  irLoginApp() {
    this.router.navigate(['/home']);
  }

  async abrirVentanaComprobacion() {
    console.log(this.intentos);

    const alert = await this.alertController.create({
      header: 'Introduce el código',
      inputs: [
        {
          name: 'numeroSecreto',
          type: 'text',
          value: '',
          id: 'numeroSecreto',
          placeholder: 'SOLO ADMINS'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            //Controlamos si el numero secreto es el correcto para permitir el acceso al sitio admin
            if (data.numeroSecreto == this.secreto) {
              this.alertController.dismiss();
              //Una vez accedemos con el numero correcto
              this.cargarEstablecimientos();
            } else {
              if (this.intentos >= 3) {
                this.alertController.dismiss();
                this.irLoginApp();
              } else {
                this.intentos += 1;
                this.abrirVentanaComprobacion();
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }

  cargarEstablecimientos() {
    this.apiServiceProvider.getEstablecimientos()
      .then((establecimientos: Establecimiento[]) => {

        //Cargamos el mapa una vez obtenidos los establecimientos
        if (this.establecimientos != null) {

          for (let inx in establecimientos) {

            if (establecimientos[inx].verificadoAdmin == false) {
              this.establecimientos.push(establecimientos[inx]);
            }

          }

        }

      })
      .catch((error: string) => {
        console.log(error);
      });
  }

}
