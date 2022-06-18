import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DoctoresComponent } from './components/doctores/doctores.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { RolesComponent } from './components/roles/roles.component';
import { CalendarioComponent } from './components/calendario/calendario.component';



@NgModule({
  declarations: [
    UsuariosComponent,
    DoctoresComponent,
    PacientesComponent,
    EquiposComponent,
    RolesComponent,
    CalendarioComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalendarioComponent
  ]
})
export class ContenidoModule { }
