import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ProductCategoryComponent } from './product-category.component';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';


import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//Prime Ng Service
import { DialogService } from 'primeng';
import {ConfirmationService} from 'primeng/api';

//Prime Ng Module
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
 import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { from } from 'rxjs';
import { ApiService } from '../services/api.service';

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
    TableModule,
    ReactiveFormsModule,
    MessageModule,
    ConfirmDialogModule
  ],
  providers:[DialogService,ApiService,ConfirmationService],
  entryComponents:[AddProductCategoryComponent]
})
export class ProductCategoryModule { }
