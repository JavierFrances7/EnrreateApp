import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioEstablecimientoPageRoutingModule } from './inicio-establecimiento-routing.module';

import { InicioEstablecimientoPage } from './inicio-establecimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioEstablecimientoPageRoutingModule
  ],
  declarations: [InicioEstablecimientoPage]
})
export class InicioEstablecimientoPageModule {}
