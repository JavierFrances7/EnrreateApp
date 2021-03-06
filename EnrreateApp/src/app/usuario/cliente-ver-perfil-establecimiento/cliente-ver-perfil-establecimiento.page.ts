import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ComentarioEstablecimiento } from 'src/app/modelo/ComentarioEstablecimiento';
import { Establecimiento } from 'src/app/modelo/Establecimiento';
import { Evento } from 'src/app/modelo/Evento';
import { PreguntaEstablecimiento } from 'src/app/modelo/PreguntaEstablecimiento';
import { Usuario } from 'src/app/modelo/usuario';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';
import * as moment from 'moment';

@Component({
  selector: 'app-cliente-ver-perfil-establecimiento',
  templateUrl: './cliente-ver-perfil-establecimiento.page.html',
  styleUrls: ['./cliente-ver-perfil-establecimiento.page.scss'],
})
export class ClienteVerPerfilEstablecimientoPage implements OnInit {

  uidEstablecimiento: string;
  private establecimiento = new Establecimiento();
  private usuario = new Usuario();

  private comentarioEstablecimiento = new ComentarioEstablecimiento();
  private preguntaEstablecimiento = new PreguntaEstablecimiento();
  eventos = new Array<Evento>();

  comentarios = new Array<ComentarioEstablecimiento>();
  inputComentario: string;
  encontrado: boolean = false;
  contadorNotas: number = 0;
  sumaNotas: number = 0;



  constructor(private route: ActivatedRoute, public apiService: ApiServiceProvider, public firebaseAuthService: FirebaseAuthService, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.uidEstablecimiento = this.route.snapshot.params['data'];
    this.apiService.getEstablecimientoByUid(this.uidEstablecimiento)
      .then((establecimiento: any) => {
        this.establecimiento = establecimiento;
      })
      .catch((error: string) => {
        console.log(error);
      });

    this.cargarComentarios();
    this.firebaseAuthService.userDetails()
      .subscribe(data => {
        this.apiService.getUsuarioByUid(data.uid)
          .then((usuario: any) => {
            this.usuario = usuario;
          })
          .catch((error: string) => {
            console.log("Sesion cerrada");
          });
      });
      this.cargarEventos();
  }

  ionViewWillEnter() {
    this.uidEstablecimiento = this.route.snapshot.params['data'];
    this.apiService.getEstablecimientoByUid(this.uidEstablecimiento)
    .then((establecimiento: any) => {
      this.establecimiento = establecimiento;
    })
    .catch((error: string) => {
      console.log(error);
    });

  this.cargarComentarios();
  this.firebaseAuthService.userDetails()
    .subscribe(data => {
      this.apiService.getUsuarioByUid(data.uid)
        .then((usuario: any) => {
          this.usuario = usuario;
        })
        .catch((error: string) => {
          console.log("Sesion cerrada");
        });
    });
    this.cargarEventos();
  }

  comentar() {
    this.comentarioEstablecimiento.comentario = this.inputComentario;
    this.comentarioEstablecimiento.establecimiento = this.establecimiento;
    this.comentarioEstablecimiento.usuario = this.usuario;
    this.comentarioEstablecimiento.fecha = Date.now();

    for (let inx in this.comentarios) {
      //Si el usuario no ha comentado nunca este establecimiento se le solicita una nota, sino se guarda su comentario sin nota.
      if ((this.comentarios[inx].usuario.uidUsuario != this.usuario.uidUsuario) && (this.comentarios[inx].establecimiento.uidEstablecimiento == this.uidEstablecimiento)) {
        this.encontrado = false;
      } else if ((this.comentarios[inx].usuario.uidUsuario === this.usuario.uidUsuario) && (this.comentarios[inx].establecimiento.uidEstablecimiento == this.uidEstablecimiento)) {
        this.encontrado = true;
      }
    }

    //Vemos si el usuario es la primera vez que comenta, si es la primera a parte del comentario le solicitamos una nota. 
    //Si ya tiene comentarios no le pedimos la nota de nuevo

    if (this.encontrado == true) {
      this.insertarComentario();
    } else {
      this.crearAlertNota();
    }
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

  async crearAlertNota() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Eval??a este establecimiento',
      inputs: [
        {
          name: 'nota',
          type: 'number',
          placeholder: 'Nota',
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            if (data.nota >= 1 && data.nota <= 10) {
              this.comentarioEstablecimiento.nota = data.nota;
              this.insertarComentario();
              this.comentarioEstablecimiento.nota = 0;
            } else {
              console.log("Menor, no insertamos el comentario")
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async crearAlertPregunta() {
    console.log("ENTRA EN ALERT")
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: '??Tienes una duda? Preg??ntanos',
      inputs: [
        {
          name: 'pregunta',
          type: 'text',
          placeholder: 'Pregunta',
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.preguntaEstablecimiento.pregunta = data.pregunta;
            this.preguntaEstablecimiento.establecimiento = this.establecimiento;
            this.preguntaEstablecimiento.usuario = this.usuario;
            this.preguntaEstablecimiento.fecha = Date.now();
            this.insertarPregunta();
            data.pregunta = "";

          }
        }
      ]
    });

    await alert.present();
  }

  insertarComentario() {
    this.apiService.insertarComentarioEstablecimiento(this.comentarioEstablecimiento)
      .then((any: any) => {
        this.actualizarNota();
        this.cargarComentarios();
      })
      .catch((error: string) => {
        console.log(error);
      });
    this.inputComentario = "";
  }

  insertarPregunta() {
    this.apiService.insertarPreguntaEstablecimiento(this.preguntaEstablecimiento)
      .then((any: any) => {
        this.abrirVentanaPreguntaRealizada();
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  async abrirVentanaPreguntaRealizada() {
    const alert = await this.alertCtrl.create({
      header: 'Pregunta enviada correctamente',
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
          }
        }
      ]
    });
    await alert.present();
  }

  actualizarNota() {
    for (let inx in this.comentarios) {
      //Comprobamos si la nota est?? entre 1 y 10 para calcular la media, ya que los comentarios que no tienen nota la seteamos a 0
      if ((this.comentarios[inx].nota >= 1 && this.comentarios[inx].nota <= 10) && (this.comentarios[inx].nota != null && this.comentarios[inx].nota != 0) && (this.comentarios[inx].establecimiento.uidEstablecimiento == this.uidEstablecimiento)) {
        this.sumaNotas = this.sumaNotas + this.comentarios[inx].nota;
        this.contadorNotas = this.contadorNotas + 1;
      }
    }

    this.establecimiento.valoracionMedia = (this.sumaNotas / this.contadorNotas);

    this.apiService.modificarEstablecimiento(this.establecimiento);

  }

  cargarEventos() {
    this.apiService.getEventos()
      .then((eventos: any) => {
        this.eventos = eventos;
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

}

