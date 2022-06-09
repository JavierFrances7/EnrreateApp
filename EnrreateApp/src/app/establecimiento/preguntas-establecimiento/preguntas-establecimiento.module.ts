import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntasEstablecimientoPageRoutingModule } from './preguntas-establecimiento-routing.module';

import { PreguntasEstablecimientoPage } from './preguntas-establecimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntasEstablecimientoPageRoutingModule
  ],
  declarations: [PreguntasEstablecimientoPage]
})
export class PreguntasEstablecimientoPageModule {}
