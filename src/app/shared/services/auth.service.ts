import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuarioActivo: Usuario | undefined;
  constructor(private _http : HttpClient) { }

  public autorizar(usuario: string, password: string):Observable<Usuario[]> {
    let url =`api/v1/usuarios/userPass/${usuario}/${password}`;


    return this._http.get<Usuario[]>(url)
      .pipe(
        tap((usuarios) => {
          if (usuarios.length > 0) {
            this._usuarioActivo = usuarios[0];
            console.log(this._usuarioActivo);

          }
        })

      );




}
get usuarioActivo(){
  return this._usuarioActivo;
}
public logOut(){
  this._usuarioActivo = undefined;
}
}




