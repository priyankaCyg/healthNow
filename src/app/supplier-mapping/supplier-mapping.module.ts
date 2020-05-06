import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierMappingRoutingModule } from './supplier-mapping-routing.module';
import { SupplierMappingComponent } from './supplier-mapping.component';


import {FormsModule} from '@angular/forms';
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
import {CheckboxModule} from 'primeng/checkbox';
import {ToolbarModule} from 'primeng/toolbar';
//custom services
import {APIService} from '../services/apieservice'

@NgModule({
  declarations: [SupplierMappingComponent],
  imports: [
    CommonModule,
    SupplierMappingRoutingModule,
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
    ConfirmDialogModule,
    CheckboxModule,
    ToolbarModule
  ],
  providers:[DialogService,APIService,ConfirmationService],
  entryComponents:[SupplierMappingComponent]
})
export class SupplierMappingModule { }
