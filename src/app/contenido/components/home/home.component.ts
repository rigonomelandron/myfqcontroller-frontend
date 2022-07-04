import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public checked:boolean = false;
  public mensajeModificado!:Mensaje;
  constructor(
    private _mensajeServices: MensajesService,
     private _pacienteServices: PacientesService,
     private _router: Router) {
    this.mensajes = [] as Mensaje[];
  }

  ngOnInit(): void {
    this.obtenerPaciente();

  }
  public obtenerMensajes() {
    let visto = false;
    this._mensajeServices.mensajeNoVisto(this.paciente.dni, visto).subscribe(
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
  public modificarVisto(mensaje:Mensaje){

    this.mensajeModificado = {
      id: mensaje.id,
      idPaciente: mensaje.idPaciente,
      idMedico: mensaje.idMedico,
      mensaje: mensaje.mensaje,
      fecha: mensaje.fecha,
      visto: true,
    }
    console.log("mensajeModificado",this.mensajeModificado);

    this._mensajeServices.modificarVisto(this.mensajeModificado).subscribe({
      next: (data: Mensaje) => {
        console.log("modificado",data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }

    });

  }

public cerrarDialog(){
  this.mostrarMensaje = false;
  this.recargarPagina();

}
public recargarPagina(){
   this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  this._router.onSameUrlNavigation = 'reload';
  this._router.navigate(['/contenido/home']);
}



}
