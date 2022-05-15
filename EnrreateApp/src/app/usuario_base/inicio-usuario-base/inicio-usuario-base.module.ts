import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioUsuarioBasePageRoutingModule } from './inicio-usuario-base-routing.module';

import { InicioUsuarioBasePage } from './inicio-usuario-base.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioUsuarioBasePageRoutingModule
  ],
  declarations: [InicioUsuarioBasePage]
})
export class InicioUsuarioBasePageModule {}
