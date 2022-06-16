import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Establecimiento } from 'src/app/modelo/Establecimiento';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-registro-establecimiento',
  templateUrl: './registro-establecimiento.page.html',
  styleUrls: ['./registro-establecimiento.page.scss'],
})
export class RegistroEstablecimientoPage implements OnInit {

  //Inicializamos el establecimiento al que le cargaremos los datos del formulario de registro
  establecimiento: Establecimiento = new Establecimiento();
  private validation_registro_establcimiento: FormGroup;

  constructor(public firebaseAuthService: FirebaseAuthService, private router: Router, public formBuilder: FormBuilder, public apiService: ApiServiceProvider, public menuCtrl: MenuController, public alertController: AlertController) { }


  ngOnInit() {

    this.menuCtrl.enable(false);

    //Inicializamos el formulario reactivo que controlará el formato del email y que la contraseña no se deje vacía.
    this.validation_registro_establcimiento = this.formBuilder.group({
      nombreEstablecimiento: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      nombreGestor: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      correo: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)]
      )),
      contrasena: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      contrasenaConfirmada: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }
  

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }


  async registroEstablecimiento(email: string, contrasena: string) {

    //TODO: Este método tambien guardará los objetos establecimiento en la base de datos, para posteriormente con su uid de firebase comprobar el role que tiene y asi dar acceso a un sitio u otro.

    this.firebaseAuthService.registerUser(email, contrasena)
      .then((data) => {
        console.log("Registro Establecimiento Exitoso");
        this.firebaseAuthService.userDetails()
          .subscribe(data => {
            this.establecimiento.uidEstablecimiento = data.uid;
            this.apiService.insertarEstablecimiento(this.establecimiento);
          });
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log("Error en el registro: " + error);
        this.abrirVentanaCorreoDuplicado();

      });
  }

  onSubmit(values) {
    this.establecimiento.nombreEstablecimiento = values['nombreEstablecimiento'];
    this.establecimiento.nombreGestor = values['nombreGestor'];
    this.establecimiento.correo = values['correo'];
    //Lo seteamos a false para que cuando el admin verifique el establecimiento se ponga a true
    this.establecimiento.verificadoAdmin = false;
    this.establecimiento.imagenPerfil = "https://firebasestorage.googleapis.com/v0/b/proyecto-fin-grado-1.appspot.com/o/sinfoto.jpeg?alt=media&token=97bb7a51-3dd9-478c-a795-3b6e734259e5";
    
    if(values['contrasena']!=values['contrasenaConfirmada']){
      this.abrirVentanaContrasenaNoIgual();
    } else if(values['contrasena']==values['contrasenaConfirmada']){
      this.registroEstablecimiento(values['correo'], values['contrasena']);
    }
  }

  irRegistroUsuario() {
    this.router.navigate(['/registro-usuario']);
  }


  async abrirVentanaCorreoDuplicado() {
    const alert = await this.alertController.create({
      header: 'Ya existe una cuenta asociada a este correo',
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

  async abrirVentanaContrasenaNoIgual() {
    const alert = await this.alertController.create({
      header: 'Las contraseñas no coinciden',
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
