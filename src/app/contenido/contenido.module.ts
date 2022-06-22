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
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';





@NgModule({
  declarations: [
    UsuariosComponent,
    PacientesComponent,
    RolesComponent,
    CalendarioComponent,
    GraficoComponent,
    ListadoUsuariosComponent,
    HomeComponent,


  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ContenidoRoutingModule,
    SharedModule
  ],
  exports: [
    CalendarioComponent,
    GraficoComponent,
    ListadoUsuariosComponent,

  ]
})
export class ContenidoModule { }
