import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/auth/pages/login/login.component';
import { Glicada } from 'src/app/shared/interfaces/glicada.interface';
import { Tension } from 'src/app/shared/interfaces/tension.interface';
import { DatosrespiratoriosService } from 'src/app/shared/services/datosrespiratorios.service';
import { GlicadasService } from 'src/app/shared/services/glicadas.service';
import { TensionService } from 'src/app/shared/services/tension.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css'],
})
export class GraficoComponent implements OnInit {
  multiAxisData: any;
  basicOptions: any;
  public tensiones: number[];
  public glicadas: number[];
  public fvc: number[];
  public mes: string;
  public dia: number[];
  public rangeDates!: Date[];

  constructor(
    private _tensionServices: TensionService,
    private _glicadaServices: GlicadasService,
    private _datosRespiratoriosServices: DatosrespiratoriosService
  ) {
    this.tensiones = [];
    this.glicadas = [];
    this.fvc = [];

    this.mes = '';
    this.dia = [];
  }

  ngOnInit(): void {
    this.obtenerGrafica();
  }

  public obtenerGrafica() {
    console.log(this.dia);
    this.obtenerLabel();

    this.multiAxisData = {
      labels: this.dia,
      datasets: [
        {
          label: 'Tension',
          fill: false,
          borderColor: '#42A5F5',

          tension: 0.4,
          data: this.tensiones,

        },
        {
          label: 'Glicadas',
          fill: false,
          borderColor: '#00bb7e',

          tension: 0.4,
          data: this.glicadas,
        },
        {
          label: 'fvc',
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4,
          data: this.fvc,
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

    
    if (this.rangeDates && this.rangeDates[1] != null) {
      this._tensionServices
        .getTensionesByFecha(this.rangeDates[0], this.rangeDates[1])
        .subscribe({
          next: (data) => {
            for (let tension of data) {
              this.tensiones.push(tension.maxTension);
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.message);
          },
          complete: () => {
            this._glicadaServices
              .getGlicadaByFechas(this.rangeDates[0], this.rangeDates[1])
              .subscribe({
                next: (data) => {
                  for (let glicada of data) {
                    this.glicadas.push(glicada.glicada);
                  }
                },
                error: (err: HttpErrorResponse) => {
                  console.log(err.message);
                },
                complete: () => {
                  this._datosRespiratoriosServices
                    .getDatosRespiratoriosByFecha(
                      this.rangeDates[0],
                      this.rangeDates[1]
                    )
                    .subscribe({
                      next: (data) => {
                        for (let datosRespiratorios of data) {
                          this.fvc.push(datosRespiratorios.fvc);
                        }
                      },
                      error: (err: HttpErrorResponse) => {
                        console.log(err.message);
                      },
                      complete: () => {
                        this.obtenerLabel;
                        this.obtenerGrafica();
                      },
                    });
                },
              });
          },
        });
    }
  }
  public obtenerLabel() {
    let longitud = 0;
    if (
      this.tensiones.length > this.glicadas.length &&
      this.tensiones.length > this.fvc.length
    ) {
      longitud = this.tensiones.length;
    } else if (
      this.glicadas.length > this.tensiones.length &&
      this.glicadas.length > this.fvc.length
    ) {
      longitud = this.glicadas.length;
    } else {
      longitud = this.fvc.length;
    }
    for (let i = 0; i <= longitud; i++) {
      this.dia.push(i);
    }
  }
}
