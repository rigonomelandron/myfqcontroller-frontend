import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { Doctor } from 'src/app/shared/interfaces/doctor.interface';
import { Equipo } from 'src/app/shared/interfaces/equipo.interface';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DoctoresService } from 'src/app/shared/services/doctores.service';
import { EquiposService } from 'src/app/shared/services/equipos.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-ajustes-medico',
  templateUrl: './ajustes-medico.component.html',
  styleUrls: ['./ajustes-medico.component.css'],
  providers: [ConfirmationService]
})
export class AjustesMedicoComponent implements OnInit {
  public mostrarFormulario: boolean = false;
  public formDoctor: FormGroup;
  public medico!: Doctor;
  public msgs: Message[] = [];
  public usuario!:Usuario;

  constructor(
    private _formBuilder: FormBuilder,
    private _pacientesServices: PacientesService,
    private _usuariosServices: UsuariosService,
    private _confirmationService: ConfirmationService,
    private _router: Router,
    private _authService: AuthService,
    private _equipoService: EquiposService,
    private _doctoresService: DoctoresService

  ) {
    this.formDoctor = this._formBuilder.group({
      numColegiado: [''],
      nombre: ['', []],
      email: ['', []],
      idUsuario: ['', []]
    });
  


  }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerMedico();
  }

  public addMedico (){
    let medico = {
      numColegiado: this.medico.numColegiado,
      nombre: this.medico.nombre,
      email: this.medico.email,
      idUsuario: this.medico.idUsuario
    }
    console.log('Medico:', medico);
    
    this._doctoresService.modificarDoctor(medico).subscribe({
      next: (data) => {
        console.log('Data: ',data);
        
      }
    });

    this.cerrarDialogo();
  }
  
  public cerrarDialogo() {
    this.mostrarFormulario = false;
  }
  public abrirDialogo() {
    this.mostrarFormulario = true;
  }
  public confirmarEliminar() {
    this._confirmationService.confirm({
      message: '??Quieres eliminar este usuario?',
      header: 'Confirmaci??n de borrado',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmar', detail: 'Usuario Borrado' }];
        this.eliminarUsuario();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rehusar', detail: 'Volver' }];
      }
    });
  }

  public eliminarUsuario() {
    this._usuariosServices.deleteUsuario(this.medico.idUsuario).subscribe({
      next: (data) => {
        this._authService.logOut();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public obtenerMedico() {
    let usuario = localStorage.getItem('usuario');
    if (usuario) {
      this._doctoresService.getDoctorByIdUsuario(usuario).subscribe({
        next: (data) => {
          this.medico = data;
          this.formDoctor.setValue(this.medico);

        },
        error: (err) => {
          console.log(err);
        }
      });


    }
  }
    
  public obtenerUsuario() {
    let usuario = localStorage.getItem('usuario');
    if (usuario) {
      this._doctoresService.getDoctorByIdUsuario(usuario).subscribe({
        next: (data: Doctor) => {
          this.medico = data;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    }
  }

}
