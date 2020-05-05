import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { NewBrandComponent } from './new-brand/new-brand.component';




import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


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
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { from } from 'rxjs';


import {APIService} from '../services/apieservice';

@NgModule({
  declarations: [BrandComponent, NewBrandComponent],
  imports: [
    CommonModule,
    BrandRoutingModule,
    CommonModule,
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
    TreeTableModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule
  ],
  providers:[DialogService,APIService,ConfirmationService],
  entryComponents:[BrandComponent, NewBrandComponent]
})
export class BrandModule { }
