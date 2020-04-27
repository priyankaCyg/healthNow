import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
// import { httpInterceptorProviders } from '../interceptors/httpinterceptors';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GeneralEditComponent} from './general-edit/general-edit.component'
import { AddNewAddressComponent } from './add-new-address/add-new-address.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeComponent } from './employee/employee.component';
import { BankComponent } from './bank/bank.component';
import { GstComponent } from './gst/gst.component';

//Prime Ng Service
import { DialogService } from 'primeng';
import {TreeTableModule} from 'primeng/treetable';
import {ConfirmationService} from 'primeng/api';
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
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

//custom services
import {APIService} from '../services/apieservice'



@NgModule({
  declarations: [CompanyComponent,GeneralEditComponent, AddNewAddressComponent, DepartmentComponent, DesignationComponent, EmployeeComponent, BankComponent, GstComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
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
    MessagesModule,
    MessageModule,
    ConfirmDialogModule
  ],
  providers:[DialogService,APIService,ConfirmationService],
  entryComponents:[GeneralEditComponent,AddNewAddressComponent,DepartmentComponent,DesignationComponent,EmployeeComponent,BankComponent,GstComponent]
})
export class CompanyModule { }
