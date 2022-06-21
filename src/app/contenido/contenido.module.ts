import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

import { PacientesComponent } from './components/pacientes/pacientes.component';

import { RolesComponent } from './components/roles/roles.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { ContenidoRoutingModule } from './contenido-routing.module';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';



@NgModule({
  declarations: [
    UsuariosComponent,
    PacientesComponent,
    RolesComponent,
    CalendarioComponent,
    GraficoComponent,
    ListadoUsuariosComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ContenidoRoutingModule
  ],
  exports: [
    CalendarioComponent,
    GraficoComponent,

  ]
})
export class ContenidoModule { }
