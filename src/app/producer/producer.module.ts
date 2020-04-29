import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProducerRoutingModule } from './producer-routing.module';
import { ProducerComponent } from './producer.component';
import { AddProducerComponent } from './add-producer/add-producer.component';



import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//Prime Ng Service
import { DialogService } from 'primeng';
import {TreeTableModule} from 'primeng/treetable';
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
import { from } from 'rxjs';


import {APIService} from '../services/apieservice';

@NgModule({
  declarations: [ProducerComponent, AddProducerComponent],
  imports: [
    CommonModule,
    ProducerRoutingModule,
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
    MessagesModule,
    MessageModule,
  ],
  providers:[DialogService,APIService],
  entryComponents:[AddProducerComponent]
})
export class ProducerModule { }
