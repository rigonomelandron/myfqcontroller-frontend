import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Glicada } from '../interfaces/glicada.interface';

@Injectable({
  providedIn: 'root'
})
export class GlicadasService {

  constructor(private _http:HttpClient) { }

  public getGlicadas():Observable<Glicada[]>{
    return this._http.get<Glicada[]>('/api/v1/glicadas/listado');
  }
  public getGlicada(id:number):Observable<Glicada>{
    return this._http.get<Glicada>('/api/v1/glicada/'+id);
  }
  public postGlicada(glicada:Glicada):Observable<Glicada>{
    return this._http.post<Glicada>('/api/v1/glicada',glicada);
  }
  public modificarGlicada(glicada:Glicada):Observable<Glicada>{
    return this._http.patch<Glicada>('/api/v1/glicada/'+glicada.id,glicada);
  }
  public deleteGlicada(id:number):Observable<Glicada>{
    return this._http.delete<Glicada>('/api/v1/glicada/'+id);
  }
  public getGlicadaByFechas(fechaInicio:Date,fechaFin:Date):Observable<Glicada[]>{

    return this._http.get<Glicada[]>('/api/v1/glicadas/fechas/'+fechaInicio+'/'+fechaFin);
  }
}
