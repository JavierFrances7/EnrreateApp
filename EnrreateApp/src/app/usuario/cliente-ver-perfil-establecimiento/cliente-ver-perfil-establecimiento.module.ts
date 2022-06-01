import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteVerPerfilEstablecimientoPageRoutingModule } from './cliente-ver-perfil-establecimiento-routing.module';

import { ClienteVerPerfilEstablecimientoPage } from './cliente-ver-perfil-establecimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteVerPerfilEstablecimientoPageRoutingModule
  ],
  declarations: [ClienteVerPerfilEstablecimientoPage]
})
export class ClienteVerPerfilEstablecimientoPageModule {}
