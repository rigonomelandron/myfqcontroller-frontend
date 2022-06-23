import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/shared/interfaces/evento.interface';
import { EventoService } from 'src/app/shared/services/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  public listaEventos? : Evento[];
  public evento? : Evento;


  
  constructor(private _eventoService: EventoService) { }

  ngOnInit(): void {
    this.obtenerEventos();
  }

  public obtenerEventos(){
    this._eventoService.getAll().subscribe({
      next: (resp) => {
        this.listaEventos = resp;
        console.log("Evento",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerEventoById(id : number){
    this._eventoService.getEventoById(id).subscribe({
      next: (resp ) => {
        this.evento = resp;
        console.log("Evento Id",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerEventoByDni(dni : string){
    this._eventoService.getEventoByDni(dni).subscribe({
      next: (resp ) => {
        this.evento = resp;
        console.log("Evento Dni",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }

  public obtenerEventoByDniFecha(dni : string, fecha : string){
    this._eventoService.getEventoByDniAndFecha(dni, fecha).subscribe({
      next: (resp ) => {
        this.listaEventos = resp;
        console.log("Evento Dni y Fecha",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        console.log( error);
        
      }
      
    });
  }
}



