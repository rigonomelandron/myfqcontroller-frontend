import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Glicada } from '../interfaces/glicada.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlicadaService {

  constructor(private _http: HttpClient) { }

  public getAll() : Observable<Glicada[]>{
    return this._http.get<Glicada[]>(`api/v1/glicadas/listado`);
  }

  public getGlicadaById(id: number) : Observable<Glicada>{
    return this._http.get<Glicada>(`api/v1/glicadas/id/${id}`);
  }

  public getGlicadaByDni(dni: string) : Observable<Glicada>{
    return this._http.get<Glicada>(`api/v1/glicadas/dni/${dni}`);
  }

  public getGlicadaByDniAndFecha(dni: string, fecha: string) : Observable<Glicada[]>{
    const url = `api/v1/glicadas/dniFecha/${dni}/${fecha}`;
    console.log("URL GLICADA",url);
    return this._http.get<Glicada[]>(`api/v1/glicadas/dniFecha/${dni}/${fecha}`);
    
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
