import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Establecimiento } from 'src/app/modelo/Establecimiento';
import { PreguntaEstablecimiento } from 'src/app/modelo/PreguntaEstablecimiento';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-preguntas-establecimiento',
  templateUrl: './preguntas-establecimiento.page.html',
  styleUrls: ['./preguntas-establecimiento.page.scss'],
})
export class PreguntasEstablecimientoPage implements OnInit {

  preguntas = new Array<PreguntaEstablecimiento>();
  uidEstablecimientoActual: string;
  private preguntaEstablecimiento = new PreguntaEstablecimiento();
  private preguntaEstablecimientoAux = new PreguntaEstablecimiento();

  private establecimiento = new Establecimiento();



  constructor(public apiService: ApiServiceProvider, public firebaseAuthService: FirebaseAuthService, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.firebaseAuthService.userDetails()
      .subscribe(data => {
        this.uidEstablecimientoActual = data.uid;
        this.cargarPreguntas();
      });
  }

  ionViewWillEnter() {
    this.firebaseAuthService.userDetails()
      .subscribe(data => {
        this.uidEstablecimientoActual = data.uid;
        this.cargarPreguntas();
      });
  }


  cargarPreguntas() {
    this.apiService.getPreguntasEstablecimientos()
      .then((preguntasEstablecimiento: PreguntaEstablecimiento[]) => {
        this.preguntas = preguntasEstablecimiento;
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  async crearAlertRespuesta() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Responder Pregunta',
      inputs: [
        {
          name: 'respuesta',
          type: 'text',
          placeholder: 'Respuesta',
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.preguntaEstablecimientoAux.respuesta = data.respuesta;
            //this.apiService.eliminarPregunta(this.preguntaEstablecimiento);
            console.log(this.preguntaEstablecimiento);
            this.apiService.modificarPregunta(this.preguntaEstablecimiento);

            //this.apiService.insertarPreguntaEstablecimiento(this.preguntaEstablecimientoAux);
            data.respuesta = "";

          }
        }
      ]
    });

    await alert.present();
  }

  responderPregunta(pregunta: PreguntaEstablecimiento) {
    this.preguntaEstablecimientoAux = pregunta;
    this.preguntaEstablecimiento = pregunta;
    this.crearAlertRespuesta();
  }

}
