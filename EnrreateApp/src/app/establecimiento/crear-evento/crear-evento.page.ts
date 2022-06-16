import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Establecimiento } from 'src/app/modelo/Establecimiento';
import { Evento } from 'src/app/modelo/Evento';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.page.html',
  styleUrls: ['./crear-evento.page.scss'],
})
export class CrearEventoPage implements OnInit {

  private validation_crear_evento: FormGroup;
  evento: Evento = new Evento();
  establecimiento: Establecimiento = new Establecimiento();



  constructor(public router: Router, public formBuilder: FormBuilder, public firebaseAuthService: FirebaseAuthService, public apiService: ApiServiceProvider, public alertController: AlertController) { }

  ngOnInit() {

    this.firebaseAuthService.userDetails()
      .subscribe(data => {
        this.apiService.getEstablecimientoByUid(data.uid)
          .then((establecimiento: any) => {
            this.evento.establecimiento = establecimiento;
          })
          .catch((error: string) => {
            console.log(error);
          });
      });

    this.validation_crear_evento = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      aforoMaximo: new FormControl('', Validators.compose([
        Validators.required]
      )),
      edadMinima: new FormControl('', Validators.compose([
        Validators.required
      ])),
      tipoMusica: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      fechaInicio: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      fechaFin: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });


  }


  onSubmit(values) {
    this.evento.nombre = values['nombre'];
    this.evento.aforoMaximo = values['aforoMaximo'];
    this.evento.edadMinima = values['edadMinima'];
    this.evento.tipoMusica = values['tipoMusica'];
    this.evento.fechaInicio = values['fechaInicio'];
    this.evento.fechaFin = values['fechaFin'];

    if(this.evento.fechaFin <this.evento.fechaInicio){
        this.abrirVentanaFechaIncorrecta();
    } else {
      this.apiService.insertarEvento(this.evento).then((any: any) => {
        values=null;
        this.irInicioEventos();
      })
        .catch((error: string) => {
          console.log(error);
        });
    }

    

  }

  irInicioEventos() {
    this.router.navigate(['/mis-eventos-establecimiento']);
  }

  async abrirVentanaFechaIncorrecta() {
    const alert = await this.alertController.create({
      header: 'La fecha de fin es anterior a la de inicio',
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.alertController.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

}
