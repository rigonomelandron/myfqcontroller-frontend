import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public abrirMensaje:boolean = false;
  public formMensaje: FormGroup;
  constructor(
    private _mensajeServices: MensajesService,
     private _pacienteServices: PacientesService,
     private _router: Router,
    private _formBuilder: FormBuilder
     ) {
    this.mensajes = [] as Mensaje[];
    this.formMensaje = this._formBuilder.group({

      mensaje: ['', Validators.required]

    });
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

public responderMensaje(){
  console.log("responderMensaje",this.mensajes[0]);
  let mensaje = {

    idPaciente: this.mensajes[0].idPaciente,
    idMedico: this.mensajes[0].idMedico,
    fecha: new Date(),
    mensaje: this.formMensaje.value.mensaje,
    isVisto: false,
    rol: "paciente"
  }

  this._mensajeServices.addMensaje(mensaje).subscribe({

    next: (mensaje: Mensaje) => {
      this.abrirMensaje = false;
      this.formMensaje.reset();

    },
    error: (err) => {
      console.log(err);
    }
  });
}
//abrir el dialogo para enviar mensaje
public abrirDialogMensaje(){
  this.abrirMensaje = true;
}
//cerrar el dialogo para enviar mensaje
public cerrarDialogMensaje(){
  this.abrirMensaje = false;
  this.formMensaje.reset();
}

}
