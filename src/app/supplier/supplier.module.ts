import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { AddNewSupplierComponent } from './add-new-supplier/add-new-supplier.component';
import { AddressComponent } from './address/address.component';
import { ContactComponent } from './contact/contact.component';
import { BankComponent } from './bank/bank.component';
import { GstComponent } from './gst/gst.component';

//Prime Ng Service
import { DialogService, ConfirmationService } from 'primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//Prime Ng Module
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
 import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {TreeTableModule} from 'primeng/treetable';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';





@NgModule({
  declarations: [SupplierComponent, AddNewSupplierComponent, AddressComponent, ContactComponent, BankComponent, GstComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule,
    ButtonModule,
    PanelModule,
    TabMenuModule,
    TableModule,
    TabViewModule,
    DynamicDialogModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    TreeTableModule,
    ReactiveFormsModule,
    MessageModule,
    ConfirmDialogModule
  ],
  providers:[DialogService,ConfirmationService],
  entryComponents:[SupplierComponent, AddNewSupplierComponent, AddressComponent, ContactComponent, BankComponent, GstComponent]
})
export class SupplierModule { }
