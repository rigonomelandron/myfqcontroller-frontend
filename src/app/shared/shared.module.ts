import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MegaMenu, MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    BrowserModule,
    BrowserAnimationsModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule
  ],
  exports: [
    MenuComponent
  ]
})
export class SharedModule { }
