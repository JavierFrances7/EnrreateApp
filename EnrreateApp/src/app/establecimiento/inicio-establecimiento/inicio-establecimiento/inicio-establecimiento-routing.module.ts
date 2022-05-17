import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioEstablecimientoPage } from './inicio-establecimiento.page';

const routes: Routes = [
  {
    path: '',
    component: InicioEstablecimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioEstablecimientoPageRoutingModule {}
