import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tension } from 'src/app/shared/interfaces/tension.interface';
import { TensionService } from 'src/app/shared/services/tension.service';

@Component({
  selector: 'app-tension',
  templateUrl: './tension.component.html',
  styleUrls: ['./tension.component.css']
})
export class TensionComponent implements OnInit {

  public listaTension? : Tension[];
  public tension? : Tension;


  
  constructor(private _tensionService: TensionService) { }

  ngOnInit(): void {
    this.obtenerTensions();
  }

  public obtenerTensions(){
    this._tensionService.getAll().subscribe({
      next: (resp) => {
        this.listaTension = resp;
        console.log("Tension",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        
      }
      
    });
  }

  public obtenerTensionById(id : number){
    this._tensionService.getTensionById(id).subscribe({
      next: (resp ) => {
        this.tension = resp;
        console.log("Tension Id",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerTensionByDni(dni : string){
    this._tensionService.getTensionByDni(dni).subscribe({
      next: (resp ) => {
        this.tension = resp;
        console.log("Tension Dni",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerTensionByDniFecha(dni : string, fecha: string){
    this._tensionService.getTensionByDniFecha(dni,fecha).subscribe({
      next: (resp ) => {
        this.tension = resp;
        console.log("Tension Dni y Fecha",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerTensionByIdUsuarioFecha(idUsuario : string, fecha : string){
    this._tensionService.getTensionByIdUsuarioFecha(idUsuario, fecha).subscribe({
      next: (resp ) => {
        this.listaTension = resp;
        console.log("Tension IdUsuario y Fecha",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerTensionByFechas(fechaInicio : Date, fechaFin : Date){
    this._tensionService.getTensionesByFecha(fechaInicio, fechaFin).subscribe({
      next: (resp ) => {
        this.listaTension = resp;
        console.log("Tension Fechas",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }
}

