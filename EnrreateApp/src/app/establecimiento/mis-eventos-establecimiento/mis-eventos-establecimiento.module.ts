import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisEventosEstablecimientoPageRoutingModule } from './mis-eventos-establecimiento-routing.module';

import { MisEventosEstablecimientoPage } from './mis-eventos-establecimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisEventosEstablecimientoPageRoutingModule
  ],
  declarations: [MisEventosEstablecimientoPage]
})
export class MisEventosEstablecimientoPageModule {}
