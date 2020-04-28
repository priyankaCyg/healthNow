import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from '../interceptors/httpinterceptors';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { AddNewSupplierComponent } from './add-new-supplier/add-new-supplier.component';
import { AddressComponent } from './address/address.component';
import { ContactComponent } from './contact/contact.component';
import { BankComponent } from './bank/bank.component';
import { GstComponent } from './gst/gst.component';

//Prime Ng Service
import { DialogService } from 'primeng';
import {FormsModule} from '@angular/forms';

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
import { from } from 'rxjs';




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
    TreeTableModule
  ],
  providers:[httpInterceptorProviders,DialogService],
  entryComponents:[SupplierComponent, AddNewSupplierComponent, AddressComponent, ContactComponent, BankComponent, GstComponent]
})
export class SupplierModule { }
