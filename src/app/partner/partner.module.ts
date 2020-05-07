import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerComponent } from './partner.component';

import { NewPartnerComponent } from './new-partner/new-partner.component';
import { AddressComponent } from './address/address.component';
import { ContactComponent } from './contact/contact.component';
import { BankComponent } from './bank/bank.component';
import { GstComponent } from './gst/gst.component';
import { AreaMappingComponent } from './area-mapping/area-mapping.component';

//Prime Ng Service
import { DialogService } from 'primeng';
import { ConfirmationService } from 'primeng/api';
import { FormsModule} from '@angular/forms';

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
import { TreeTableModule } from 'primeng/treetable';
import { CheckboxModule } from 'primeng/checkbox';
import { from } from 'rxjs';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [PartnerComponent,NewPartnerComponent, AddressComponent, ContactComponent, BankComponent, GstComponent, AreaMappingComponent],
  imports: [
    CommonModule,
    PartnerRoutingModule,
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
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    CheckboxModule
  ],
  providers: [DialogService, ConfirmationService],
  entryComponents: [PartnerComponent,NewPartnerComponent, AddressComponent, ContactComponent, BankComponent, GstComponent, AreaMappingComponent]
})
export class PartnerModule { }
