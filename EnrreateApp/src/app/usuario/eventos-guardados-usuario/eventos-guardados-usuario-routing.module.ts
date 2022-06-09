import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventosGuardadosUsuarioPage } from './eventos-guardados-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: EventosGuardadosUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventosGuardadosUsuarioPageRoutingModule {}
