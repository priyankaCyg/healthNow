import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnRoutingModule } from './grn-routing.module';
import { GRNComponent } from './grn.component';
import { GoodExpectedComponent } from './good-expected/good-expected.component';
import { ReceiveProductComponent } from './receive-product/receive-product.component';
import { GrnListComponent } from './grn-list/grn-list.component';
import { GrnApproverComponent } from './grn-approver/grn-approver.component';

//Prime Ng Service
import { DialogService } from 'primeng';
import { ConfirmationService } from 'primeng/api';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

//Prime Ng Module
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [GRNComponent, GoodExpectedComponent, ReceiveProductComponent, GrnListComponent, GrnApproverComponent],
  imports: [
    CommonModule,
    GrnRoutingModule,
    FormsModule,
    ButtonModule,
    PanelModule,
    TabMenuModule,
    TableModule,
    DynamicDialogModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    ReactiveFormsModule,
    CalendarModule,
    MessageModule,
    ConfirmDialogModule
  ],
  providers: [DialogService, ConfirmationService],
  entryComponents: [GRNComponent,GoodExpectedComponent,ReceiveProductComponent, GrnListComponent, GrnApproverComponent]
})
export class GrnModule { }
