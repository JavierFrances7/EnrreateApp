import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComentarioEstablecimiento } from 'src/app/modelo/ComentarioEstablecimiento';
import { Establecimiento } from 'src/app/modelo/Establecimiento';
import { Usuario } from 'src/app/modelo/usuario';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

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
  comentarios = new Array<ComentarioEstablecimiento>();
  inputComentario: string;
  today: number;




  constructor(private route: ActivatedRoute, public apiService: ApiServiceProvider, public firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
    this.uidEstablecimiento = this.route.snapshot.params['data'];
    console.log("UID RECIBIDO: " + this.uidEstablecimiento);


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
            console.log(error);
          });
      });
  }

  ionViewWillEnter() {
    this.uidEstablecimiento = this.route.snapshot.params['data'];
  }

  comentar() {
    console.log(this.establecimiento.uidEstablecimiento)
    console.log(this.usuario.uidUsuario)
    this.comentarioEstablecimiento.comentario = this.inputComentario;
    this.comentarioEstablecimiento.establecimiento = this.establecimiento;
    this.comentarioEstablecimiento.usuario = this.usuario;
    this.comentarioEstablecimiento.fecha = Date.now();
    this.apiService.insertarComentarioEstablecimiento(this.comentarioEstablecimiento)
    .then((any: any) => {
      this.cargarComentarios();
    })
      .catch((error: string) => {
        console.log(error);
      });
    this.inputComentario = "";
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

