import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';

//---MANTENIMIENTO RUTA PARA LISTAR USUARIO
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
// import { OdontologosComponent } from './mantenimientos/odontologos/odontologos.component';
// import { OdontologoComponent } from './mantenimientos/odontologos/odontologo.component';
// import { TratamientoComponent } from './mantenimientoclinicas/tratamiento/tratamiento.component';
// //import { authGuard } from '../guards/auth.guard';
import { AuthGuard } from '../guards/auth.guard';
// import { TratamientosComponent } from './mantenimientoclinicas/tratamiento/tratamientos.component';

const routes: Routes =[
  //---Crear rutas qeu esTaran protegidas al iniciar sesion--
  {
    path: 'dashboard',//ruta padre para que se Visualise  asi:
    component: PagesComponent,
    canActivate:[AuthGuard],
    //canActivate:[authGuard],
    //----RUTAS HIJAS--
    children:[
      { path: '', component: DashboardComponent},
      { path: 'grafica1', component: Grafica1Component},
      { path: 'progress', component: ProgressComponent},
      //{ path: '', redirectTo: '/dashboard', pathMatch: 'full'},//si no ingreso a ninguna ruta le direcciona a dashboard
      
      //---MANTENIMIENTO RUTA PARA LISTAR USUARIO
      { path: 'usuario', component: UsuariosComponent},
      { path: 'usuario/:id', component: UsuarioComponent},

    ]
  },
  //--hasta aqui--
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}