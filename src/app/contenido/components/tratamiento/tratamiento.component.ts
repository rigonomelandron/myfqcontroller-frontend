import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tratamiento } from 'src/app/shared/interfaces/tratamiento.interface';
import { TratamientoService } from 'src/app/shared/services/tratamiento.service';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {

  public listaTratamientos? : Tratamiento[];
  public tratamiento? : Tratamiento;


  
  constructor(private _tratamientoService: TratamientoService) { }

  ngOnInit(): void {
    this.obtenerTratamientos();
  }

  public obtenerTratamientos(){
    this._tratamientoService.getAll().subscribe({
      next: (resp) => {
        this.listaTratamientos = resp;
        console.log("Tratamiento",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerTratamientoById(id : number){
    this._tratamientoService.getTratamientoById(id).subscribe({
      next: (resp ) => {
        this.tratamiento = resp;
        console.log("Tratamiento Id",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        
      }
      
    });
  }

  public obtenerTratamientoByDni(dni : string){
    this._tratamientoService.getTratamientoByDni(dni).subscribe({
      next: (resp ) => {
        this.tratamiento = resp;
        console.log("Tratamiento Dni",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerTratamientoByDniFecha(dni : string, fecha : string){
    this._tratamientoService.getTratamientoByDniAndFecha(dni, fecha).subscribe({
      next: (resp ) => {
        this.listaTratamientos = resp;
        console.log("Tratamiento Dni y Fecha",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerTratamientoByFechas(fechaInicio : Date, fechaFin : Date){
    this._tratamientoService.getTratamientoByFechas(fechaInicio, fechaFin).subscribe({
      next: (resp ) => {
        this.listaTratamientos = resp;
        console.log("Tratamiento Fechas",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }
}

