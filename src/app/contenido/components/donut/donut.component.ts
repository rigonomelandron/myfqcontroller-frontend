import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DeportesService } from 'src/app/shared/services/deportes.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit {

  data: any;

  chartOptions: any;
  public deportes: string[];
  public datos: number[];
  public contadorCarrera: number;
  public contadorCiclismo: number;
  public contadorFuerza: number;
  public contadorCaminata: number;
  public contadorOtro: number;
  public contadorNatacion: number;



  constructor(private _deportesServices: DeportesService, private _pacientesServices: PacientesService) {

    this.deportes = [];
    this.datos = [];
    this.contadorCarrera = 0;
    this.contadorCiclismo = 0;
    this.contadorFuerza = 0;
    this.contadorCaminata = 0;
    this.contadorOtro = 0;
    this.contadorNatacion = 0;


  }

  ngOnInit() {
    this.getActividades();
    this.cargarGrafica();
  }
  public cargarGrafica() {
    this.data = {
      labels: ['Caminata', 'Carrera', 'Ciclismo', 'Fuerza', 'Natacion', 'Otro'],
      datasets: [
        {
          data: [this.contadorCaminata, this.contadorCarrera, this.contadorCiclismo, this.contadorFuerza, this.contadorNatacion, this.contadorOtro,],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#AB47BC",
            "#66BB6A",
            "#26A69A"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#AB47BC",
            "#66BB6A",
            "#26A69A"
          ]
        }
      ]
    };
  }
  getLightTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      }
    }
  }

  getDarkTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef'
          }
        }
      }
    }
  }

  public getActividades() {
    let usuario = localStorage.getItem('usuario');
    if (usuario) {
      this._pacientesServices.getPacienteByUserName(usuario).subscribe({
        next: (paciente) => {
          this._deportesServices.getDeportesByIdUsuario(paciente.dni).subscribe({
            next: (actividades) => {
            

              for (let actividad of actividades) {
                this.contadorDeportes(actividad.tipo);
                if (this.deportes.indexOf(actividad.tipo) == -1) {
                  this.deportes.push(actividad.tipo);

                }
              }
              this.ordenarArray();

            },
            error: (err: HttpErrorResponse) => {

            },
            complete: () => {
              this.cargarGrafica();
            }

          });
        }
      });
    }
  }
  public contadorDeportes(deporte: string) {
    if (deporte == "carrera") {
      this.contadorCarrera++;
    } else if (deporte == "Ciclismo") {
      this.contadorCiclismo++;
    } else if (deporte == "fuerza") {
      this.contadorFuerza++;
    } else if (deporte == "caminata" || deporte == "senderismo") {
      this.contadorCaminata++;
    } else if (deporte == "natacion") {
      this.contadorNatacion++;
    }
    else {
      this.contadorOtro++;
    }
  }
  public ordenarArray() {
    this.deportes.sort();

  }
}
