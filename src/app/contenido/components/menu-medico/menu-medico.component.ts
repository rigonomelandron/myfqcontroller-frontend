import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-menu-medico',
  templateUrl: './menu-medico.component.html',
  styleUrls: ['./menu-medico.component.css']
})
export class MenuMedicoComponent implements OnInit {
  public items: MegaMenuItem[] = [];
  public popItems: MenuItem[] = [];
  public usuario:any;

  


  constructor(private _authService: AuthService) {

    this.usuario = '';
  }



  ngOnInit(): void {
    if(localStorage.getItem('usuario') != null){
       this.usuario= localStorage.getItem('usuario');
    }
    this.items = [

      {
        label: this.usuario, icon: 'pi pi-user', routerLink: ['/home-medico']
      },
    ];

  }
}
