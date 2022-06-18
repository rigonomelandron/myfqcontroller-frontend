import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private _http : HttpClient) { }

  public registroUsuarios(usuario : Usuario):Observable<Usuario>{
    return this._http.post<Usuario>('api/v2/usuarios', usuario);
  }
  public deleteUsuario(id : number):Observable<Usuario>{
    return this._http.delete<Usuario>('api/v2/usuarios/'+id);
  }
  public getUsuarios():Observable<Usuario[]>{
    return this._http.get<Usuario[]>('api/v2/usuarios');
  }
  public modificarUsuario(usuario : Usuario):Observable<Usuario>{
    return this._http.patch<Usuario>('api/v2/usuarios/'+usuario.usuario, usuario);
  }


}
