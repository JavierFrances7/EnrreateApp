import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-usuario-base',
  templateUrl: './inicio-usuario-base.page.html',
  styleUrls: ['./inicio-usuario-base.page.scss'],
})
export class InicioUsuarioBasePage implements OnInit {

  constructor(private menuCtrl : MenuController, private router: Router) { }

  ngOnInit() {
  }

  //Método que detecta si el menú esta abierto (si es así lo cierra) y viceversa
  activarMenuUsuario(){
    this.menuCtrl.toggle();
  }

 clickItem1Menu(){
      this.router.navigate(['/registro-usuario']);
  }
}

