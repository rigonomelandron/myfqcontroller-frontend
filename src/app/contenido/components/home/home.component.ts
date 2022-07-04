import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/shared/interfaces/mensaje.interface';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public paciente! : Paciente;
  public mensajes : Mensaje[];
  public mostrarMensaje:boolean = false;
  constructor(private _mensajeServices: MensajesService, private _pacienteServices: PacientesService) {
    this.mensajes = [] as Mensaje[];
  }

  ngOnInit(): void {
    this.obtenerPaciente();

  }
  public obtenerMensajes() {
    this._mensajeServices.getMensajesByIdPaciente(this.paciente.dni).subscribe(
      (data: any) => {
        console.log("mensaje",data);
        this.mensajes = data;
      }
    )
  }
  public obtenerPaciente() {
    let usuario = localStorage.getItem('usuario');
    if(usuario){
    this._pacienteServices.getPacienteByUserName(usuario).subscribe({
      next: (data: Paciente) => {
        console.log(data);
        this.paciente = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {
       this.obtenerMensajes();
      }
   });
  }
  }

  public mostrarMensajes() {

    this.mostrarMensaje = true;
  }



}
