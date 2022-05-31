import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';

@Component({
  selector: 'app-configuracion-establecimiento',
  templateUrl: './configuracion-establecimiento.page.html',
  styleUrls: ['./configuracion-establecimiento.page.scss'],
})
export class ConfiguracionEstablecimientoPage implements OnInit {

  private validation_configuracion_establecimiento: FormGroup;


  constructor(public formBuilder: FormBuilder,public apiService : ApiServiceProvider) { }

  ngOnInit() {

    this.validation_configuracion_establecimiento = this.formBuilder.group({
      nombreEstablecimiento: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      nombreGestor: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
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

}
