import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEstablecimientosPage } from './lista-establecimientos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEstablecimientosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaEstablecimientosPageRoutingModule {}
