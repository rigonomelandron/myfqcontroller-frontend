import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Analitica } from 'src/app/shared/interfaces/analitica.interface';
import { Antecedente } from 'src/app/shared/interfaces/antecedente.interface';
import { Evento } from 'src/app/shared/interfaces/evento.interface';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { Tratamiento } from 'src/app/shared/interfaces/tratamiento.interface';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { AnaliticaService } from 'src/app/shared/services/analitica.service';
import { AntecedentesService } from 'src/app/shared/services/antecedentes.service';
import { EventoService } from 'src/app/shared/services/evento.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { TratamientoService } from 'src/app/shared/services/tratamiento.service';
import { ConfirmationService, MessageService, PrimeIcons } from "primeng/api";

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
  providers: [MessageService, ConfirmationService]
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
  public tratamientos!: Tratamiento[];
  public eventos!: Evento[];
  public antecedentes!:Antecedente[];
  public analiticas!: Analitica[];

  constructor(
    private _formBuilder: FormBuilder,
    private _tratamientoServices: TratamientoService,
    private _pacienteServices: PacientesService,
    private _eventoServices: EventoService,
    private _antecedenteServices: AntecedentesService,
    private _analiticaServices: AnaliticaService,
    private _mensajeService: MessageService,
    private _confirmarService: ConfirmationService
    ) {

    this.formTratamientos = this._formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      fecha: ['', [Validators.required, Validators.minLength(3)]],
      archivo: [''],
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
      archivo: [''],
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
          this._mensajeService.add({
            severity: 'success', summary: 'Añadido', detail: `Evento Añadido correctamente `, life: 2000
          });
        },
        error: (err: HttpErrorResponse) => {
          this._mensajeService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 2000 });
        },
        complete: () => {
          this.mostrarFormEventos = false;
          this.getEventos();
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
       this._mensajeService.add({
         severity: 'success', summary: 'Añadido', detail: `Antecedente Añadido correctamente `, life: 2000
       });
      },
      error: (err: HttpErrorResponse) => {
        this._mensajeService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 2000 });
      },
      complete: () => {
        this.mostrarFormHistorias = false;
        this.getHistorias();
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

   this._analiticaServices.postAnalitica(analitica).subscribe({
      next: (data) => {
       this._mensajeService.add({
         severity: 'success', summary: 'Añadido', detail: ` Analitica añadida correctamente `, life: 2000
       });
      },
      error: (err: HttpErrorResponse) => {
        this._mensajeService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 2000 });
      },
      complete: () => {
        this.mostrarFormAnaliticas = false;
        this.getAnaliticas();
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
         this._mensajeService.add({
           severity: 'success', summary: 'Añadido', detail: `Tratamiento Añadido correctamente `, life: 2000
         });
      },
      error: (err:HttpErrorResponse) => {
         this._mensajeService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 2000 });
      },
      complete: () => {
        this.mostrarFormTratamientos = false;
        this.getTratamientos();
      }
    });
  }
  }

  public getTratamientos(){
    this._tratamientoServices.getTratamientoByDni(this.paciente.dni).subscribe({
      next: (data) => {
        this.tratamientos = data.sort((d1, d2) => new Date(d2.fecha).getTime() - new Date(d1.fecha).getTime());
      }
    });
  }
  public getEventos(){
    this._eventoServices.getEventoByDni(this.paciente.dni).subscribe({
      next: (data) => {

        this.eventos = data.sort((d1, d2) => new Date(d2.fecha).getTime() - new Date(d1.fecha).getTime());

      }
    });
  }
  public getHistorias(){
    this._antecedenteServices.getAntecedentesByDni(this.paciente.dni).subscribe({
      next: (data) => {
        this.antecedentes = data.sort((d1, d2) => new Date(d2.fecha).getTime() - new Date(d1.fecha).getTime());

      }
    });
  }
  public getAnaliticas(){
    this._analiticaServices.getAnaliticaByDni(this.paciente.dni).subscribe({
      next: (data) => {
        this.analiticas = data.sort((d1, d2) => new Date(d2.fecha).getTime() - new Date(d1.fecha).getTime());

      }
    });
  }


  public obtenerPaciente(){
    let usuario = localStorage.getItem('usuario');
    if(usuario){
    this._pacienteServices.getPacienteByUserName(usuario).subscribe({

      next: (data) => {
        this.paciente = data;
        this.getTratamientos();
        this.getEventos();
        this.getHistorias();
        this.getAnaliticas();

      }
    });

    }

  }

}
