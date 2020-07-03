import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnRoutingModule } from './grn-routing.module';
import { GRNComponent } from './grn.component';
import { GoodExpectedComponent } from './good-expected/good-expected.component';
import { ReceiveProductComponent } from './receive-product/receive-product.component';
import { GrnListComponent } from './grn-list/grn-list.component';
import { GrnApproverComponent } from './grn-approver/grn-approver.component';
import { InventoryComponent } from './inventory/inventory.component';
import { GrnFreezedComponent } from './grn-freezed/grn-freezed.component';

//Prime Ng Service
import { DialogService } from 'primeng';
import { ConfirmationService } from 'primeng/api';
import { FormsModule} from '@angular/forms';

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




@NgModule({
  declarations: [GRNComponent, GoodExpectedComponent, ReceiveProductComponent, GrnListComponent, GrnApproverComponent, InventoryComponent, GrnFreezedComponent],
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
    CalendarModule
  ],
  providers: [DialogService, ConfirmationService],
  entryComponents: [GRNComponent,GoodExpectedComponent,ReceiveProductComponent, GrnListComponent, GrnApproverComponent,GrnFreezedComponent,InventoryComponent]
})
export class GrnModule { }
