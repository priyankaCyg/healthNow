import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { PurchaseOrderComponent } from './purchase-order.component';
import { NewPoComponent } from './new-po/new-po.component';
import { ProductPurchasePriceComponent } from './product-purchase-price/product-purchase-price.component';
import { ProductRequisitionComponent } from './product-requisition/product-requisition.component';
import { AddProductPurchasePriceComponent } from './add-product-purchase-price/add-product-purchase-price.component';
import { MapSupplierComponent } from './map-supplier/map-supplier.component';
import { CreateRequisitionComponent } from './create-requisition/create-requisition.component';
import { CreatePoListComponent } from './create-po-list/create-po-list.component';
import { CreatePoDetailComponent } from './create-po-detail/create-po-detail.component';
import { MapSupplierMultiReqComponent } from './map-supplier-multi-req/map-supplier-multi-req.component';
import { PoGeneralDetailsComponent } from './po-general-details/po-general-details.component';
import { PoListComponent } from './po-list/po-list.component';

//Prime Ng Service
import { DialogService } from 'primeng';
import { ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { CreatePoDetailEditComponent } from './create-po-detail-edit/create-po-detail-edit.component';
import { PurchaseOrderApprovalComponent } from './purchase-order-approval/purchase-order-approval.component';
import { PurchaseOrderFreezedComponent } from './purchase-order-freezed/purchase-order-freezed.component';
import { PoRejectiomComponent } from './po-rejectiom/po-rejectiom.component';
import { CustomDatePipe } from '../services/custom.datePipe';

@NgModule({
  declarations: [PurchaseOrderComponent, NewPoComponent, ProductPurchasePriceComponent, ProductRequisitionComponent, AddProductPurchasePriceComponent, MapSupplierComponent, CreateRequisitionComponent, CreatePoListComponent, CreatePoDetailComponent, MapSupplierMultiReqComponent, PoGeneralDetailsComponent, PoListComponent, CreatePoDetailEditComponent, PurchaseOrderApprovalComponent, PurchaseOrderFreezedComponent, PoRejectiomComponent,CustomDatePipe],
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule,
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
    CheckboxModule,
    CalendarModule,
    FileUploadModule,
    ReactiveFormsModule
  ],
  providers: [DialogService, ConfirmationService],
  entryComponents: [PurchaseOrderComponent, NewPoComponent, ProductPurchasePriceComponent, ProductRequisitionComponent, AddProductPurchasePriceComponent, MapSupplierComponent, CreateRequisitionComponent, CreatePoListComponent, CreatePoDetailComponent, MapSupplierMultiReqComponent, PoGeneralDetailsComponent, PoListComponent, CreatePoDetailEditComponent, PurchaseOrderApprovalComponent, PurchaseOrderFreezedComponent,PoRejectiomComponent]
})
export class PurchaseOrderModule { }
