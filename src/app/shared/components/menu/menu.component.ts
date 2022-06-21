import { Component, OnInit } from '@angular/core';
import {MegaMenuItem,MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public items: MegaMenuItem[] = [];
  public popItems: MenuItem[] = [];


  constructor() {
   }

  ngOnInit(): void {
    this.items = [
      
      {
        label: 'Nombre Usuario', icon: 'pi pi-user'
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
        label: 'Logout', icon: 'pi pi-sign-out'
      },
    ]
  }


}
