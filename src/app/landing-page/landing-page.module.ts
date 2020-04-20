import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { httpInterceptorProviders } from '../interceptors/httpinterceptors';

import {FormsModule} from '@angular/forms';
import {GenrelEditComponent} from './generalEdit/generalEdit.component'

//Prime Ng Service
import { DialogService } from 'primeng';
import { MessageService } from 'primeng/api';


//Prime Ng Module
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
// import {ToastModule} from 'primeng/toast';
// import {MessagesModule} from 'primeng/messages';
// import {MessageModule} from 'primeng/message';

// import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

@NgModule({
  declarations: [LandingPageComponent,GenrelEditComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    FormsModule,
    ButtonModule,
    PanelModule,
    TabMenuModule,
    TableModule,
    // ToastModule,
    // MessagesModule,
    // MessageModule,
    TabViewModule,
    DynamicDialogModule
  ],
  providers:[httpInterceptorProviders,DialogService,MessageService],
  entryComponents:[GenrelEditComponent]
})
export class LandingPageModule { }
