import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-actividad',
  templateUrl: './tarjeta-actividad.component.html',
  styleUrls: ['./tarjeta-actividad.component.css']
})
export class TarjetaActividadComponent implements OnInit {

  public datos: string[];

  constructor() {
    this.datos = [
      'Calorías: 452cal',
      'Máxima: 162ppm',
      'Media: 138ppm',
      'Tiempo: 01:24:54'

    ]
   }

  ngOnInit(): void {
  }

}
