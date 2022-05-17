import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroEstablecimientoPage } from './registro-establecimiento.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroEstablecimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroEstablecimientoPageRoutingModule {}
