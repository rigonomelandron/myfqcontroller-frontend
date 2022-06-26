import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosRespiratorios } from '../interfaces/datosrespiratorios.interface';

@Injectable({
  providedIn: 'root'
})
export class DatosrespiratoriosService {

  constructor(private _http : HttpClient) { }

  public getDatosRespiratorios():Observable<DatosRespiratorios[]>{
    return this._http.get<DatosRespiratorios[]>('api/v1/datos-respiratorios');
  }
  public getDatosRespiratoriosByFecha(idUsuario:string, fechaInicio:Date, fechaFin:Date):Observable<DatosRespiratorios[]>{
    console.log("usuario");

    return this._http.get<DatosRespiratorios[]>(`api/v1/datos-respiratorios/fechas/${idUsuario}/${fechaInicio}/${fechaFin}`);
  }
  public getDatosRespiratoriosByDate(fecha:Date):Observable<DatosRespiratorios[]>{
    return this._http.get<DatosRespiratorios[]>('api/v1/datos-respiratorios/fecha/'+fecha);
  }
  public getDatosRespiratoriosByPacienteAndFecha(idPaciente:number, fecha:Date):Observable<DatosRespiratorios[]>{

    return this._http.get<DatosRespiratorios[]>('api/v1/datos-respiratorios/userFecha/'+idPaciente+'/'+fecha);
  }

  public getDatosRespiratoriosByIdUsuario(idUsuario:string , fecha:string):Observable<DatosRespiratorios[]>{

    return this._http.get<DatosRespiratorios[]>(`api/v1/datos-respiratorios/dniFecha/${idUsuario}/${fecha}`);
  }

  public addDatosRespiratorios(datosRespiratorios:DatosRespiratorios):Observable<DatosRespiratorios>{
    return this._http.post<DatosRespiratorios>('api/v1/datos-respiratorios', datosRespiratorios);

  }
  public getDatosRespiratoriosIdUsuario(id:string):Observable<DatosRespiratorios[]>{
    return this._http.get<DatosRespiratorios[]>('api/v1/datos-respiratorios/usuarioId/'+id);
  }
}
