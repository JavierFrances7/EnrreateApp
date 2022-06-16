import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/modelo/usuario';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.page.html',
  styleUrls: ['./configuracion-usuario.page.scss'],
})
export class ConfiguracionUsuarioPage implements OnInit {

  private validation_configuracion_usuario: FormGroup;

  private usuario = new Usuario();

  constructor(public menuCtrl: MenuController, private router: Router, private navCtrl: NavController, public apiService: ApiServiceProvider, public formBuilder: FormBuilder, public firebaseAuthService: FirebaseAuthService, public alertController: AlertController) { }

  ngOnInit() {

    this.validation_configuracion_usuario = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      apellidos: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      nombreUsuario: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      imagenPerfil: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),

    });

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

  subirImagen(event: FileList) {

    var file: File = event.item(0);

    this.apiService.uploadImage(file, this.usuario.uidUsuario)
      .then((downloadUrl) => {
        //Aqui cojo la url de la imagen y la asigno al objeto a actualizar
        this.usuario.imagenPerfil = downloadUrl;
      })

      .catch((error) => {

        console.log(error);

      });

  }

  onSubmit(values) {
    this.usuario.nombre = values['nombre'];
    this.usuario.apellidos = values['apellidos'];
    this.usuario.nombreUsuario = values['nombreUsuario'];
    this.apiService.modificarUsuario(this.usuario).then((any) => {
      this.abrirVentanaActualizacionCorrecta();
    })
      .catch((error) => {
        console.log(error);
      });;
    //Al pulsar el boton de sumbit se inicia el metodo login con los valores del formulario.
  }


  async abrirVentanaActualizacionCorrecta() {
    const alert = await this.alertController.create({
      header: 'Perfil actualizado con éxito',
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.router.navigate(['/perfil-usuario']);
          }
        }
      ]
    });
    await alert.present();
  }
}
