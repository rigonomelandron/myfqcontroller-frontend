import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { DatosRespiratorios } from 'src/app/shared/interfaces/datosrespiratorios.interface';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { DatosrespiratoriosService } from 'src/app/shared/services/datosrespiratorios.service';
import { GlicadasService } from 'src/app/shared/services/glicadas.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { TensionService } from 'src/app/shared/services/tension.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  week: string[];
  monthSelect?:any[];
  dateSelect?:any;
  dateValue: any;


  constructor(
    private _tensionServices: TensionService,
    private _glicadasService: GlicadasService,
    private _datosRespiratoriosService: DatosrespiratoriosService,
    private _pacientesService: PacientesService
    ) {
    this.week = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
   }

  ngOnInit(): void {
    let fecha = new Date();
    let month = fecha.getMonth();
    let year = fecha.getFullYear();
    this.getDaysFromDate(month + 1, year)
  }

 public getDaysFromDate(month:any, year:any) {

    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }
  public changeMonth(flag:any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  public clickDay(day:any) {

   console.log("day:",day);

    this.dateSelect = moment(`${this.dateSelect.format("YYYY")}-${this.dateSelect.format("MM")}-${day.value}`);

    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;
    console.log(this.dateValue);

    let datoUsuario = localStorage.getItem('usuario');
    const date = new Date(this.dateSelect._i);
     console.log(date);

    if(datoUsuario){
      this._datosRespiratoriosService.getDatosRespiratoriosByIdUsuario(datoUsuario, date).subscribe({

        next: (data: DatosRespiratorios[]) => {
          console.log(data);

        },
        error: (err:HttpErrorResponse) => {}
      });
    }


  }


}
