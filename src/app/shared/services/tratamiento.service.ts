import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tratamiento } from '../interfaces/tratamiento.interface';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  constructor(private _http: HttpClient) { }

  public getAll() : Observable<Tratamiento[]>{
    return this._http.get<Tratamiento[]>(`api/v1/tratamientos/listado`);
  }

  public getTratamientoById(id: number) : Observable<Tratamiento>{
    return this._http.get<Tratamiento>(`api/v1/tratamientos/id/${id}`);
  }

  public getTratamientoByDni(dni: string) : Observable<Tratamiento>{
    return this._http.get<Tratamiento>(`api/v1/tratamientos/dni/${dni}`);
  }

  public getTratamientoByDniAndFecha(dni: string, fecha: string) : Observable<Tratamiento[]>{
    return this._http.get<Tratamiento[]>(`api/v1/tratamientos/dniFecha/${dni}/${fecha}`);
  }

  public postTratamiento(tratamiento:Tratamiento):Observable<Tratamiento>{
    return this._http.post<Tratamiento>('/api/v1/tratamiento',tratamiento);
  }

  public modificarTratamiento(tratamiento:Tratamiento):Observable<Tratamiento>{
    return this._http.patch<Tratamiento>('/api/v1/tratamiento/'+tratamiento.id,tratamiento);
  }

  public deleteTratamiento(id:number):Observable<Tratamiento>{
    return this._http.delete<Tratamiento>('/api/v1/tratamiento/'+id);
  }
  
  public getTratamientoByFechas(fechaInicio:Date,fechaFin:Date):Observable<Tratamiento[]>{
     return this._http.get<Tratamiento[]>('/api/v1/tratamientos/fechas/'+fechaInicio+'/'+fechaFin);
  }
}

