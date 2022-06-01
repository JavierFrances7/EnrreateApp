import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteVerPerfilEstablecimientoPage } from './cliente-ver-perfil-establecimiento.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteVerPerfilEstablecimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteVerPerfilEstablecimientoPageRoutingModule {}
