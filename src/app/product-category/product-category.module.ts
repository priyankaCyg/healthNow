import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ProductCategoryComponent } from './product-category.component';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';

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
  declarations: [ProductCategoryComponent, AddProductCategoryComponent],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
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
  entryComponents:[AddProductCategoryComponent]
})
export class ProductCategoryModule { }
