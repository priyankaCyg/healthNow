import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesOrderRoutingModule } from './sales-order-routing.module';
import { SalesOrderComponent } from './sales-order.component';
import { AddressComponent } from './address/address.component';
import { AvailableQtyComponent } from './available-qty/available-qty.component';
import { OrderAllocationComponent } from './order-allocation/order-allocation.component';
import { AllocateComponent } from './allocate/allocate.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { UpdatePodComponent } from './update-pod/update-pod.component';
import { DeliveredComponent } from './delivered/delivered.component';
import { CustomerOrderAllocationComponent } from './customer-order-allocation/customer-order-allocation.component';
import { AllocateProductComponent } from './allocate-product/allocate-product.component';

//Prime Ng Service
import { DialogService, ConfirmDialogModule } from 'primeng';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

//Prime Ng Module
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { ProductOrderAllocationComponent } from './product-order-allocation/product-order-allocation.component';
import { InvoiceCreationComponent } from './invoice-creation/invoice-creation.component';
import { CustomerInvoiceCreationComponent } from './customer-invoice-creation/customer-invoice-creation.component';
import { ProductInvoiceCreationComponent } from './product-invoice-creation/product-invoice-creation.component';


@NgModule({
  declarations: [SalesOrderComponent, AddressComponent, AvailableQtyComponent, OrderAllocationComponent, AllocateComponent, DeliveryListComponent, UpdatePodComponent, DeliveredComponent, CustomerOrderAllocationComponent, AllocateProductComponent, ProductOrderAllocationComponent, InvoiceCreationComponent, CustomerInvoiceCreationComponent, ProductInvoiceCreationComponent],
  imports: [
    CommonModule,
    SalesOrderRoutingModule,
    FormsModule,
    ButtonModule,
    PanelModule,
    TabMenuModule,
    TableModule,
    DynamicDialogModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    CalendarModule,
    TabViewModule,
    ConfirmDialogModule
  ],
  providers: [DialogService, ConfirmationService],
  entryComponents: [SalesOrderComponent, AddressComponent, AvailableQtyComponent, OrderAllocationComponent, AllocateComponent, DeliveryListComponent, UpdatePodComponent, DeliveredComponent, CustomerOrderAllocationComponent, AllocateProductComponent, ProductOrderAllocationComponent]
})
export class SalesOrderModule { }
