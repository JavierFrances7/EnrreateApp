import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionEstablecimientoPageRoutingModule } from './configuracion-establecimiento-routing.module';

import { ConfiguracionEstablecimientoPage } from './configuracion-establecimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionEstablecimientoPageRoutingModule
  ],
  declarations: [ConfiguracionEstablecimientoPage]
})
export class ConfiguracionEstablecimientoPageModule {}
