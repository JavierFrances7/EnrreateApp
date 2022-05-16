import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio-usuario-base',
    loadChildren: () => import('./usuario_base/inicio-usuario-base/inicio-usuario-base.module').then( m => m.InicioUsuarioBasePageModule)
  },
  {
    path: 'inicio-usuario-base',
    loadChildren: () => import('./usuario_base/inicio-usuario-base/inicio-usuario-base.module').then( m => m.InicioUsuarioBasePageModule)
  },
  {
    path: 'registro-usuario',
    loadChildren: () => import('./usuario_base/registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule)
  },
  {
    path: 'registro-establecimiento',
    loadChildren: () => import('./gerente_establecimiento/registro-establecimiento/registro-establecimiento.module').then( m => m.RegistroEstablecimientoPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
