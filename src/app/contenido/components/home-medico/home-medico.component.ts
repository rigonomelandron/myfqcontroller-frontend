import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Doctor } from 'src/app/shared/interfaces/doctor.interface';
import { Equipo } from 'src/app/shared/interfaces/equipo.interface';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { DoctoresService } from 'src/app/shared/services/doctores.service';
import { EquiposService } from 'src/app/shared/services/equipos.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class HomeMedicoComponent implements OnInit {
  public pacientes: Paciente[];
  public doctor?: Doctor;
  public dniPacientes: string[];
  public equipos: Equipo[];
  public paciente: string;
  msgs: Message[] = [];
  constructor(
    private _doctorServices: DoctoresService,
    private _pacienteServices: PacientesService,
    private _equiposServices: EquiposService,
    private _confirmationService: ConfirmationService,
    private _router: Router
  ) {
    this.pacientes = [];
    this.dniPacientes = [];
    this.equipos = [];
    this.paciente = '';


  }

  ngOnInit(): void {
    this.obtenerDoctor();
  }

  public obtenerDoctor() {

    let usuario = localStorage.getItem('usuario');


    if (usuario) {
      this._doctorServices.getDoctorByIdUsuario(usuario).subscribe({
        next: (doctor) => {

          this.doctor = doctor;
          this.obtenerEquipos();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

  }
  public obtenerEquipos() {
    this.pacientes=[];
    this.dniPacientes=[];
    if (this.doctor) {
      this._equiposServices.getEquipoByIdMedico(this.doctor.numColegiado).subscribe({
        next: (equipos) => {
          console.log(equipos);

          for (let equipo of equipos) {
            this.dniPacientes.push(equipo.idPaciente);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {

          this.obtenerPacientes();
        }
      });
    }
  }
  public obtenerPacientes() {

    for (let dni of this.dniPacientes) {
      this._pacienteServices.getPaciente(dni).subscribe({
        next: (paciente: Paciente) => {
          console.log(paciente);
          this.pacientes.push(paciente);
        }
      });
    }
  }

  public calendario(paciente: Paciente) {

    this.paciente = paciente.dni;
    let usuarioPaciente = localStorage.getItem('paciente');
    if (usuarioPaciente) {
      localStorage.removeItem('paciente');
    }
    localStorage.setItem('paciente', this.paciente);
    ;
  }
  confirmarEliminar(paciente:Paciente) {
    this._confirmationService.confirm({
      message: '¿Quieres eliminar este usuario?',
      header: 'Confirmación de borrado',
      icon: 'pi pi-info-circle',
      acceptLabel:'Si',
      rejectLabel:'No',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmar', detail: 'Usuario Borrado' }];
        this.eliminarPaciente(paciente);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rehusar', detail: 'Volver' }];
      }
    });
  }
  public eliminarPaciente(paciente: Paciente) {
    this.paciente = paciente.dni;
    this._equiposServices.getEquipoByIdPaciente(this.paciente).subscribe({
      next: (equipo: Equipo) => {
        console.log(equipo);
       let id = equipo.id;
       if(id){
        this._equiposServices.deleteEquipo(id).subscribe({
          next: (equipo: Equipo) => {
            console.log(equipo);
            this.obtenerEquipos();
          },
          error: (err) => {
            console.log(err);
          }
        });
       }

      }
    });
  }


}
