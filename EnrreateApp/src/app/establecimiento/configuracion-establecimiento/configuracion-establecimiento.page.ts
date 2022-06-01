import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

declare var google;

@Component({
  selector: 'app-configuracion-establecimiento',
  templateUrl: './configuracion-establecimiento.page.html',
  styleUrls: ['./configuracion-establecimiento.page.scss'],
})
export class ConfiguracionEstablecimientoPage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  direccion: string;

  latitud: number;
  longitud: number;
  private validation_configuracion_establecimiento: FormGroup;


  constructor(public formBuilder: FormBuilder, public apiService: ApiServiceProvider, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public router: Router, private menuCtrl: MenuController, public firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
    this.cargarMapa();
    this.validation_configuracion_establecimiento = this.formBuilder.group({
      nombreEstablecimiento: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      nombreGestor: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });

  }

  //MÉTODOS MENÚ

  clickMenuInicioEstablecimiento() {
    this.router.navigate(['/inicio-establecimiento']);
  }

  //Método que redirecciona hacia el perfil del establecimiento
  clickMenuVerPerfil() {
    this.router.navigate(['/perfil-establecimiento']);
  }

  //Método que redirecciona hacia el perfil del establecimiento
  clickMenuConfiguracion() {
    this.router.navigate(['/configuracion-establecimiento']);
  }

  //Método que detecta si el menú esta abierto (si es así lo cierra) y viceversa
  activarMenuEstablecimiento() {
    this.menuCtrl.toggle();
  }

  //Método que redirecciona hacia el login de la app
  irLoginApp() {
    this.router.navigate(['/home']);
  }

  //FIN MÉTODOS REDIRECCIONES MENÚ

  //MÉTODOS LOGOUT
  //Método que cierra la sesión del usuario  
  async cerrarSesionEstablecimiento() {
    this.firebaseAuthService.logoutUser()
      .then((data) => {
        console.log("Logout Exitoso");
        this.firebaseAuthService.userDetails()
          .subscribe(data => {
            console.log(data);
          });
        this.irLoginApp();
      })
      .catch((error) => {
        console.log("Error en el logout: " + error);
      });
  }
  //FIN MÉTODOS LOGOUT

  //MÉTODOS MAPA
  //Método que carga el mapa
  cargarMapa() {
    var options = {
      timeout: 20000
    }
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitud = resp.coords.latitude;
      this.longitud = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapaOpciones = {
        center: latLng,
        zoom: 12,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getDireccionDesdeCoordenadas(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapaOpciones);

      this.map.addListener('dragend', () => {

        this.latitud = this.map.center.lat();
        this.longitud = this.map.center.lng();

        this.getDireccionDesdeCoordenadas(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error obteniendo ubicacion', error);
    });
  }

  getDireccionDesdeCoordenadas(latitud, longitud) {
    console.log("LATITUD: " + latitud + "LONGITUD: " + longitud);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(latitud, longitud, options)
      .then((result: NativeGeocoderResult[]) => {
        this.direccion = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.direccion += value + ", ";
        }
        this.direccion = this.direccion.slice(0, -2);
      })
      .catch((error: any) => {
        this.direccion = "Direccion no Disponible";
      });

  }

}
