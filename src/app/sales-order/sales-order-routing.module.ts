import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesOrderComponent } from './sales-order.component';
import { OrderAllocationComponent } from './order-allocation/order-allocation.component';
import { CustomerOrderAllocationComponent } from './customer-order-allocation/customer-order-allocation.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveredComponent } from './delivered/delivered.component';
import { ProductOrderAllocationComponent } from './product-order-allocation/product-order-allocation.component';
import { InvoiceCreationComponent } from './invoice-creation/invoice-creation.component';
import { CustomerInvoiceCreationComponent } from './customer-invoice-creation/customer-invoice-creation.component';
import { ProductInvoiceCreationComponent } from './product-invoice-creation/product-invoice-creation.component';

const routes: Routes = [
  {
    path: "",
    component: SalesOrderComponent,
    data: {
      title: "Order Allocation"
    }
  },
  {
    path: "order-allocation",
    component: OrderAllocationComponent,
    data: {
      title: "Order Allocation"
    }
  },
  {
    path: "customer-order-allocation",
    component: CustomerOrderAllocationComponent,
    data: {
      title: "Customer Order Allocation"
    }
  },
  {
    path: "delivery-list",
    component: DeliveryListComponent,
    data: {
      title: "Delivery List"
    }
  },
  {
    path: "delivered",
    component: DeliveredComponent,
    data: {
      title: "Delivered"
    }
  },
  {
    path: "product-order-allocation",
    component: ProductOrderAllocationComponent,
    data: { title: "Product Order Allocation" }
  },
  {
    path: "invoice-creation",
    component: InvoiceCreationComponent,
    data: { title: "invoice creation" }
  },
  {
    path: "customer-invoice-creation",
    component: CustomerInvoiceCreationComponent,
    data: { title: "customer invoice creation" }
  },
  {
    path: "product-invoice-creation",
    component: ProductInvoiceCreationComponent,
    data: { title: "product invoice creation" }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrderRoutingModule { }
