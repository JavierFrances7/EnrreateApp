import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { MenuController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';
import {Geolocation} from '@ionic-native/geolocation/ngx';


declare var google;

@Component({
  selector: 'app-inicio-usuario-base',
  templateUrl: './inicio-usuario-base.page.html',
  styleUrls: ['./inicio-usuario-base.page.scss'],
})
export class InicioUsuarioBasePage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  direccion: string;

  latitud: number;
  longitud: number;


  constructor(private menuCtrl : MenuController, private router: Router, public firebaseAuthService: FirebaseAuthService, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) { }

  ngOnInit() {
    this.cargarMapa();
  }

  //Método que detecta si el menú esta abierto (si es así lo cierra) y viceversa
  activarMenuUsuario(){
    this.menuCtrl.toggle();
  }

 clickItem1Menu(){
      this.router.navigate(['/registro-usuario']);
  }


//Método que cierra la sesión del usuario  
  async cerrarSesionUsuario(){
    this.firebaseAuthService.logoutUser()
    .then((data) => {
      console.log("Logout Exitoso");
      this.firebaseAuthService.userDetails()
        .subscribe(data => {
          console.log(data);
        });
        this.router.navigate(['/home']);
    })
    .catch((error) => {
      console.log("Error en el logout: " + error);
    });
  }

  verPerfil(){
    this.router.navigate(['/perfil-usuario']);
  }

  cargarMapa() {
    var options = {
      timeout: 20000 //sorry I use this much milliseconds
  }
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitud = resp.coords.latitude;
      this.longitud = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapaOpciones = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapaOpciones);

      this.map.addListener('dragend', () => {

        this.latitud = this.map.center.lat();
        this.longitud = this.map.center.lng();

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(latitud, longitud) {
    console.log("getAddressFromCoords " + latitud + " " + longitud);
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


