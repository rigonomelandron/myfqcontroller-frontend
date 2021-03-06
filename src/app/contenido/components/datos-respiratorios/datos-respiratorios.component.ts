import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosrespiratoriosService } from 'src/app/shared/services/datosrespiratorios.service';
import { ConfirmationService, MessageService, PrimeIcons } from "primeng/api";
import { DatosRespiratorios} from 'src/app/shared/interfaces/datosrespiratorios.interface';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-respiratorios',
  templateUrl: './datos-respiratorios.component.html',
  styleUrls: ['./datos-respiratorios.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class DatosRespiratoriosComponent implements OnInit {

  public formRespiratorio: FormGroup;
  public registro!: DatosRespiratorios;
  public paciente?: Paciente;
  public mostrarFormulario: boolean;
  public datos: string[];
  public datoRespiratorio!: DatosRespiratorios;

  constructor(
    private _formBuilder: FormBuilder,
    private _datosRespiratoriosService: DatosrespiratoriosService,
    private _mensajeService: MessageService,
    private _confirmarService: ConfirmationService,
    private _usuarioService: UsuariosService,
    private _pacienteService: PacientesService,
    private _router: Router,
  ) {

    this.formRespiratorio = this._formBuilder.group({
      fecha: ['', [Validators.required, Validators.minLength(3)]],
      fvc: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[0-9].[0-9]*')]],
      fev1: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[0-9].[0-9]*')]],
      saturacion: ['', [Validators.required,Validators.minLength(2), Validators.pattern('[0-9]*')]],
      aerobica: ['', [Validators.required, Validators.minLength(1), Validators.pattern('[0-9]*')]],

    });
    this.mostrarFormulario = false;

    this.datos = []

  }

  ngOnInit(): void {
    this.obtenerDatosRespiratorios();
  }

  public addRegistro() {
    let usuario = localStorage.getItem('usuario');

    if (usuario && this.formRespiratorio.valid) {
      this._pacienteService.getPacienteByUserName(usuario).subscribe({
        next: (paciente) => {

          this.paciente = paciente;
          this.registro = {
            fecha: this.formRespiratorio.value.fecha,
            paciente: paciente,
            fvc: this.formRespiratorio.value.fvc,
            fev1: this.formRespiratorio.value.fev1,
            saturacionBasal: this.formRespiratorio.value.saturacion,
            capacidadAerobica: this.formRespiratorio.value.aerobica,
          }
        },
        error: (error: HttpErrorResponse) => {
          this._mensajeService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });

        },
        complete: () => {

          this._datosRespiratoriosService.addDatosRespiratorios(this.registro).subscribe({

            next: (response) => {
              this._mensajeService.add({severity: 'success',summary: 'A??adido',detail: `Registro A??adido correctamente `,life: 2000
              });
            this.cerrarDialogo();
            },
            error: (error: HttpErrorResponse) => {
              this._mensajeService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });

            },complete: () => {
              this._router.routeReuseStrategy.shouldReuseRoute = () => false;
              this._router.onSameUrlNavigation = 'reload';
              this._router.navigate(['/contenido/datos-respiratorios']);
            }
          });
        }
      });
    }

  }
 public mostrarDialogo() {
    this.formRespiratorio.reset();
    this.mostrarFormulario= true;
  }
  public cerrarDialogo(){
    this.mostrarFormulario= false;
  }

  public obtenerDatosRespiratorios(){
    this._datosRespiratoriosService.getDatosRespiratorios().subscribe({
  
      next: (datos: DatosRespiratorios[]) => {
        console.log(datos);
        this.datoRespiratorio = datos[datos.length - 1];
        this.datos=[
  
          'FVC: ' + this.datoRespiratorio.fvc +'L',
          'FEV1: ' + this.datoRespiratorio.fev1 + 'L',
          'Saturaci??n: ' + this.datoRespiratorio.saturacionBasal +'%',
          'Antibi??tico: 22-04-21 (Septrim)'
  
        ]
      },
      error: (err) => {
        console.log(err);
      }
    }
  
    )
  }

}
