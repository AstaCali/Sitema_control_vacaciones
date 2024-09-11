import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from  '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//---MODULOS IMPORTADOS DE TERCEROS QUENO HICE Y NO SON DE ANGULAR 


//--MODULOS IMPORTADOS DE LO QUE HISE
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { VacationComponent } from './mantenimientos/vacation/vacation.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    UsuariosComponent,
    UsuarioComponent,
    VacationComponent,
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],
  imports: [
    //--imporX4acio de ANGULAR PROPIO
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //---imporX4acio de terceros

    //--imporTacion que hice
    SharedModule,
    RouterModule,
    ComponentsModule
  ]
})
export class PagesModule { }
