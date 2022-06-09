import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventosGuardadosUsuarioPageRoutingModule } from './eventos-guardados-usuario-routing.module';

import { EventosGuardadosUsuarioPage } from './eventos-guardados-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventosGuardadosUsuarioPageRoutingModule
  ],
  declarations: [EventosGuardadosUsuarioPage]
})
export class EventosGuardadosUsuarioPageModule {}
