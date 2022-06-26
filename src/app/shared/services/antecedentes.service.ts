import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Antecedente } from '../interfaces/antecedente.interface';

@Injectable({
  providedIn: 'root'
})
export class AntecedentesService {

  constructor(private _http : HttpClient) { }

  public getAntecedentesByIdUsuarioFecha(idUsuario : string, fecha: string):Observable<Antecedente[]>{
    return this._http.get<Antecedente[]>(`api/v1/antecedentes/dniFecha/${idUsuario}/${fecha}`);

  }
  public addAntecedente(antecedente: Antecedente): Observable<Antecedente> {
    return this._http.post<Antecedente>('/api/v1/antecedente', antecedente);
  }

}
