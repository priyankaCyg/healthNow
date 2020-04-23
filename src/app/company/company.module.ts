import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CompanyRoutingModule } from "./company-routing.module";
import { CompanyComponent } from "./company.component";
import { httpInterceptorProviders } from "../interceptors/httpinterceptors";

<<<<<<< HEAD
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { GeneralEditComponent } from "./general-edit/general-edit.component";
import { AddNewAddressComponent } from "./add-new-address/add-new-address.component";
import { DepartmentComponent } from "./department/department.component";
import { DesignationComponent } from "./designation/designation.component";
import { EmployeeComponent } from "./employee/employee.component";
import { BankComponent } from "./bank/bank.component";
import { GstComponent } from "./gst/gst.component";

//Prime Ng Service
import { DialogService } from "primeng";
import { TreeTableModule } from "primeng/treetable";
//Prime Ng Module
import { ButtonModule } from "primeng/button";
import { PanelModule } from "primeng/panel";
import { TabMenuModule } from "primeng/tabmenu";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { DialogModule } from "primeng/dialog";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { DropdownModule } from "primeng/dropdown";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";

@NgModule({
  declarations: [
    CompanyComponent,
    GeneralEditComponent,
    AddNewAddressComponent,
    DepartmentComponent,
    DesignationComponent,
    EmployeeComponent,
    BankComponent,
    GstComponent,
  ],
=======
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralEditComponent } from './general-edit/general-edit.component'
import { AddNewAddressComponent } from './add-new-address/add-new-address.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeComponent } from './employee/employee.component';
import { BankComponent } from './bank/bank.component';
import { GstComponent } from './gst/gst.component';

//Prime Ng Service
import { DialogService } from 'primeng';
import { TreeTableModule } from 'primeng/treetable';
//Prime Ng Module
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [CompanyComponent, GeneralEditComponent, AddNewAddressComponent, DepartmentComponent, DesignationComponent, EmployeeComponent, BankComponent, GstComponent],
>>>>>>> ec8b3c5fb239f8b777644b09c56411c8c50b9a88
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
  ],
  providers: [httpInterceptorProviders, DialogService],
  entryComponents: [
    GeneralEditComponent,
    AddNewAddressComponent,
    DepartmentComponent,
    DesignationComponent,
    EmployeeComponent,
    BankComponent,
    GstComponent,
  ],
<<<<<<< HEAD
=======
  providers: [httpInterceptorProviders, DialogService],
  entryComponents: [GeneralEditComponent, AddNewAddressComponent, DepartmentComponent, DesignationComponent, EmployeeComponent, BankComponent, GstComponent]
>>>>>>> ec8b3c5fb239f8b777644b09c56411c8c50b9a88
})
export class CompanyModule {}
