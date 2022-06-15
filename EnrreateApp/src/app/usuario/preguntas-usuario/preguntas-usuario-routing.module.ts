import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntasUsuarioPage } from './preguntas-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntasUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntasUsuarioPageRoutingModule {}
