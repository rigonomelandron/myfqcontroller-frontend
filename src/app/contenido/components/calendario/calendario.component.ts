import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Antecedente } from 'src/app/shared/interfaces/antecedente.interface';
import { CicloAntibiotico } from 'src/app/shared/interfaces/cicloantibiotico.interface';
import { DatosRespiratorios } from 'src/app/shared/interfaces/datosrespiratorios.interface';
import { Deporte } from 'src/app/shared/interfaces/deporte.interface';
import { Evento } from 'src/app/shared/interfaces/evento.interface';
import { Glicada } from 'src/app/shared/interfaces/glicada.interface';
import { Tension } from 'src/app/shared/interfaces/tension.interface';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { V02Max } from 'src/app/shared/interfaces/v02max.interface';
import { AntecedentesService } from 'src/app/shared/services/antecedentes.service';
import { CiclosAntibioticosService } from 'src/app/shared/services/ciclos-antibioticos.service';
import { DatosrespiratoriosService } from 'src/app/shared/services/datosrespiratorios.service';
import { DeportesService } from 'src/app/shared/services/deportes.service';
import { EventoService } from 'src/app/shared/services/evento.service';
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
  datos: any[];
  mostrarDatos: boolean;
  public dias: any[];
  public meses: Date[];
  public contador: number;

  constructor(
    private _tensionServices: TensionService,
    private _glicadasService: GlicadasService,
    private _datosRespiratoriosService: DatosrespiratoriosService,
    private _ciclosAntibioticosService: CiclosAntibioticosService,
    private _deportesService: DeportesService,
    private _antecedentesService: AntecedentesService,
    private _v02maxService: V02maxService,
    private _pacientesService: PacientesService,
    private _eventosService: EventoService
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
    this.datos = [];
    this.dias = [];
    this.meses = [];
    this.contador = 0;
  }

  ngOnInit(): void {
    let fecha = new Date();
    let month = fecha.getMonth();
    let year = fecha.getFullYear();
    this.getDaysFromDate(month + 1, year);

    let datoUsuario = localStorage.getItem('usuario');
    if (datoUsuario) {
      this._pacientesService.getPacienteByUserName(datoUsuario).subscribe({
        next: (data: any) => {
          this.marcarFechas(data.dni);
        },
        error: (error: HttpErrorResponse) => { },
      });
    }
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
    this.mostrarDatos = true;
    this.datos = [];
    this.dateSelect = moment(
      `${this.dateSelect.format('YYYY')}-${this.dateSelect.format('MM')}-${day.value
      }`
    );

    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    const objectDate = moment(parse);
    this.dateValue = objectDate;
    let datoUsuario = localStorage.getItem('usuario');
    if (datoUsuario) {
      this._pacientesService.getPacienteByUserName(datoUsuario).subscribe({
        next: (data: any) => {
          this.obtenerDatos(data.dni);
        },
        error: (error: HttpErrorResponse) => { },
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
            this.datosRespiratorios = data;
            for (let dato of data) {
              this.datos.push(dato);
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
          complete: () => {
            this._glicadasService
              .getGlicadasByIdUsuarioFecha(dni, this.dateValue._i)
              .subscribe({
                next: (data: Glicada[]) => {
                  if(data.length > 0){
                  for (let dato of data) {
                    this.datos.push(dato);
                  }
                }
                },
                error: (err: HttpErrorResponse) => {
                  console.log(err);
                },
                complete: () => {
                  this._tensionServices
                    .getTensionByIdUsuarioFecha(dni, this.dateValue._i)
                    .subscribe({
                      next: (data: Tension[]) => {
                        if (data.length > 0) {
                        for (let dato of data) {
                          this.datos.push(dato);
                        }
                      }
                      },
                      error: (err: HttpErrorResponse) => {
                        console.log(err);
                      },
                      complete: () => {
                        this._ciclosAntibioticosService
                          .getCicloAntibioticosByIdUsuarioFecha(
                            dni,
                            this.dateValue._i
                          )
                          .subscribe({
                            next: (data: CicloAntibiotico[]) => {
                              console.log("ciclos", data);

                              if (data.length > 0) {
                              for (let dato of data) {
                                this.datos.push(dato);
                              }
                            }
                            },
                            error: (err: HttpErrorResponse) => {
                              console.log(err);
                            },
                            complete: () => {
                              this._deportesService
                                .getDeportesByIdUsuarioFecha(
                                  dni,
                                  this.dateValue._i
                                )
                                .subscribe({
                                  next: (data: Deporte[]) => {
                                    if (data.length > 0) {
                                    for (let dato of data) {
                                      this.datos.push(dato);
                                    }
                                  }
                                  },
                                  error: (err: HttpErrorResponse) => {
                                    console.log(err);
                                  },
                                  complete: () => {
                                    this._v02maxService
                                      .getV02MaxByIdUsuarioFecha(
                                        dni,
                                        this.dateValue._i
                                      )
                                      .subscribe({
                                        next: (data: V02Max[]) => {
                                          this.v02max = data;
                                          for (let dato of data) {
                                            this.datos.push(dato);
                                          }
                                        },
                                        error: (err: HttpErrorResponse) => { },
                                        complete: () => {
                                          this._antecedentesService
                                            .getAntecedentesByIdUsuarioFecha(
                                              dni,
                                              this.dateValue._i
                                            )
                                            .subscribe({
                                              next: (data: Antecedente[]) => {
                                                if (data.length > 0) {
                                                for (let dato of data) {
                                                  this.datos.push(dato);
                                                }
                                              }
                                              },
                                              error: (
                                                err: HttpErrorResponse
                                              ) => {
                                                console.log(err);
                                              },
                                            });
                                        },
                                      });
                                  },
                                });
                            },
                          });
                      },
                    });
                },
              });
          },
        });
    }
  }
  public mostrarDialogo() {


  }

  public marcarFechas(dni:string) {

    let usuario = localStorage.getItem('usuario');
    if (usuario) {
      //Obtener fechas respiratorios
      this._datosRespiratoriosService.getDatosRespiratoriosIdUsuario(usuario).subscribe({
        next: (data: DatosRespiratorios[]) => {
         this.ObtenerFechas(data);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
      //obtener fechas deportes
      this._deportesService.getDeportesByIdUsuario(dni).subscribe({
        next: (data: Deporte[]) => {
          this.ObtenerFechas(data);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
      //obtener fechas glicadas
      this._glicadasService.getGlicadasByDni(dni).subscribe({
        next: (data: Glicada[]) => {
          this.ObtenerFechas(data);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }

      });
      //obtener fechas tensiones
      this._tensionServices.getTensionesByDni(dni).subscribe({
        next: (data: Tension[]) => {
          this.ObtenerFechas(data);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
      //obtener fechas eventos
      this._eventosService.getEventoByDni(dni).subscribe({
        next: (data: Evento[]) => {
          this.ObtenerFechas(data);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }


      });
       //obtener fechas v02max
        this._v02maxService.getV02MaxByDni(dni).subscribe({
          next: (data: V02Max[]) => {
            this.ObtenerFechas(data);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        });
    }
    //Obtener Ciclos Antibioticos
    this._ciclosAntibioticosService.getCicloAntibioticosByDni(dni).subscribe({
      next: (data: CicloAntibiotico[]) => {
        console.log("ciclos", data);
        this.ObtenerFechas(data);

      }
    });
  }

  //Meter fechas en el Array
  public ObtenerFechas(data:any) {
    for (let dato of data) {
      let fecha= '';
      if(dato.fecha){
         fecha = dato.fecha.substring(0, 10);
      }else{
         fecha = dato.fechaInicio.substring(0, 10);
      }

      let jsdate = new Date(fecha);
      this.convertirFechas(jsdate.getFullYear(), jsdate.getMonth() + 1, jsdate.getDate());
    }

  }
  //Convertir fechas a formato indexado
  public convertirFechas(year: any, month: any, a: any) {
    const dayObject = moment(`${year}-${month}-${a}`);
    this.dias.push(dayObject);

    return {
      name: dayObject.format('dddd'),
      value: a,
      indexWeek: dayObject.isoWeekday(),
    };
  }

}
