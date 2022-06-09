import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-eventos-guardados-usuario',
  templateUrl: './eventos-guardados-usuario.page.html',
  styleUrls: ['./eventos-guardados-usuario.page.scss'],
})
export class EventosGuardadosUsuarioPage implements OnInit {

  constructor(public menuCtrl: MenuController, private router: Router, private navCtrl: NavController, public firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
  }

  //FIN MÉTODOS MENÚ

}
