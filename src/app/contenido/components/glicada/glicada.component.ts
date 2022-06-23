import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Glicada } from 'src/app/shared/interfaces/glicada.interface';
import { GlicadaService } from 'src/app/shared/services/glicada.service';

@Component({
  selector: 'app-glicada',
  templateUrl: './glicada.component.html',
  styleUrls: ['./glicada.component.css']
})
export class GlicadaComponent implements OnInit {

  public listaGlicadas? : Glicada[];
  public glicada? : Glicada;


  
  constructor(private _glicadaService: GlicadaService) { }

  ngOnInit(): void {
    this.obtenerGlicadas();
  }

  public obtenerGlicadas(){
    this._glicadaService.getAll().subscribe({
      next: (resp) => {
        this.listaGlicadas = resp;
        console.log("Glicada",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        
      }
      
    });
  }

  public obtenerGlicadaById(id : number){
    this._glicadaService.getGlicadaById(id).subscribe({
      next: (resp ) => {
        this.glicada = resp;
        console.log("Glicada Id",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerGlicadaByDni(dni : string){
    this._glicadaService.getGlicadaByDni(dni).subscribe({
      next: (resp ) => {
        this.glicada = resp;
        console.log("Glicada Dni",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        
      }
      
    });
  }

  public obtenerGlicadaByDniFecha(dni : string, fecha : string){
    this._glicadaService.getGlicadaByDniAndFecha(dni, fecha).subscribe({
      next: (resp ) => {
        this.listaGlicadas= resp;
        console.log("Glicada, Dni y Fecha",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerGlicadaByFechas(fechaInicio : Date, fechaFin : Date){
    this._glicadaService.getGlicadaByFechas(fechaInicio, fechaFin).subscribe({
      next: (resp ) => {
        this.listaGlicadas= resp;
        console.log("Glicada Fechas",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }
}
