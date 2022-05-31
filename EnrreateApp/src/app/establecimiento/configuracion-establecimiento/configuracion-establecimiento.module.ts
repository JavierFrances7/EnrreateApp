import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionEstablecimientoPageRoutingModule } from './configuracion-establecimiento-routing.module';

import { ConfiguracionEstablecimientoPage } from './configuracion-establecimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ConfiguracionEstablecimientoPageRoutingModule
  ],
  declarations: [ConfiguracionEstablecimientoPage]
})
export class ConfiguracionEstablecimientoPageModule {}
