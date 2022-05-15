import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioUsuarioBasePage } from './inicio-usuario-base.page';

const routes: Routes = [
  {
    path: '',
    component: InicioUsuarioBasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioUsuarioBasePageRoutingModule {}
