import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CicloAntibiotico } from '../interfaces/cicloantibiotico.interface';

@Injectable({
  providedIn: 'root'
})
export class CiclosAntibioticosService {

  constructor(private _http : HttpClient) { }

  public getCicloAntibioticosByIdUsuarioFecha(idUsuario : string, fecha: string):Observable<CicloAntibiotico[]>{
    return this._http.get<CicloAntibiotico[]>(`api/v1/ciclosAntibioticos/dniFecha/${idUsuario}/${fecha}`);

  }
}
