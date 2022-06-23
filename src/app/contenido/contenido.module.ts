import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlicadaComponent } from './components/glicada/glicada.component';
import { EventoComponent } from './components/evento/evento.component';
import { TensionComponent } from './components/tension/tension.component';
import { AnaliticaComponent } from './components/analitica/analitica.component';
import { TratamientoComponent } from './components/tratamiento/tratamiento.component';
import { TarjetaRespiratorioComponent } from './components/tarjeta-respiratorio/tarjeta-respiratorio.component';
import { TarjetaActividadComponent } from './components/tarjeta-actividad/tarjeta-actividad.component';
import { TarjetaResumenComponent } from './components/tarjeta-resumen/tarjeta-resumen.component';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { DatosRespiratoriosComponent } from './components/datos-respiratorios/datos-respiratorios.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { RolesComponent } from './components/roles/roles.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ContenidoRoutingModule } from './contenido-routing.module';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { DonutComponent } from './components/donut/donut.component';





@NgModule({
  declarations: [
    GlicadaComponent,
    EventoComponent,
    TensionComponent,
    AnaliticaComponent,
    TratamientoComponent,
    CalendarioComponent,
    ListadoUsuariosComponent,
    DonutComponent,
    TarjetaRespiratorioComponent,
    TarjetaActividadComponent,
    TarjetaResumenComponent,
    DatosRespiratoriosComponent,
    ActividadComponent,
    ResumenComponent,
    HomeComponent,
    UsuariosComponent,
    PacientesComponent,
    RolesComponent,
    GraficoComponent

  ],
  imports: [
    CommonModule,
    CommonModule,
    PrimengModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    GlicadaComponent,
    EventoComponent,
    TensionComponent,
    AnaliticaComponent,
    TratamientoComponent,
    FormsModule,
    ContenidoRoutingModule,
    CalendarioComponent,
    ListadoUsuariosComponent,
    DonutComponent,
    TarjetaRespiratorioComponent,
    TarjetaActividadComponent,
    TarjetaResumenComponent,
    DatosRespiratoriosComponent,
    ActividadComponent,
    ResumenComponent,
    HomeComponent,
    UsuariosComponent,
    PacientesComponent,
    RolesComponent,
    MenuComponent,
    GraficoComponent
  ],
  
  
})
export class ContenidoModule { }
