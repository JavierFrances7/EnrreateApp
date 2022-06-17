import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';
import { Establecimiento } from 'src/app/modelo/Establecimiento';

declare var google;

@Component({
  selector: 'app-configuracion-establecimiento',
  templateUrl: './configuracion-establecimiento.page.html',
  styleUrls: ['./configuracion-establecimiento.page.scss'],
})
export class ConfiguracionEstablecimientoPage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;

  latitud: number;
  longitud: number;
  private validation_configuracion_establecimiento: FormGroup;
  private establecimiento = new Establecimiento();


  constructor(public formBuilder: FormBuilder, public apiService: ApiServiceProvider, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public router: Router,
    public firebaseAuthService: FirebaseAuthService, private navCtrl: NavController, private platform: Platform, public zone: NgZone, public alertController: AlertController) { }

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
      ciudad: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      direccion: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      aforoMaximo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ]))
    });

    this.firebaseAuthService.userDetails()
      .subscribe(data => {
        this.apiService.getEstablecimientoByUid(data.uid)
          .then((establecimiento: any) => {
            this.establecimiento = establecimiento;
          })
          .catch((error: string) => {
            console.log(error);
          });
      });
  }

  obtenerCoordenadasDesdeDireccion(address) {
    //Proyecto cordova
    if (this.platform.is('cordova')) {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.forwardGeocode(address, options)
        .then((result: NativeGeocoderResult[]) => {
          this.zone.run(() => {
            this.establecimiento.latitud = Number.parseFloat(result[0].latitude);
            this.establecimiento.longitud = Number.parseFloat(result[0].longitude);
            
          })
          this.apiService.modificarEstablecimiento(this.establecimiento).then(() => {
            this.abrirVentanaActualizacionCorrecta();
          })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error: any) => console.log(error));
    } else {
      //Proyecto capacitor
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          this.zone.run(() => {
            this.establecimiento.latitud = results[0].geometry.location.lat();
            this.establecimiento.longitud = results[0].geometry.location.lng();
          })
          this.apiService.modificarEstablecimiento(this.establecimiento).then(() => {
            this.abrirVentanaActualizacionCorrecta();
          })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert('Error - ' + results + ' & Status - ' + status)
        }
      });
    }
  }


  subirImagen(event: FileList) {

    var file: File = event.item(0);


    this.apiService.uploadImage(file, this.establecimiento.uidEstablecimiento)

      .then((downloadUrl) => {

        //Aqui cojo la url de la imagen y la asigno al objeto a actualizar
        this.establecimiento.imagenPerfil = downloadUrl;

      })

      .catch((error) => {

        console.log(error);

      });

  }


  onSubmit(values) {
    this.establecimiento.nombreEstablecimiento = values['nombreEstablecimiento'];
    this.establecimiento.nombreGestor = values['nombreGestor'];
    this.establecimiento.direccion = values['direccion'];
    this.establecimiento.aforoMaximo = values['aforoMaximo'];
    this.establecimiento.verificadoAdmin = false;
    this.establecimiento.ciudad = values['ciudad'];
    this.obtenerCoordenadasDesdeDireccion(values['direccion'] + " " + values['ciudad']);

    //Al pulsar el boton de sumbit se inicia el metodo login con los valores del formulario.
  }

  async abrirVentanaActualizacionCorrecta() {
    const alert = await this.alertController.create({
      header: 'Perfil actualizado con éxito',
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.router.navigate(['/perfil-establecimiento']);
          }
        }
      ]
    });
    await alert.present();
  }

}
