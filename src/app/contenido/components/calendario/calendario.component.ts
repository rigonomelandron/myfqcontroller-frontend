import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Antecedente } from 'src/app/shared/interfaces/antecedente.interface';
import { CicloAntibiotico } from 'src/app/shared/interfaces/cicloantibiotico.interface';
import { DatosRespiratorios } from 'src/app/shared/interfaces/datosrespiratorios.interface';
import { Deporte } from 'src/app/shared/interfaces/deporte.interface';
import { Glicada } from 'src/app/shared/interfaces/glicada.interface';
import { Tension } from 'src/app/shared/interfaces/tension.interface';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { V02Max } from 'src/app/shared/interfaces/v02max.interface';
import { AntecedentesService } from 'src/app/shared/services/antecedentes.service';
import { CiclosAntibioticosService } from 'src/app/shared/services/ciclos-antibioticos.service';
import { DatosrespiratoriosService } from 'src/app/shared/services/datosrespiratorios.service';
import { DeportesService } from 'src/app/shared/services/deportes.service';
import { GlicadasService } from 'src/app/shared/services/glicadas.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { TensionService } from 'src/app/shared/services/tension.service';
import { V02maxService } from 'src/app/shared/services/v02max.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent implements OnInit {
  week: string[];
  monthSelect?: any[];
  dateSelect?: any;
  dateValue: any;
  datosRespiratorios!: DatosRespiratorios[];
  glicadas!: Glicada[];
  tensiones!: Tension[];
  antecedentes!: Antecedente[];
  cicloAntibiotico!: CicloAntibiotico[];
  deportes!: Deporte[];
  v02max!: V02Max[];
  mostrarDatos:boolean;

  constructor(
    private _tensionServices: TensionService,
    private _glicadasService: GlicadasService,
    private _datosRespiratoriosService: DatosrespiratoriosService,
    private _ciclosAntibioticosService: CiclosAntibioticosService,
    private _deportesService: DeportesService,
    private _antecedentesService: AntecedentesService,
    private _v02maxService: V02maxService,
    private _pacientesService: PacientesService
  ) {
    this.week = [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
      'Domingo',
    ];
    this.mostrarDatos = false;
  }

  ngOnInit(): void {
    let fecha = new Date();
    let month = fecha.getMonth();
    let year = fecha.getFullYear();
    this.getDaysFromDate(month + 1, year);
  }

  public getDaysFromDate(month: any, year: any) {
    const startDate = moment.utc(`${year}/${month}/01`);
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format('dddd'),
        value: a,
        indexWeek: dayObject.isoWeekday(),
      };
    });

    this.monthSelect = arrayDays;
  }

  public changeMonth(flag: any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.format('MM'), prevDate.format('YYYY'));
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.format('MM'), nextDate.format('YYYY'));
    }
  }

  public clickDay(day: any) {
    console.log('day:', day);
    this.mostrarDatos = true;
    this.dateSelect = moment(
      `${this.dateSelect.format('YYYY')}-${this.dateSelect.format('MM')}-${
        day.value
      }`
    );

    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    const objectDate = moment(parse);
    this.dateValue = objectDate;
    console.log(this.dateValue);
    let datoUsuario = localStorage.getItem('usuario');

    if (datoUsuario) {
      this._pacientesService.getPacienteByUserName(datoUsuario).subscribe({
        next: (data: any) => {


          this.obtenerDatos( data.dni);
        },
        error: (error: HttpErrorResponse) => {},
      });
    }
  }

  public obtenerDatos(dni: string) {
    let datoUsuario = localStorage.getItem('usuario');
    if (datoUsuario) {
      //Datos respiratorios
      this._datosRespiratoriosService
        .getDatosRespiratoriosByIdUsuario(dni, this.dateValue._i)
        .subscribe({
          next: (data: DatosRespiratorios[]) => {
            console.log('Respiratorios', data);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
      //Datos Glicadas
      this._glicadasService
        .getGlicadasByIdUsuarioFecha(dni, this.dateValue._i)
        .subscribe({
          next: (data: Glicada[]) => {
            this.glicadas = data;
            console.log('Glicada', data);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
      //Datos Tensiones
      this._tensionServices
        .getTensionByIdUsuarioFecha(dni, this.dateValue._i)
        .subscribe({
          next: (data: Tension[]) => {
            console.log('Tension', data);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });

      //Ciclos Antibioticos
      this._ciclosAntibioticosService
        .getCicloAntibioticosByIdUsuarioFecha(dni, this.dateValue._i)
        .subscribe({
          next: (data: CicloAntibiotico[]) => {
            console.log('ciclo', data);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });

      //Deportes
      this._deportesService
        .getDeportesByIdUsuarioFecha(dni, this.dateValue._i)
        .subscribe({
          next: (data: Deporte[]) => {
            console.log('deportes:', data);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });

      //V02Max
      this._v02maxService
        .getV02MaxByIdUsuarioFecha(dni, this.dateValue._i)
        .subscribe({
          next: (data: V02Max[]) => {
            console.log('v02max:', data);
          },
          error: (err: HttpErrorResponse) => {},
        });
      //Antecedentes
      this._antecedentesService
        .getAntecedentesByIdUsuarioFecha(dni, this.dateValue._i)
        .subscribe({
          next: (data: Antecedente[]) => {
            console.log('antecedentes:', data);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
    }
  }
  public mostrarDialogo(){

  }
}
