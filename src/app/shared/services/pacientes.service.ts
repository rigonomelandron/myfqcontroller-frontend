import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private _http : HttpClient) { }



 public registroPacientes(paciente : Paciente):Observable<Paciente>{
    return this._http.post<Paciente>('api/v2/pacientes', paciente);
  }
  public deletePaciente(dni : string):Observable<Paciente>{
    return this._http.delete<Paciente>('api/v2/pacientes/'+dni);
  }
  public getPacientes():Observable<Paciente[]>{
    return this._http.get<Paciente[]>('api/v2/pacientes');
  }
  public modificarPaciente(paciente : Paciente):Observable<Paciente>{
    return this._http.patch<Paciente>('api/v2/pacientes/'+paciente.dni, paciente);
  }
  public getPaciente(dni : string):Observable<Paciente>{
    return this._http.get<Paciente>('api/v2/pacientes/'+dni);
  }
  public getPacienteByUserName(username : string):Observable<Paciente>{
    console.log("entre en el servicio");

    return this._http.get<Paciente>('api/v1/pacientes/userName/'+username);
  }
}
