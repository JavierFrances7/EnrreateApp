import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Administrador } from 'src/app/modelo/Administrador';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-crear-admin',
  templateUrl: './crear-admin.page.html',
  styleUrls: ['./crear-admin.page.scss'],
})
export class CrearAdminPage implements OnInit {

  private validation_registro_admin: FormGroup;
  admin: Administrador = new Administrador();


  constructor(private router: Router, private navCtrl: NavController, public formBuilder: FormBuilder, public firebaseAuthService: FirebaseAuthService, public apiService: ApiServiceProvider, public alertController: AlertController) { }

  ngOnInit() {

    this.validation_registro_admin = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      correo: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
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


  irInicioAdmin() {
    this.router.navigate(['/inicio-admin']);
  }

  async registroAdmin(email: string, contrasena: string) {

    //TODO: Este método tambien guardará los objetos admins en la base de datos, para posteriormente con su uid de firebase comprobar el role que tiene y asi dar acceso a un sitio u otro.

    this.firebaseAuthService.registerUser(email, contrasena)
      .then((data) => {
        console.log("Registro Admin Exitoso");
        this.firebaseAuthService.userDetails()
          .subscribe(data => {
            this.admin.uidAdministrador = data.uid;
            this.apiService.insertarAdmin(this.admin);
            this.abrirVentanaAdminCreado();
          });
      })
      .catch((error) => {
        console.log("Error en el registro: " + error);

      });
  }

  async abrirVentanaAdminCreado() {
    const alert = await this.alertController.create({
      header: 'Administrador creado con éxito',
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


  onSubmit(values) {
    this.admin.nombre = values['nombre'];
    this.admin.correo = values['correo'];

    if (values['contrasena'] != values['contrasenaConfirmada']) {
      this.abrirVentanaContrasenaNoIgual();
    } else if (values['contrasena'] == values['contrasenaConfirmada']) {
      this.registroAdmin(values['correo'], values['contrasena']);
      values=null;
    }
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
