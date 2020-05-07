import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierCategoryRoutingModule } from './supplier-category-routing.module';
import { SupplierCategoryComponent } from './supplier-category.component';
import { AddSupCategoryComponent } from './add-sup-category/add-sup-category.component';


import {InputTextModule} from 'primeng/inputtext';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

//Prime Ng Service
import { DialogService } from 'primeng';
import {TreeTableModule} from 'primeng/treetable';
import {ConfirmationService} from 'primeng/api';

//Prime Ng Module
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
 import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { from } from 'rxjs';


import {APIService} from '../services/apieservice';


@NgModule({
  declarations: [SupplierCategoryComponent, AddSupCategoryComponent],
  imports: [
    CommonModule,
    SupplierCategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    PanelModule,
    DynamicDialogModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    TreeTableModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule
  ],
  providers:[DialogService,APIService,ConfirmationService],
  entryComponents:[AddSupCategoryComponent]
})
export class SupplierCategoryModule { }
