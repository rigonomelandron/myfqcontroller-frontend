import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-respiratorio',
  templateUrl: './tarjeta-respiratorio.component.html',
  styleUrls: ['./tarjeta-respiratorio.component.css']
})
export class TarjetaRespiratorioComponent implements OnInit {

  public datos: string[];

  constructor() {
    this.datos = [
      'FVC: 3.52L',
      'FEV1: 3.06L',
      'Saturación: 98%',
      'Antibiótico: 22-04-21 (Septrim)'

    ]
   }

  ngOnInit(): void {
  }

}
