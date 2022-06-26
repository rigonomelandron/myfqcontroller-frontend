import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { V02Max } from '../interfaces/v02max.interface';

@Injectable({
  providedIn: 'root'
})
export class V02maxService {

  constructor(private _http: HttpClient) { }

  public getV02MaxByIdUsuarioFecha(idUsuario: string, fecha: string): Observable<V02Max[]> {
    return this._http.get<V02Max[]>(`api/v1/v02max/dniFecha/${idUsuario}/${fecha}`);

  }
  public getV02MaxByDni(dni: string): Observable<V02Max[]> {
    return this._http.get<V02Max[]>(`api/v1/v02max/dni/${dni}`);

  }

}
