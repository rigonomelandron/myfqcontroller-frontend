import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from "primeng/table";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { RippleModule } from "primeng/ripple";
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




=======
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {MegaMenuModule} from 'primeng/megamenu';
>>>>>>> e0a72135a2a14678f403d5f0764558bc1cbed4df




@NgModule({
  declarations: [],
<<<<<<< HEAD

  exports: [
    MenuModule,
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
    CalendarModule







=======
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    MegaMenuModule
>>>>>>> e0a72135a2a14678f403d5f0764558bc1cbed4df
  ]
})
export class PrimengModule { }
