import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, pipe, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuarioActivo: Usuario | undefined;
  constructor(private _http: HttpClient, private _router: Router) { }

  public autorizar(usuario: string, password: string):Observable<Usuario> {
    let url =`/api/v1/usuarios/userPass/${usuario}/${password}`;

    return this._http.get<Usuario>(url)
      .pipe(
        tap((usuario) => {
          if (usuario) {
           

            this._usuarioActivo = usuario;

            localStorage.setItem("usuario", this._usuarioActivo.usuario);


          }
        })

      );
}
get usuarioActivo(){
  return this._usuarioActivo;
}
public logOut(){
  this._usuarioActivo = undefined;

  localStorage.clear();
  this._router.navigate(['/auth/login']);
}
public verificarToken():Observable<boolean>{

  if(!localStorage.getItem('usuario')){
    return of(false);
  }
  const idUsuarioActivo = localStorage.getItem('usuario');
  const url=`api/v1/usuarios/user/${idUsuarioActivo}`;
  return this._http.get<Usuario>(url)
  .pipe(
    map((usuario)=>{
      this._usuarioActivo = usuario;
      return true;
    })
  );
}
}




