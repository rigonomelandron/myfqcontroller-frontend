import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../interfaces/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {

  constructor(private _http : HttpClient) { }

  public registroDoctores(doctor : Doctor):Observable<Doctor>{
      return this._http.post<Doctor>('api/v2/doctores', doctor);
  }
  public deleteDoctor(id : string):Observable<Doctor>{
      return this._http.delete<Doctor>('api/v2/doctores/'+id);
  }
  public getDoctores():Observable<Doctor[]>{
      return this._http.get<Doctor[]>('api/v2/doctores');
  }
  public modificarDoctor(doctor : Doctor):Observable<Doctor>{
      return this._http.patch<Doctor>('api/v2/doctores/'+doctor.numColegiado, doctor);
  }
  public getDoctor(id : string):Observable<Doctor>{
      return this._http.get<Doctor>('api/v2/doctores/'+id);
  }
  public getDoctorByIdUsuario(id : string):Observable<Doctor>{

      return this._http.get<Doctor>('api/v1/doctores/usuario/'+id);
  }
  public getDoctorByNumColegiado(id : string):Observable<Doctor>{
      return this._http.get<Doctor>('api/v1/doctores/colegiado/'+id);
  }
}
