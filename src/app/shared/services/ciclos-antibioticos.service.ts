import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CicloAntibiotico } from '../interfaces/cicloantibiotico.interface';
import { Paciente } from '../interfaces/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class CiclosAntibioticosService {

  constructor(private _http : HttpClient) { }

  public getCicloAntibioticosByIdUsuarioFecha(idUsuario : string, fecha: string):Observable<CicloAntibiotico[]>{
    return this._http.get<CicloAntibiotico[]>(`api/v1/ciclosAntibioticos/dniFecha/${idUsuario}/${fecha}`);


  }
 public addCicloAntibioticos(cicloAntibiotico: CicloAntibiotico): Observable<CicloAntibiotico>{

  return this._http.post<CicloAntibiotico>('api/v1/ciclosAntibiotico', cicloAntibiotico);
 }
 public getCicloAntibioticosByDni(dni: string): Observable<CicloAntibiotico[]>{
  return this._http.get<CicloAntibiotico[]>(`api/v1/ciclos-antibiotico/dni/${dni}`);
 }

}
