import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private _http : HttpClient) { }

  public registroUsuarios(usuario : Usuario):Observable<Usuario>{
    console.log("registro usuario",usuario);

    return this._http.post<Usuario>('api/v1/usuario/crear', usuario);
  }
  public deleteUsuario(id : string):Observable<Usuario>{
    return this._http.delete<Usuario>('api/v2/usuarios/'+id);
  }
  public getUsuarios():Observable<Usuario[]>{
    return this._http.get<Usuario[]>('api/v2/usuarios');
  }
  public modificarUsuario(usuario : Usuario):Observable<Usuario>{
    return this._http.patch<Usuario>('api/v2/usuarios/'+usuario.usuario, usuario);
  }
  public getUsuarioById(id : string):Observable<Usuario>{

    return this._http.get<Usuario>('api/v1/usuarios/user/'+id);
  }
  public uploadFoto(archivo: File, id: string): Observable<HttpEvent<{}>>{

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    const req = new HttpRequest('POST', `api/v1/usuario/upload`, formData, {
      reportProgress: true
    });

    return this._http.request(req);


  }



}
