import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth-service';

@Component({
  selector: 'app-inicio-establecimiento',
  templateUrl: './inicio-establecimiento.page.html',
  styleUrls: ['./inicio-establecimiento.page.scss'],
})
export class InicioEstablecimientoPage implements OnInit {

  constructor(private menuCtrl: MenuController, private router: Router, public firebaseAuthService: FirebaseAuthService, private navCtrl: NavController) { }

  ngOnInit() {
      this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

}
