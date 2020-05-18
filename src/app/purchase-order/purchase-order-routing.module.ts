import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrderComponent } from './purchase-order.component';
import { NewPoComponent } from './new-po/new-po.component';
import { ProductRequisitionComponent } from './product-requisition/product-requisition.component';
import { ProductPurchasePriceComponent }from './product-purchase-price/product-purchase-price.component';
import { AddProductPurchasePriceComponent } from './add-product-purchase-price/add-product-purchase-price.component';
import { MapSupplierComponent } from './map-supplier/map-supplier.component';
import { PoListComponent } from './po-list/po-list.component';
import { CreatePoListComponent } from './create-po-list/create-po-list.component';
import { CreatePoDetailComponent } from './create-po-detail/create-po-detail.component';
import { MapSupplierMultiReqComponent } from './map-supplier-multi-req/map-supplier-multi-req.component';
import { PoGeneralDetailsComponent } from './po-general-details/po-general-details.component';

const routes: Routes = [
  {
    path: "",
    component: PurchaseOrderComponent,
    data: {
      title: "Purchase Order"}
  },
  {
    path:"new-po",
    component: NewPoComponent,
    data: {
      title: "New Purchase Order"}
  
  },
  {
    path:"product-purchase-price",
    component: ProductPurchasePriceComponent,
    data: {
      title: "Product Purchase Price"}
  
  },
 {
    path:"add-product-purchase-price",
    component: AddProductPurchasePriceComponent,
    data: {
      title: "Add Product Purchase Price"}
  
  },
  {
    path:"product-requisition",
    component: ProductRequisitionComponent,
    data: {
      title: "Product Requisition"}
  
  },
{
    path:"create-po-list",
    component: CreatePoListComponent,
    data: {
      title: "Supplier Requisition List"}
  
  },
  
   {
    path:"map-supplier",
    component: MapSupplierComponent,
    data: {
      title: "Map Supplier"}
  
  },
  {
      path:"map-supplier-multi-req",
      component: MapSupplierMultiReqComponent,
      data: {
        title: "Map Supplier"}
    
    },
  
  {
      path:"po-list",
      component: PoListComponent,
      data: {
        title: "Purchase Order"}
    
    },
    {
      path:"create-po-list",
      component: CreatePoListComponent,
      data: {
        title: "Create Purchase Order"}
    
    },
   {
      path:"create-po-detail",
      component:  CreatePoDetailComponent,
      data: {
        title: "Create PO"}
    
    },
    {
      path:"po-general-details",
      component:  PoGeneralDetailsComponent,
      data: {
        title: "Create PO"}
    
    } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }
