import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaRespiratorioComponent } from './components/tarjeta-respiratorio/tarjeta-respiratorio.component';
import { TarjetaActividadComponent } from './components/tarjeta-actividad/tarjeta-actividad.component';
import { TarjetaResumenComponent } from './components/tarjeta-resumen/tarjeta-resumen.component';
import { PrimengModule } from '../primeng/primeng.module';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { DatosRespiratoriosComponent } from './components/datos-respiratorios/datos-respiratorios.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    TarjetaRespiratorioComponent,
    TarjetaActividadComponent,
    TarjetaResumenComponent,
    DatosRespiratoriosComponent,
    ActividadComponent,
    ResumenComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    CardModule,
    ListboxModule,
    ButtonModule,
    RippleModule,
  ],
  exports: [
    TarjetaRespiratorioComponent,
    TarjetaActividadComponent,
    TarjetaResumenComponent,
    DatosRespiratoriosComponent,
    ActividadComponent,
    ResumenComponent,
    HomeComponent
  ]
})
export class ContenidoModule { }
