import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(public menuCtrl: MenuController, private router: Router, public firebaseAuthService: FirebaseAuthService, private geolocation: Geolocation, 
              private nativeGeocoder: NativeGeocoder, public apiServiceProvider: ApiServiceProvider, private navCtrl: NavController) {
    this.infoWindows = [];
  }

  ngOnInit() {

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

  //MÉTODOS MENÚ
  //Método que redirecciona a eventos
  verEventosGuardados() {
    this.router.navigate(['/eventos-usuario']);
  }

  //Método que redirecciona a notificaciones
  verNotificaciones() {
    this.router.navigate(['/notificaciones-usuario']);
  }

  //Método que redirecciona hacia el perfil de usuario
  verPerfil() {
    this.router.navigate(['/perfil-usuario']);
  }

  //Método que redirecciona hacia el login de la aplicacion
  irLoginApp() {
    this.navCtrl.navigateRoot("/home");
  }

  //Método que redirecciona hacia la configuracion del usuario
  verConfiguracion() {
    this.router.navigate(['/configuracion-usuario']);
  }

  //Método que detecta si el menú esta abierto (si es así lo cierra) y viceversa
  activarMenuUsuario() {
    this.menuCtrl.toggle();
  }
  //FIN MÉTODOS MENÚ

  //MÉTODOS LOGOUT
  //Método que cierra la sesión del usuario  
  async cerrarSesionUsuario() {
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
      '<ion-row><ion-col size="3"></ion-col><ion-col size="6">' +
      '<ion-avatar id="botonVerPerfilEstablecimiento"><img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"></ion-avatar>' +
      '</ion-col><ion-col size="3"></ion-col></ion-row>' +
      //Segunda fila del grid
      '<ion-row><ion-col size="2"></ion-col><ion-col size="8">' +
      '<p id="tituloInfowindow" style="text-transform: uppercase; text-align: center; font-weight: bold; font-size:15px;">' + establecimiento.nombreEstablecimiento + '</p>' +
      '</ion-col><ion-col size="2"></ion-col></ion-row>' +
      //Tercera fila del grid
      '<ion-row><p id="direccionInfowindow"  style="text-align: left; ">' + establecimiento.direccion + '</p></ion-row>' +
      //Cuarta fila del grid
      '<ion-row><p id="aforoMaximoInfowindow"  style="text-align: left; ">Aforo Máximo: ' + establecimiento.aforoMaximo + '</p></ion-row>' +
      //Quinta fila del grid
      '<ion-row><p id="valoracionMediaInfowindow"  style="text-align: left; "><ion-icon name="star"></ion-icon>&nbsp' + establecimiento.valoracionMedia + '</p></ion-row>' +
      //Ultima fila del grid
      '<ion-row>' +
      '<ion-col><ion-button id="botonIrAEstablecimiento" expand="block" style="--background: rgb(161, 12, 211);"> IR a ' + establecimiento.nombreEstablecimiento + '</ion-button></ion-col>' +
      '</ion-row>' +
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
    google.maps.event.addListener(infoWindow, 'domready', function () {

      //Listener que se activa al pulsar sobre el avatar del infowindow
      google.maps.event.addDomListener(document.getElementById("botonVerPerfilEstablecimiento"), 'click', function (e) {

        //TODO: AQUI HAY QUE IMPLEMENTAR CODIGO QUE REDIRECCIONE A UNA PAGINA DONDE SE VE EL PERFIL DEL 
        console.log(establecimiento.nombreEstablecimiento);
      })

      //Listener que se activa al pulsar sobre el boton de ir al establecimiento 
      google.maps.event.addDomListener(document.getElementById("botonIrAEstablecimiento"), 'click', function (e) {

        //TODO: AQUI HAY QUE IMPLEMENTAR CODIGO QUE REDIRECCIONE A UNA PAGINA DONDE SE VE EL PERFIL DEL 
        console.log(establecimiento.nombreEstablecimiento);
      })
    });
    this.infoWindows.push(infoWindow);

  }


  cerrarTodasInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
    //FIN METODOS MAPA
  }
}
