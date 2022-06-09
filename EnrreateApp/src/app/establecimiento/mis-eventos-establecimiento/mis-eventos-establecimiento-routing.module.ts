import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisEventosEstablecimientoPage } from './mis-eventos-establecimiento.page';

const routes: Routes = [
  {
    path: '',
    component: MisEventosEstablecimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisEventosEstablecimientoPageRoutingModule {}
