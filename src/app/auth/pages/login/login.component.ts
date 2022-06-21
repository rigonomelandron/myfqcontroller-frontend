import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario_username: string;
  public usuario_password: string;
  public logueo:boolean;
  public credenciales:boolean;
  public usuario?: Usuario;

  constructor(private _router: Router, private  _authService : AuthService) {

    this.logueo = false;
    this.credenciales = false;
    this.usuario_password = '';
    this.usuario_username = '';

  }

  ngOnInit(): void {
  }
  public logout(){
    this._authService.logOut();
   
  }

  public login() {
    this.logueo = true;
    this.credenciales = false;
    console.log("login");


    this._authService.autorizar(this.usuario_username, this.usuario_password).subscribe({

      next: (usuario) => {
        console.log("componentes", usuario);
        this.logueo = false;
        if (usuario) {
          this.usuario = usuario;
           this._router.navigate(['/contenido/calendario']);
        } else {
          this.credenciales = true;
          this._router.navigate(['/auth/login']);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }

    });

  }

}
