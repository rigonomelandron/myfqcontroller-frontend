import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deporte } from '../interfaces/deporte.interface';

@Injectable({
  providedIn: 'root'
})
export class DeportesService {

  constructor(private _http: HttpClient) { }

  public getDeportesByIdUsuarioFecha(idUsuario: string, fecha: string): Observable<Deporte[]> {
    return this._http.get<Deporte[]>(`api/v1/deportes/dniFecha/${idUsuario}/${fecha}`);
  }
  public getDeportesByIdUsuario(idUsuario: string): Observable<Deporte[]> {
    return this._http.get<Deporte[]>(`api/v1/deportes/dni/${idUsuario}`);
  }
}
