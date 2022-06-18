import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private _http : HttpClient) { }

  public registroEquipos(equipo : Equipo):Observable<Equipo>{
      return this._http.post<Equipo>('api/v2/equipos', equipo);
  }
  public deleteEquipo(id : number):Observable<Equipo>{
      return this._http.delete<Equipo>('api/v2/equipos/'+id);
  }
  public getEquipos():Observable<Equipo[]>{
      return this._http.get<Equipo[]>('api/v2/equipos');

  }
  public modificarEquipo(equipo : Equipo):Observable<Equipo>{
      return this._http.patch<Equipo>('api/v2/equipos/'+equipo.id, equipo);
  }
  public getEquipo(id : number):Observable<Equipo>{
      return this._http.get<Equipo>('api/v2/equipos/'+id);
  }
}
