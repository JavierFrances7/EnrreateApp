import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crear-admin',
  templateUrl: './crear-admin.page.html',
  styleUrls: ['./crear-admin.page.scss'],
})
export class CrearAdminPage implements OnInit {

  private validation_registro_admin: FormGroup;

  constructor(private router: Router, private navCtrl: NavController, public formBuilder: FormBuilder) { }

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
      ])),
      contrasenaConfirmada: new FormControl('', Validators.compose([
      ]))
      });

  }


  irInicioAdmin() {
    this.router.navigate(['/inicio-admin']);
  }

}
