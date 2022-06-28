import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DoctoresService } from 'src/app/shared/services/doctores.service';
import { EquiposService } from 'src/app/shared/services/equipos.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css'],
  providers: [ConfirmationService]
})
export class AjustesComponent implements OnInit {
  public mostrarFormulario:boolean=false;
  public formPaciente:FormGroup;
  public generoOptions: any[];
  public mutacion1:any[];
  public mutacion2:any[];
  public paciente! : Paciente;
  public doctor!: string;
  msgs: Message[] = [];
  constructor(
    private _formBuilder:FormBuilder,
    private _pacientesServices: PacientesService,
    private _usuariosServices: UsuariosService,
    private _confirmationService: ConfirmationService,
    private _router: Router,
    private _authService: AuthService,
    private _equipoService: EquiposService,
    private _doctoresService: DoctoresService

    ) {
    this.formPaciente=this._formBuilder.group({
      dni: [''],
      nombre:['',[]],
      email:['',[]],
      fechaNacimiento:['',[]],
      genero:['',[]],
      peso:['',[]],
      altura:['',[]],
      mutacion1:['',[]],
      mutacion2:['',[]],
      idUsuario:['',[]]
   });
    this.generoOptions = [
      { nombre: 'Hombre', value: 'h' },
      { nombre: 'Mujer', value: 'm' },
      { nombre: 'Otro', value: 'o' }
    ];
    this.mutacion1=[
      { nombre: 'Mutación 1', value: '' },
      { nombre: 'F508del', value: 'F508del' },
      { nombre: 'G542X', value: 'G542X' },
      { nombre: 'N1303K', value: 'N1303K' },
      { nombre: 'R334W', value: 'R334W' },
      { nombre: '1811 + 1.6kbA>G', value: '1811 + 1.6kbA>G' },
      { nombre: '711 + 1G>T', value: '711 + 1G>T' },
      { nombre: 'R1162X', value: 'R1162X' },
      { nombre: 'L206W', value: 'L206W' },
      { nombre: 'Q890X', value: 'Q890X' },
      { nombre: 'R1066C', value: 'R1066C' },
      { nombre: '2789+5G>A', value: '2789+5G>A' },
      { nombre: 'I507del', value: 'I507del' },
      { nombre: 'G85E', value: 'G85E' },
      { nombre: '1609delCA', value: '1609delCA' },
      { nombre: '2869insG', value: '2869insG' },
      { nombre: '712-1G>T', value: '712-1G>T' },
      { nombre: 'W1282X', value: 'W1282X' },
    ];
    this.mutacion2 = [
      { nombre: 'Mutación 2', value: '' },
      { nombre: 'F508del', value: 'F508del' },
      { nombre: 'G542X', value: 'G542X' },
      { nombre: 'N1303K', value: 'N1303K' },
      { nombre: 'R334W', value: 'R334W' },
      { nombre: '1811 + 1.6kbA>G', value: '1811 + 1.6kbA>G' },
      { nombre: '711 + 1G>T', value: '711 + 1G>T' },
      { nombre: 'R1162X', value: 'R1162X' },
      { nombre: 'L206W', value: 'L206W' },
      { nombre: 'Q890X', value: 'Q890X' },
      { nombre: 'R1066C', value: 'R1066C' },
      { nombre: '2789+5G>A', value: '2789+5G>A' },
      { nombre: 'I507del', value: 'I507del' },
      { nombre: 'G85E', value: 'G85E' },
      { nombre: '1609delCA', value: '1609delCA' },
      { nombre: '2869insG', value: '2869insG' },
      { nombre: '712-1G>T', value: '712-1G>T' },
      { nombre: 'W1282X', value: 'W1282X' },
    ]

  }

  ngOnInit(): void {
    this.obtenerPaciente();
  }
  public addPaciente(){


    let paciente ={
      dni:this.paciente.dni,
      nombre:this.formPaciente.value.nombre,
      email:this.formPaciente.value.email,
      fechaNacimiento:this.formPaciente.value.fechaNacimiento,
      genero:this.formPaciente.value.genero,
      peso:this.formPaciente.value.peso,
      altura:this.formPaciente.value.altura,
      mutacion1:this.formPaciente.value.mutacion1.value,
      mutacion2:this.formPaciente.value.mutacion2.value,
      idUsuario:this.paciente.idUsuario
    }
    this._pacientesServices.modificarPaciente(paciente).subscribe({
      next: (data) => {

      }
    });
  }
  public cerrarDialogo(){
    this.mostrarFormulario=false;
  }
  public abrirDialogo(){
    this.mostrarFormulario=true;
  }
  public obtenerPaciente(){
    let usuario = localStorage.getItem('usuario');
    if(usuario){
       this._pacientesServices.getPacienteByUserName(usuario).subscribe({
        next: (data) => {
          this.paciente = data;
          this.formPaciente.setValue(this.paciente);
          this.obtenerMedico();

        },
        error: (err) => {
          console.log(err);
        }
    });


    }
  }
  confirmarEliminar() {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres dar de baja el usuario? Se borrarán todos los datos.',
      header: 'Dar de baja',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
        this.eliminarUsuario();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  public eliminarUsuario(){
    this._usuariosServices.deleteUsuario(this.paciente.idUsuario).subscribe({
      next: (data) => {
        this._authService.logOut();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  public obtenerMedico(){
  console.log("hola");

    this._equipoService.getEquipoByIdPaciente(this.paciente.dni).subscribe({
      next: (data) => {
        if(data){
          this._doctoresService.getDoctor(data.idMedico).subscribe({
            next: (data) => {
              this.doctor = data.nombre;
            },
            error: (err) => {
              console.log(err);
            }

          });
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

  }


}
