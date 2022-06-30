import { Component, OnInit } from '@angular/core';
import {MegaMenuItem,MenuItem} from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { Usuario } from '../../interfaces/usuario.interface';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public items: MegaMenuItem[] = [];
  public popItems: MenuItem[] = [];
  public usuario:any;
  public user!: Usuario;


  constructor(private _authService: AuthService, private _usuarioServices: UsuariosService) {

    this.usuario = '';


  }



  ngOnInit(): void {
    if(localStorage.getItem('usuario') != null){
       this.usuario= localStorage.getItem('usuario');
    }
    this.items = [

      {
        label: this.usuario,  routerLink: ['/home']
      },
      {
        label: 'Calendario', icon: 'pi pi-calendar', routerLink: ['/contenido/calendario']
      },
      {
        label: 'Datos Respiratorios', icon: 'pi pi-sliders-h', routerLink: ['/contenido/datos-respiratorios']
      },
      {
        label: 'Actividad', icon: 'pi pi-heart-fill',routerLink: ['/contenido/actividad']
      },
      {
        label: 'Resumen', icon: 'pi pi-book',routerLink: ['/contenido/resumen']
      },
      {
        label: 'Ajustes', icon: 'pi pi-cog', routerLink: ['/contenido/ajustes']
      },
      {
        label: 'Logout', icon: 'pi pi-sign-out', command: () => this._authService.logOut()
      },

    ];

    this.popItems = [
      {
        label: 'Nombre usuario', icon: 'pi pi-user'
      },
      {
        label: 'Calendario', icon: 'pi pi-calendar'
      },
      {
        label: 'Datos Respiratorios', icon: 'pi pi-sliders-h'
      },
      {
        label: 'Actividad', icon: 'pi pi-heart-fill'
      },
      {
        label: 'Resumen', icon: 'pi pi-book'
      },
      {
        label: 'Ajustes', icon: 'pi pi-cog'
      },
      {
        label: 'Logout', icon: 'pi pi-sign-out', command: () => this._authService.logOut()
      },
    ]
    this.obtenerUsuario();
  }

public obtenerUsuario(){
  this.usuario = localStorage.getItem('usuario');
  this._usuarioServices.getUsuarioById(this.usuario).subscribe({
    next: (data) => {
      console.log( 'usuario',data);
      this.user = data;
      console.log(this.user.foto);


    }

  });

}


}
