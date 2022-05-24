import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilEstablecimientoPageRoutingModule } from './perfil-establecimiento-routing.module';

import { PerfilEstablecimientoPage } from './perfil-establecimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilEstablecimientoPageRoutingModule
  ],
  declarations: [PerfilEstablecimientoPage]
})
export class PerfilEstablecimientoPageModule {}
