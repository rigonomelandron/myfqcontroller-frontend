import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Analitica } from '../interfaces/analitica.interface';

@Injectable({
  providedIn: 'root'
})
export class AnaliticaService {
  constructor(private _http: HttpClient) { }

  public getAll() : Observable<Analitica[]>{
    return this._http.get<Analitica[]>(`api/v1/analiticas/listado`);
  }

  public getAnaliticaById(id: number) : Observable<Analitica>{
    return this._http.get<Analitica>(`api/v1/analiticas/id/${id}`);
  }

  public getAnaliticaByDni(dni: string) : Observable<Analitica>{
    return this._http.get<Analitica>(`api/v1/analiticas/dni/${dni}`);
  }

  public getAnaliticaByDniAndFecha(dni: string, fecha: string) : Observable<Analitica[]>{
    const url = `api/v1/analiticas/dniFecha/${dni}/${fecha}`;
    return this._http.get<Analitica[]>(url);
  }

  public postAnalitica(analitica: Analitica): Observable<Analitica> {
    return this._http.post<Analitica>('/api/v1/analiticas', analitica);
  }

  public modificarAnalitica(analitica: Analitica): Observable<Analitica> {
    return this._http.patch<Analitica>('/api/v1/analiticas/' + analitica.id, analitica);
  }

  public deleteAnalitica(id: number): Observable<Analitica> {
    return this._http.delete<Analitica>('/api/v1/analiticas/' + id);
  }

  public getAnaliticasByFecha(fechaInicio: Date, fechaFin: Date): Observable<Analitica[]> {
    return this._http.get<Analitica[]>('/api/v1/analitica/fechas/' + fechaInicio +"/"+fechaFin);
  }
}

