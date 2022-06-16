import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/modelo/Evento';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-mis-eventos-establecimiento',
  templateUrl: './mis-eventos-establecimiento.page.html',
  styleUrls: ['./mis-eventos-establecimiento.page.scss'],
})
export class MisEventosEstablecimientoPage implements OnInit {

  eventos = new Array<Evento>();

  constructor(public router: Router, public apiServiceProvider: ApiServiceProvider, public firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
    this.cargarEventos();
  }


  ionViewWillEnter() {
    this.cargarEventos();
  }

  irCrearEvento() {
    this.router.navigate(['/crear-evento']);
  }

  cargarEventos() {
    this.apiServiceProvider.getEventos()
      .then((eventos: Evento[]) => {
        this.firebaseAuthService.userDetails()
          .subscribe(data => {
            this.eventos = new Array<Evento>();
            for (let inx in eventos) {
              //Si los eventos pertenecen al establecimiento logueado los mostramos en el array
              if (data.uid == eventos[inx].establecimiento.uidEstablecimiento) {
                this.eventos.push(eventos[inx]);
              }
            }
          });
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

}
