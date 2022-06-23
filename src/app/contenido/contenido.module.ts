import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlicadaComponent } from './components/glicada/glicada.component';
import { EventoComponent } from './components/evento/evento.component';
import { TensionComponent } from './components/tension/tension.component';
import { AnaliticaComponent } from './components/analitica/analitica.component';
import { TratamientoComponent } from './components/tratamiento/tratamiento.component';




@NgModule({
  declarations: [
    GlicadaComponent,
    EventoComponent,
    TensionComponent,
    AnaliticaComponent,
    TratamientoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GlicadaComponent,
    EventoComponent,
    TensionComponent,
    AnaliticaComponent,
    TratamientoComponent
  ]
})
export class ContenidoModule { }
