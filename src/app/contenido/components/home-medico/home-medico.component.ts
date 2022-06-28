import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/shared/interfaces/doctor.interface';
import { Equipo } from 'src/app/shared/interfaces/equipo.interface';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { DoctoresService } from 'src/app/shared/services/doctores.service';
import { EquiposService } from 'src/app/shared/services/equipos.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent implements OnInit {
  public pacientes: Paciente[];
  public doctor? : Doctor;
  public dniPacientes: string[];
  public equipos: Equipo[];
  public paciente : string;
  constructor(
    private _doctorServices: DoctoresService,
    private _pacienteServices: PacientesService,
    private _equiposServices: EquiposService,
    private _router : Router
    ) {
    this.pacientes = [];
    this.dniPacientes = [];
    this.equipos = [];
    this.paciente='';

   }

  ngOnInit(): void {
    this.obtenerDoctor();
  }

  public obtenerDoctor(){

    let usuario = localStorage.getItem('usuario');


    if(usuario){
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
  public obtenerEquipos(){
    if(this.doctor){
      this._equiposServices.getEquipoByIdMedico(this.doctor.numColegiado).subscribe({
        next: (equipos) => {
          console.log(equipos);

              for(let equipo of equipos){
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
  public obtenerPacientes(){

    for(let dni of this.dniPacientes){
      this._pacienteServices.getPaciente(dni).subscribe({
        next: (paciente:Paciente) => {
          console.log(paciente);
          this.pacientes.push(paciente);
        }
      });
    }
  }

  public calendario(paciente:Paciente){

    this.paciente = paciente.dni;
    let usuarioPaciente = localStorage.getItem('paciente');
    if(usuarioPaciente){
      localStorage.removeItem('paciente');
    }
    localStorage.setItem('paciente', this.paciente);
  ;
  }
  public eliminarPaciente(paciente:Paciente){
    this.paciente = paciente.dni;
   this._equiposServices.getEquipoByIdPaciente(this.paciente).subscribe({
      next: (equipo:Equipo) => {
        console.log(equipo);
        this._equiposServices.deleteEquipo(equipo.id).subscribe({
          next: (equipo) => {
            console.log(equipo);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }

    });
  }


}
