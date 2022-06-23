import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Analitica } from 'src/app/shared/interfaces/analitica.interface';
import { AnaliticaService } from 'src/app/shared/services/analitica.service';

@Component({
  selector: 'app-analitica',
  templateUrl: './analitica.component.html',
  styleUrls: ['./analitica.component.css']
})
export class AnaliticaComponent implements OnInit {

  public listaAnaliticas? : Analitica[];
  public analitica? : Analitica;


  
  constructor(private _analiticaService: AnaliticaService) { }

  ngOnInit(): void {
    this.obtenerAnaliticas();
  }

  public obtenerAnaliticas(){
    this._analiticaService.getAll().subscribe({
      next: (resp) => {
        this.listaAnaliticas = resp;
        console.log("Analítica",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerAnaliticaById(id : number){
    this._analiticaService.getAnaliticaById(id).subscribe({
      next: (resp ) => {
        this.analitica = resp;
        console.log("Analítica Id",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerAnaliticaByDni(dni : string){
    this._analiticaService.getAnaliticaByDni(dni).subscribe({
      next: (resp ) => {
        this.analitica = resp;
        console.log("Analitica Dni",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerAnaliticaByDniFecha(dni : string, fecha : string){
    this._analiticaService.getAnaliticaByDniAndFecha(dni, fecha).subscribe({
      next: (resp ) => {
        this.listaAnaliticas = resp;
        console.log("Analítica Dni y Fecha",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        
      }
      
    });
  }
  public obtenerAnaliticaByFechas(fechaInicio : Date, fechaFin : Date){
    this._analiticaService.getAnaliticasByFecha(fechaInicio, fechaFin).subscribe({
      next: (resp ) => {
        this.listaAnaliticas = resp;
        console.log("Analítica Fecha",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        
      }
      
    });
  }
}

