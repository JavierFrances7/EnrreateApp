import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEstablecimientosPageRoutingModule } from './lista-establecimientos-routing.module';

import { ListaEstablecimientosPage } from './lista-establecimientos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEstablecimientosPageRoutingModule
  ],
  declarations: [ListaEstablecimientosPage]
})
export class ListaEstablecimientosPageModule {}
