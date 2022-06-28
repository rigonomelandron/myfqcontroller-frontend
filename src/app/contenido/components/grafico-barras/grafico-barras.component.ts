import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DeportesService } from 'src/app/shared/services/deportes.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent implements OnInit {

  multiAxisData: any;

  public chartOptions: any;

  public multiAxisOptions: any;

  public stackedData: any;

  public stackedOptions: any;

  horizontalOptions: any;
  public deportes: string[];
  public datos: number[];
  public meses: Date[];
  public chart?: Chart[];
  public dates: string[];
  public calorias?: number[];
  public ppmMedia?: number[];



  constructor(private _deportesServices: DeportesService, private _pacientesServices: PacientesService) {
    this.deportes = [];
    this.datos = [];
    this.meses = [];
    this.dates = [];



  }

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario) {
      this._pacientesServices.getPacienteByUserName(usuario).subscribe({
        next: (paciente) => {
          this._deportesServices.getDeportesByIdUsuario(paciente.dni).subscribe({
            next: (actividades) => {
              actividades.sort((d1, d2) => new Date(d1.fecha).getTime() - new Date(d2.fecha).getTime());
              this.meses = actividades.map((actividades: { fecha: Date; }) => actividades.fecha);
              this.calorias = actividades.map((actividades: { calorias: number; }) => actividades.calorias);
              this.ppmMedia = actividades.map((actividades: { ppmMedia: number; }) => actividades.ppmMedia);

              this.meses.forEach((res) => {
                let jsdate = new Date(res);
                this.dates.push(jsdate.toLocaleTimeString('es', { year: 'numeric', month: 'short', day:'numeric' }).substring(0, 11));

              })
            },
            error: (err: HttpErrorResponse) => {

              console.log(err);

            },
            complete: () => {
                this.cargarGrafica();
            }

          });
        }

      });
   }
  }

  public cargarGrafica() {
    this.multiAxisData = {

      labels: this.dates,
      datasets: [{
        label: 'PPM Media',
        backgroundColor: [
          '#EC407A',

        ],
        yAxisID: 'y',

        data: this.ppmMedia
      },

       {
          label: 'Calorias',
          backgroundColor: '#78909C',
          yAxisID: 'y1',
          data: this.calorias
        }
      ]
    };

    this.multiAxisOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        },
        tooltips: {
          mode: 'index',
          intersect: true
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',

          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            min: 0,
            max: 100,
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y1: {
          type: 'linear',
          display:true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
            color: '#ebedef'
          },
          ticks: {
            min: 0,
            max: 100,
            color: '#495057'
          }
        }
      }
    };

  }



}
