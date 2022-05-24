import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilEstablecimientoPage } from './perfil-establecimiento.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilEstablecimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilEstablecimientoPageRoutingModule {}
