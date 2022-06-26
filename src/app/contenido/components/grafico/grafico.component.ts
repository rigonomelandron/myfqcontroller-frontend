import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatosrespiratoriosService } from 'src/app/shared/services/datosrespiratorios.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css'],
})
export class GraficoComponent implements OnInit {
  multiAxisData: any;
  basicOptions: any;

  public fvc: number[];
  public fev1: number[];
  public mes: string;
  public dia: number[];
  public rangeDates!: Date[];
  public meses?: Date[];
  public dates: string[];

  constructor(

    private _datosRespiratoriosServices: DatosrespiratoriosService
  ) {

    this.fvc = [];
    this.fev1 = [];
    this.dates = [];
    this.mes = '';
    this.dia = [];
  }

  ngOnInit(): void {
    this.obtenerGrafica();
    this.obtenerHistorico();
  }

  public obtenerGrafica() {
    console.log(this.dia);


    this.multiAxisData = {
      labels: this.dates,
      datasets: [
        {
          label: 'Fvc',
          fill: false,
          borderColor: '#42A5F5',

          tension: 0.4,
          data: this.fvc,

        },
        {
          label: 'Fev1',
          fill: false,
          borderColor: '#00bb7e',

          tension: 0.4,
          data: this.fev1,
        },

      ],

    };
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#9A86A4',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#9A86A4',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }
  public obtenerFechas() {
    this.fvc = [];
    this.fev1 = [];
    this.dates = [];
    this.mes = '';
    this.dia = [];

    let usuario = localStorage.getItem('usuario');
    if (this.rangeDates && this.rangeDates[1] != null && usuario) {

      this._datosRespiratoriosServices
        .getDatosRespiratoriosByFecha(
          usuario,
          this.rangeDates[0],
          this.rangeDates[1]
        )
        .subscribe({
          next: (data) => {

            data.sort((d1, d2) => new Date(d1.fecha).getTime() - new Date(d2.fecha).getTime());
            this.meses = data.map((data: { fecha: Date; }) => data.fecha);
            this.fvc = data.map((data: { fvc: number; }) => data.fvc);
            this.fev1 = data.map((data: { fev1: number; }) => data.fev1);
            this.meses.forEach((res) => {
              let jsdate = new Date(res);
              this.dates.push(jsdate.toLocaleTimeString('es', { year: 'numeric', month: 'short', day: 'numeric' }).substring(0, 11));

            })
          },

          error: (err: HttpErrorResponse) => {
            console.log(err.message);
          },
          complete: () => {

            this.obtenerGrafica();
          },
        });

    }
  }
  public obtenerHistorico(){
    this.fvc = [];
    this.fev1 = [];
    this.dates = [];
    this.mes = '';
    this.dia = [];

    let usuario = localStorage.getItem('usuario');
    if (usuario) {

      this._datosRespiratoriosServices
        .getDatosRespiratoriosIdUsuario(usuario)
        .subscribe({
          next: (data) => {

            data.sort((d1, d2) => new Date(d1.fecha).getTime() - new Date(d2.fecha).getTime());
            this.meses = data.map((data: { fecha: Date; }) => data.fecha);
            this.fvc = data.map((data: { fvc: number; }) => data.fvc);
            this.fev1 = data.map((data: { fev1: number; }) => data.fev1);
            this.meses.forEach((res) => {
              let jsdate = new Date(res);
              this.dates.push(jsdate.toLocaleTimeString('es', { year: 'numeric', month: 'short', day: 'numeric' }).substring(0, 11));

            })
          },

          error: (err: HttpErrorResponse) => {
            console.log(err.message);
          },
          complete: () => {

            this.obtenerGrafica();
          }
        });

    }
  }


}
