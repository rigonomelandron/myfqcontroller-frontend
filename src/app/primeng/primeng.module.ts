import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {MegaMenuModule} from 'primeng/megamenu';
import {CardModule} from 'primeng/card';
import {ListboxModule} from 'primeng/listbox';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    MegaMenuModule,
    CardModule,
    ListboxModule
  ]
})
export class PrimengModule { }
