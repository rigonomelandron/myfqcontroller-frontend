import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tension } from '../interfaces/tension.interface';

@Injectable({
  providedIn: 'root'
})
export class TensionService {

  constructor(private _http: HttpClient) { }

  public getAll(): Observable<Tension[]> {
    return this._http.get<Tension[]>('/api/v1/tension/listado');
  }
  public getTensionById(id: number): Observable<Tension> {
    return this._http.get<Tension>('/api/v1/tensiones/' + id);
  }
  public getTensionByDni(dni: string): Observable<Tension> {
    return this._http.get<Tension>('/api/v1/tensiones/' + dni);
  }
  public getTensionByDniFecha(dni: string, fecha:string): Observable<Tension> {
    return this._http.get<Tension>(`api/v1/tension/dniFecha/${dni}/${fecha}`);
  }
  public postTension(tension: Tension): Observable<Tension> {
    return this._http.post<Tension>('/api/v1/tensiones', tension);
  }
  public modificarTension(tension: Tension): Observable<Tension> {
    return this._http.patch<Tension>('/api/v1/tensiones/' + tension.id, tension);
  }
  public deleteTension(id: number): Observable<Tension> {
    return this._http.delete<Tension>('/api/v1/tensiones/' + id);
  }
  public getTensionesByFecha(fechaInicio: Date, fechaFin: Date): Observable<Tension[]> {
    return this._http.get<Tension[]>('/api/v1/tension/fechas/' + fechaInicio +"/"+fechaFin);
  }
  public getTensionByIdUsuarioFecha(idUsuario: string, fecha: string): Observable<Tension[]> {
    return this._http.get<Tension[]>(`api/v1/tension/dniFecha/${idUsuario}/${fecha}`);
  }

}
