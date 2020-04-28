import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitRoutingModule } from './unit-routing.module';
import { UnitComponent } from './unit.component';
import { AddUnitComponent } from './add-unit/add-unit.component';

//Prime Ng Service
import { DialogService } from 'primeng';
import {FormsModule} from '@angular/forms';

//Prime Ng Module
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {TreeTableModule} from 'primeng/treetable';
import {TableModule} from 'primeng/table';
@NgModule({
  declarations: [UnitComponent,AddUnitComponent],
  imports: [
    CommonModule,
    UnitRoutingModule,
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
  providers:[DialogService],
  entryComponents:[UnitComponent,AddUnitComponent]
})
export class UnitModule { }
