import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntasUsuarioPageRoutingModule } from './preguntas-usuario-routing.module';

import { PreguntasUsuarioPage } from './preguntas-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntasUsuarioPageRoutingModule
  ],
  declarations: [PreguntasUsuarioPage]
})
export class PreguntasUsuarioPageModule {}
