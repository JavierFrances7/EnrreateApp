import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { MenuController, NavController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Establecimiento } from 'src/app/modelo/Establecimiento';
import { ApiServiceProvider } from 'src/app/providers/api-service/apiservice';



declare var google;

@Component({
  selector: 'app-inicio-usuario-base',
  templateUrl: './inicio-usuario-base.page.html',
  styleUrls: ['./inicio-usuario-base.page.scss'],
})
export class InicioUsuarioBasePage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  establecimientos = new Array<Establecimiento>();
  infoWindows: any;

  direccion: string;
  latitud: number;
  longitud: number;
  uidEstablecimientoSend: string



  constructor(public menuCtrl: MenuController, public router: Router, public firebaseAuthService: FirebaseAuthService, private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder, public apiServiceProvider: ApiServiceProvider, private navCtrl: NavController) {
    this.infoWindows = [];
  }

  ngOnInit() {
    this.menuCtrl.enable(true);

    //Obtenemos los establecimientos de la base de datos
    this.apiServiceProvider.getEstablecimientos()
      .then((establecimientos: Establecimiento[]) => {
        this.establecimientos = establecimientos;

        //Cargamos el mapa una vez obtenidos los establecimientos
        if (this.establecimientos != null) {
          this.cargarMapa();
        }

      })
      .catch((error: string) => {
        console.log(error);
      });

  }


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

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapaOpciones);

      //Recorremos los establecimientos recogidos de la base de datos y los posicionamos en el mapa
      for (let inx in this.establecimientos) {

        //Añadimos al mapa solo los establecimientos que han sido verificados por el admin

        if (this.establecimientos[inx].verificadoAdmin == true) {
          this.anadirEstablecimientosMapa(this.establecimientos[inx]);
        }
      }
    }).catch((error) => {
      console.log('Error obteniendo ubicacion', error);
    });
  }


  anadirEstablecimientosMapa(establecimiento: Establecimiento) {
    //Si se le cambia el nombre a la constante position deja de funcionar, ya que google no reconoce el parametro
    const position = new google.maps.LatLng(establecimiento.latitud, establecimiento.longitud);
    const establecimientoMarker = new google.maps.Marker({ position, title: establecimiento.nombreEstablecimiento });
    this.anadeInfoWindowMarker(establecimientoMarker, establecimiento);
    establecimientoMarker.setMap(this.map);
    console.log("MARKER INSERTADO")
  }

  //Metodo que crea una infoWindow personalizada al pulsar sobre un marker 

  anadeInfoWindowMarker(marker, establecimiento: Establecimiento) {

    //Variable que almacena el contenido en formato HTML para insertar en cada marker 
    var infoWindowContent = '<div id="contentInfoWindow">' +
      '<ion-grid>' +
      //Primera fila del grid
      '<ion-row><ion-col size="6" offset="3">' +
      '<ion-avatar id="botonVerPerfilEstablecimiento"><ion-img src="' + establecimiento.imagenPerfil + '"></ion-img></ion-avatar>' +
      '</ion-col></ion-row>' +
      //Segunda fila del grid
      '<ion-row><ion-col>' +
      '<p id="tituloInfowindow" style="text-transform: uppercase; text-align: center; font-weight: bold; font-size:15px;">' + establecimiento.nombreEstablecimiento + '</p>' +
      '</ion-col></ion-row>' +
      //Tercera fila del grid
      '<ion-row><p id="direccionInfowindow"  style="text-align: left; "><i>' + establecimiento.direccion + '</i></p></ion-row>' +
      //Cuarta fila del grid
      '<ion-row><p id="aforoMaximoInfowindow"  style="text-align: left; "><b>Aforo Máximo: </b>' + establecimiento.aforoMaximo + '</p></ion-row>' +
      //Quinta fila del grid
      '<ion-row><p id="valoracionMediaInfowindow"  style="text-align: left; "><ion-icon name="star"></ion-icon>&nbsp' + establecimiento.valoracionMedia + '</p></ion-row>' +
      '</ion-grid>' +
      '</div>';

    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      this.cerrarTodasInfoWindows();
      infoWindow.open(this.map, marker);
    });

    //Una vez el DOM este listo le añadimos un listener al boton dentro de la infowindow
    /*google.maps.event.addListener(infoWindow, 'domready', function () {

      //Listener que se activa al pulsar sobre el avatar del infowindow
      google.maps.event.addDomListener(document.getElementById("botonVerPerfilEstablecimiento"), 'click', function (e) {

        this.uidEstablecimientoSend=establecimiento.uidEstablecimiento;
      })

      //Listener que se activa al pulsar sobre el boton de ir al establecimiento 
      google.maps.event.addDomListener(document.getElementById("botonIrAEstablecimiento"), 'click', function (e) {

        this.uidEstablecimientoSend=establecimiento.uidEstablecimiento;

      })
    });*/
    this.infoWindows.push(infoWindow);

  }


  cerrarTodasInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
    //FIN METODOS MAPA
  }

}
