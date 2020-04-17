import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { httpInterceptorProviders } from '../interceptors/httpinterceptors';

import {FormsModule} from '@angular/forms';
import {GeneralEditComponent} from './general-edit/general-edit.component'
import { AddNewAddressComponent } from './add-new-address/add-new-address.component';

//Prime Ng Service
import { DialogService } from 'primeng';

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


@NgModule({
  declarations: [CompanyComponent,GeneralEditComponent, AddNewAddressComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
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
    InputTextareaModule
  ],
  providers:[httpInterceptorProviders,DialogService],
  entryComponents:[GeneralEditComponent,AddNewAddressComponent]
})
export class CompanyModule { }
