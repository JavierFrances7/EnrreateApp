import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroEstablecimientoPageRoutingModule } from './registro-establecimiento-routing.module';

import { RegistroEstablecimientoPage } from './registro-establecimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistroEstablecimientoPageRoutingModule
  ],
  declarations: [RegistroEstablecimientoPage]
})
export class RegistroEstablecimientoPageModule {}
