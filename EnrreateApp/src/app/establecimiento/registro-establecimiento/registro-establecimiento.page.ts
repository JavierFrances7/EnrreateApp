import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-registro-establecimiento',
  templateUrl: './registro-establecimiento.page.html',
  styleUrls: ['./registro-establecimiento.page.scss'],
})
export class RegistroEstablecimientoPage implements OnInit {

  private validation_registro_establcimiento: FormGroup;

  constructor(public firebaseAuthService: FirebaseAuthService, private router: Router, public formBuilder: FormBuilder) { }


  ngOnInit() {
      //Inicializamos el formulario reactivo que controlará el formato del email y que la contraseña no se deje vacía.
      this.validation_registro_establcimiento = this.formBuilder.group({
        correo: new FormControl('', Validators.compose([
          Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]     
          )),
        contrasena: new FormControl('', Validators.compose([
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),
        ])),
        contrasenaConfirmada: new FormControl('', Validators.compose([
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),
        ]))
        });
}



  
}
