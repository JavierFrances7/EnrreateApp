import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionEstablecimientoPage } from './configuracion-establecimiento.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionEstablecimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionEstablecimientoPageRoutingModule {}
