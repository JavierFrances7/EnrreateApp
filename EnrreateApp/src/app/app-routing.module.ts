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
  {
    path: 'cliente-ver-perfil-establecimiento',
    loadChildren: () => import('./usuario/cliente-ver-perfil-establecimiento/cliente-ver-perfil-establecimiento.module').then( m => m.ClienteVerPerfilEstablecimientoPageModule)
  },
  {
    path: 'configuracion-usuario',
    loadChildren: () => import('./usuario/configuracion-usuario/configuracion-usuario.module').then( m => m.ConfiguracionUsuarioPageModule)
  },
  {
    path: 'inicio-admin',
    loadChildren: () => import('./admin/inicio-admin/inicio-admin.module').then( m => m.InicioAdminPageModule)
  },
  {
    path: 'crear-admin',
    loadChildren: () => import('./admin/crear-admin/crear-admin.module').then( m => m.CrearAdminPageModule)
  },
  {
    path: 'eventos-guardados-usuario',
    loadChildren: () => import('./usuario/eventos-guardados-usuario/eventos-guardados-usuario.module').then( m => m.EventosGuardadosUsuarioPageModule)
  },
  {
    path: 'notificaciones-usuario',
    loadChildren: () => import('./usuario/notificaciones-usuario/notificaciones-usuario.module').then( m => m.NotificacionesUsuarioPageModule)
  },
  {
    path: 'preguntas-establecimiento',
    loadChildren: () => import('./establecimiento/preguntas-establecimiento/preguntas-establecimiento.module').then( m => m.PreguntasEstablecimientoPageModule)
  },
  {
    path: 'mis-eventos-establecimiento',
    loadChildren: () => import('./establecimiento/mis-eventos-establecimiento/mis-eventos-establecimiento.module').then( m => m.MisEventosEstablecimientoPageModule)
  },
  {
    path: 'crear-evento',
    loadChildren: () => import('./establecimiento/crear-evento/crear-evento.module').then( m => m.CrearEventoPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
