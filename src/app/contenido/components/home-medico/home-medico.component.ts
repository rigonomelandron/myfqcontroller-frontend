import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent implements OnInit {
  public pacientes: Paciente[];
  constructor() {
    this.pacientes = [];
   }

  ngOnInit(): void {
  }

}
