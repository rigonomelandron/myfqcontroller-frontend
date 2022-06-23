import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RippleModule} from 'primeng/ripple';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {MegaMenuModule} from 'primeng/megamenu';
import {CardModule} from 'primeng/card';
import {ListboxModule} from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from "primeng/table";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from "primeng/toolbar";
import { InputTextModule } from "primeng/inputtext";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { DropdownModule } from "primeng/dropdown";
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { DockModule } from 'primeng/dock';
import { MenubarModule } from 'primeng/menubar';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';








@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
 
  exports: [
    MenuModule,
    MegaMenuModule,
    CardModule,
    ListboxModule,
    CardModule,
    ButtonModule,
    ToastModule,
    ProgressBarModule,
    TableModule,
    ConfirmPopupModule,
    RippleModule,
    DialogModule,
    ToolbarModule,
    InputTextModule,
    CascadeSelectModule,
    DropdownModule,
    PasswordModule,
    TooltipModule,
    PasswordModule,
    MessageModule,
    MessagesModule,
    DockModule,
    MenubarModule,
    ChartModule,
    CalendarModule,
    TabViewModule

  ]


})
export class PrimengModule { }
