import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { MenuController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
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


  constructor(private menuCtrl : MenuController, private router: Router, public firebaseAuthService: FirebaseAuthService, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,public apiServiceProvider: ApiServiceProvider) { 
    this.infoWindows = [];
  }

  ngOnInit() {
    
    //Obtenemos los establecimientos de la base de datos
    this.apiServiceProvider.getEstablecimientos()
      .then((establecimientos: Establecimiento[]) => {
        this.establecimientos = establecimientos;
      
      //Cargamos el mapa una vez obtenidos los establecimientos
      if(this.establecimientos!=null){
        this.cargarMapa();
      }

      })
      .catch((error: string) => {
        console.log(error);
      });



  }

  borrarLUEGO(){
    this.router.navigate(['/inicio-establecimiento']);
  }

//MÉTODOS MENÚ
  //Método que 
    clickItem1Menu(){
        this.router.navigate(['/registro-usuario']);
    }
  //Método que redirecciona hacia el perfil de usuario
    verPerfil(){
      this.router.navigate(['/perfil-usuario']);
    }

    irLoginApp(){
      this.router.navigate(['/home']);    
    }

  //Método que detecta si el menú esta abierto (si es así lo cierra) y viceversa
    activarMenuUsuario(){
      this.menuCtrl.toggle();
    }
  //FIN MÉTODOS MENÚ



//MÉTODOS LOGOUT
  //Método que cierra la sesión del usuario  
    async cerrarSesionUsuario(){
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
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapaOpciones);

      //Recorremos los establecimientos recogidos de la base de datos y los posicionamos en el mapa
      for (let inx in this.establecimientos){
        this.anadirEstablecimientosMapa(this.establecimientos[inx]);
    }

      }).catch((error) => {
        console.log('Error obteniendo ubicacion', error);
      });
    }


  anadirEstablecimientosMapa(establecimiento:Establecimiento) {
    //Si se le cambia el nombre a la constante position deja de funcionar, ya que google no reconoce el parametro
    const position = new google.maps.LatLng(establecimiento.latitud, establecimiento.longitud);
    const establecimientoMarker = new google.maps.Marker({ position, title: establecimiento.nombreEstablecimiento });
    this.anadeInfoWindowMarker(establecimientoMarker, establecimiento);
    establecimientoMarker.setMap(this.map);
    console.log("MARKER INSERTADO")
  }

//Metodo que crea una infoWindow personalizada al pulsar sobre un marker 

  anadeInfoWindowMarker(marker, establecimiento:Establecimiento) {

   //Variable que almacena el contenido en formato HTML para insertar en cada marker 
    var infoWindowContent = '<div id="contentInfoWindow" class="contenedor-infowindow">' +
    '<ion-avatar><img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"></ion-avatar>' +
    '<h4 id="tituloInfowindow" class="titulo-infowindow">' + establecimiento.nombreEstablecimiento + '</h4>' +
    '<p id="direccionInfowindow" class="direccion-infowindow">' + establecimiento.direccion + '</p>' +
    '<ion-button id="botonIrAEstablecimiento" class="boton-infowindow-ir-establecimiento"> IR a ' + establecimiento.nombreEstablecimiento + '</ion-button>' +
    '<ion-button id="botonVerPerfilEstablecimiento" class="boton-infowindow-ver-perfil"> VER PERIL </ion-button>' +
    '</div>';
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      this.cerrarTodasInfoWindows();
      infoWindow.open(this.map, marker);
    });

    //Una vez el DOM este listo le añadimos un listener al boton dentro de la infowindow
    google.maps.event.addListener(infoWindow, 'domready', function() {
      google.maps.event.addDomListener(document.getElementById("botonVerPerfilEstablecimiento"), 'click', function(e) {

        //TODO: AQUI HAY QUE IMPLEMENTAR CODIGO QUE REDIRECCIONE A UNA PAGINA DONDE SE VE EL PERFIL DEL 
          console.log(establecimiento.nombreEstablecimiento);
      })
    });
    this.infoWindows.push(infoWindow);

  }


  cerrarTodasInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  //FIN METODOS MAPA
}
}
