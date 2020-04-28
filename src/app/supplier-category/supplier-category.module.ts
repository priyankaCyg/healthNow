import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierCategoryRoutingModule } from './supplier-category-routing.module';
import { SupplierCategoryComponent } from './supplier-category.component';
import { AddSupCategoryComponent } from './add-sup-category/add-sup-category.component';

import { httpInterceptorProviders } from '../interceptors/httpinterceptors';

import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';

//Prime Ng Service
import { DialogService } from 'primeng';
import {TreeTableModule} from 'primeng/treetable';
//Prime Ng Module
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
 import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';

import { from } from 'rxjs';


@NgModule({
  declarations: [SupplierCategoryComponent, AddSupCategoryComponent],
  imports: [
    CommonModule,
    SupplierCategoryRoutingModule,
    FormsModule,
    ButtonModule,
    PanelModule,
    DynamicDialogModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    TreeTableModule,
    TableModule
  ],
  providers:[httpInterceptorProviders,DialogService],
  entryComponents:[AddSupCategoryComponent]
})
export class SupplierCategoryModule { }
