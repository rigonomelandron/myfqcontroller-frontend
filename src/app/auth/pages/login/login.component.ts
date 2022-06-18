import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private _router: Router, private  _authService : AuthService) {

    this.logueo = false;
    this.credenciales = false;
    this.usuario_password = '';
    this.usuario_username = '';

  }

  ngOnInit(): void {
  }

  public login() {
    this.logueo = true;
    this.credenciales = false;
    console.log();

    this._authService.autorizar(this.usuario_username, this.usuario_password).subscribe({

      next: (usuarios) => {
        console.log(usuarios);
        this.logueo = false;
        if (usuarios.length > 0) {
          this._router.navigate(['/usuarios']);
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
