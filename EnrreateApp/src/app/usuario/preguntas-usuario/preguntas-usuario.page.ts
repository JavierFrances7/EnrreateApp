import { Component, OnInit } from '@angular/core';
import { PreguntaEstablecimiento } from 'src/app/modelo/PreguntaEstablecimiento';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-preguntas-usuario',
  templateUrl: './preguntas-usuario.page.html',
  styleUrls: ['./preguntas-usuario.page.scss'],
})
export class PreguntasUsuarioPage implements OnInit {

  preguntas = new Array<PreguntaEstablecimiento>();
  uidUsuarioActual: string;

  constructor(public apiService: ApiServiceProvider, public firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
    this.firebaseAuthService.userDetails()
      .subscribe(data => {
        this.uidUsuarioActual = data.uid;
        this.cargarPreguntas();
      });
  }

  ionViewWillEnter() {
    this.firebaseAuthService.userDetails()
      .subscribe(data => {
        this.uidUsuarioActual = data.uid;
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
}
