import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { PrimengModule } from '../primeng/primeng.module';
import { BrowserModule } from '@angular/platform-browser';

=======
import { MenuComponent } from './components/menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MegaMenu, MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
>>>>>>> e0a72135a2a14678f403d5f0764558bc1cbed4df



@NgModule({
  declarations: [
<<<<<<< HEAD
    
  ],
  imports: [
    CommonModule,
    PrimengModule,
    BrowserModule,

  ],
  exports: [

=======
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
>>>>>>> e0a72135a2a14678f403d5f0764558bc1cbed4df
  ]
})
export class SharedModule { }
