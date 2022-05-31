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
    loadChildren: () => import('./usuario/inicio-usuario/inicio-usuario-base.module').then( m => m.InicioUsuarioBasePageModule)
  },
  {
    path: 'inicio-usuario-base',
    loadChildren: () => import('./usuario/inicio-usuario/inicio-usuario-base.module').then( m => m.InicioUsuarioBasePageModule)
  },
  {
    path: 'registro-usuario',
    loadChildren: () => import('./usuario/registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule)
  },
  {
    path: 'registro-establecimiento',
    loadChildren: () => import('./establecimiento/registro-establecimiento/registro-establecimiento.module').then( m => m.RegistroEstablecimientoPageModule)
  },  {
    path: 'inicio-establecimiento',
    loadChildren: () => import('./establecimiento/inicio-establecimiento/inicio-establecimiento/inicio-establecimiento.module').then( m => m.InicioEstablecimientoPageModule)
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./usuario/perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
  },
  {
    path: 'perfil-establecimiento',
    loadChildren: () => import('./establecimiento/perfil-establecimiento/perfil-establecimiento.module').then( m => m.PerfilEstablecimientoPageModule)
  },
  {
    path: 'configuracion-establecimiento',
    loadChildren: () => import('./establecimiento/configuracion-establecimiento/configuracion-establecimiento.module').then( m => m.ConfiguracionEstablecimientoPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
