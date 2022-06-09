import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.page.html',
  styleUrls: ['./configuracion-usuario.page.scss'],
})
export class ConfiguracionUsuarioPage implements OnInit {

  constructor(public menuCtrl: MenuController, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }



}
