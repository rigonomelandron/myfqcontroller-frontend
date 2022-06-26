import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { AnaliticaService } from 'src/app/shared/services/analitica.service';
import { AntecedentesService } from 'src/app/shared/services/antecedentes.service';
import { EventoService } from 'src/app/shared/services/evento.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { TratamientoService } from 'src/app/shared/services/tratamiento.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  public mostrarFormTratamientos: boolean = false;
  public formTratamientos: FormGroup;
  public formEventos: FormGroup;
  public mostrarFormEventos:boolean=false;
  public formHistoria: FormGroup;
  public mostrarFormHistorias:boolean=false;
  public formAnalitica: FormGroup;
  public mostrarFormAnaliticas:boolean=false;
  public oralOption: any[];
  public paciente: Paciente;
  constructor(
    private _formBuilder: FormBuilder,
    private _tratamientoServices: TratamientoService,
    private _pacienteServices: PacientesService,
    private _eventoServices: EventoService,
    private _antecedenteServices: AntecedentesService,
    private _analiticaServices: AnaliticaService
    ) {

    this.formTratamientos = this._formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      fecha: ['', [Validators.required, Validators.minLength(3)]],
      archivo: ['', [Validators.required]],
      oral: ['', [Validators.required]],

    });
    this.formEventos = this._formBuilder.group({
      fecha: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      importancia: ['0', [Validators.required, Validators.minLength(3)]],
    });
    this.formHistoria = this._formBuilder.group({
      fecha: ['', [Validators.required, Validators.minLength(3)]],
      diagnostico: ['', [Validators.required, Validators.minLength(3)]],

    });

    this.formAnalitica = this._formBuilder.group({
      fecha: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', [Validators.required, Validators.minLength(3)]],
      archivo: ['', [Validators.required]],
    });
    this.oralOption = [
      {name: 'Oral', value: 'oral'},
      {name: 'Inhalado', value: 'inhalado'},

    ];
    this.mostrarFormTratamientos = false;
    this.paciente = {} as Paciente;


   }

  ngOnInit(): void {
    this.obtenerPaciente();
  }
  public mostrarFormEvento() {
     this.formEventos.reset();
     this.mostrarFormEventos = true;
  }
  public mostrarFormTratamiento() {
    this.formTratamientos.reset();
    this.mostrarFormTratamientos= true;
  }
  public mostrarFormHistoria() {
    this.formHistoria.reset();
    this.mostrarFormHistorias = true;
  }
  public mostrarFormAnalitica() {
    this.formAnalitica.reset();
    this.mostrarFormAnaliticas = true;
  }
  public cerrarDialogoTratamientos() {
    this.mostrarFormTratamientos = false;
  }
  public cerrarDialogosEventos(){
    this.mostrarFormEventos = false;
  }
  public cerrarDialogoHistoria(){
    this.mostrarFormHistorias = false;
  }
  public cerrarDialogoAnaliticas(){
    this.mostrarFormAnaliticas = false;
  }
  public addRegistroEventos() {
    if (this.formEventos.valid && this.paciente) {
      let evento = {
        paciente: this.paciente,
        fecha: this.formEventos.value.fecha,
        descripcion: this.formEventos.value.descripcion,
        importancia: this.formEventos.value.importancia,
      }
      this._eventoServices.postEvento(evento).subscribe({
        next: (data) => {
          console.log(data);
        }
      });
    }

  }
  public addRegistroHistoria() {

    if(this.formHistoria.valid && this.paciente){
    let historia = {
      paciente: this.paciente,
      fecha: this.formHistoria.value.fecha,
      diagnostico: this.formHistoria.value.diagnostico,
    }
   this._antecedenteServices.addAntecedente(historia).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }

   });
  }
  }
  public addRegistroAnalitica() {
    if(this.formAnalitica.valid && this.paciente){
    let analitica = {
      paciente: this.paciente,
      fecha: this.formAnalitica.value.fecha,
      tipo: this.formAnalitica.value.tipo,
      archivo: this.formAnalitica.value.archivo,
    }
    console.log(analitica);
   this._analiticaServices.postAnalitica(analitica).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }

   });
  }

  }
  public addRegistroTratamientos() {

    if(this.formTratamientos.valid && this.paciente){
    let tratamiento = {
      paciente: this.paciente,
      descripcion: this.formTratamientos.value.descripcion,
      fecha: this.formTratamientos.value.fecha,
      archivo: this.formTratamientos.value.archivo,
      oral: this.formTratamientos.value.oral == 'oral'? true: false,
      inhalado: this.formTratamientos.value.oral == 'inhalado'? true: false,

    }
     this._tratamientoServices.postTratamiento(tratamiento).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
      }
    });
  }
  }


  public obtenerPaciente(){
    let usuario = localStorage.getItem('usuario');
    if(usuario){
    this._pacienteServices.getPacienteByUserName(usuario).subscribe({

      next: (data) => {
        this.paciente = data;
      }
    });

    }

  }

}
