import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntasEstablecimientoPage } from './preguntas-establecimiento.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntasEstablecimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntasEstablecimientoPageRoutingModule {}
