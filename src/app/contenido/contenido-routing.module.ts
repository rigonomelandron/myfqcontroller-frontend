import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadComponent } from './components/actividad/actividad.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { DatosRespiratoriosComponent } from './components/datos-respiratorios/datos-respiratorios.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { HomeComponent } from './components/home/home.component';
import { ResumenComponent } from './components/resumen/resumen.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'calendario', component: CalendarioComponent },
      { path: 'grafico', component: GraficoComponent },
      { path:'home',component: HomeComponent},
      { path:'datos-respiratorios',component: DatosRespiratoriosComponent},
      { path:'actividad',component: ActividadComponent},
      { path:'resumen',component: ResumenComponent},
      { path:'ajustes',component: AjustesComponent},
    ]

  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContenidoRoutingModule { }
