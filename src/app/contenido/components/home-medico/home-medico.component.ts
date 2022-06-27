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
    this.pacientes = [{
      dni: '01938429N',
      nombre: 'Pedro Consuegra',
      email: 'pedroconsuegra@paciente.com',
      genero: 'm',
      peso: 63,
      altura: 1.69,
      mutacion1: 'F508D',
      mutacion2: 'G542X',
      idUsuario: 'pedroConsuegra'
    },
    {
      dni: '01938429N',
      nombre: 'Pedro Consuegra',
      email: 'pedroconsuegra@paciente.com',
      genero: 'm',
      peso: 63,
      altura: 1.69,
      mutacion1: 'F508D',
      mutacion2: 'G542X',
      idUsuario: 'pedroConsuegra'
    },
    {
      dni: '01938429N',
      nombre: 'Pedro Consuegra',
      email: 'pedroconsuegra@paciente.com',
      genero: 'm',
      peso: 63,
      altura: 1.69,
      mutacion1: 'F508D',
      mutacion2: 'G542X',
      idUsuario: 'pedroConsuegra'
    },
    {
      dni: '01938429N',
      nombre: 'Pedro Consuegra',
      email: 'pedroconsuegra@paciente.com',
      genero: 'm',
      peso: 63,
      altura: 1.69,
      mutacion1: 'F508D',
      mutacion2: 'G542X',
      idUsuario: 'pedroConsuegra'
    },
    {
      dni: '01938429N',
      nombre: 'Pedro Consuegra',
      email: 'pedroconsuegra@paciente.com',
      genero: 'm',
      peso: 63,
      altura: 1.69,
      mutacion1: 'F508D',
      mutacion2: 'G542X',
      idUsuario: 'pedroConsuegra'
    }];
   }

  ngOnInit(): void {
  }

}
