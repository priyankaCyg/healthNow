import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GRNComponent } from './grn.component';
import {GoodExpectedComponent} from './good-expected/good-expected.component';
import {ReceiveProductComponent} from './receive-product/receive-product.component';
import {GrnListComponent} from './grn-list/grn-list.component';
import {GrnApproverComponent} from './grn-approver/grn-approver.component';
import { GrnFreezedComponent } from './grn-freezed/grn-freezed.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {
    path: "",
    component: GRNComponent,
    data: {
      title: "Good Expected"}
  },
  {
    path: "good-expected",
    component: GoodExpectedComponent,
    data: {
      title: "Good Expected"}
  },
  {
      path: "receive-product",
      component: ReceiveProductComponent,
      data: {
        title: "Receive Product"}
    },
    {
      path: "grn-list",
      component: GrnListComponent,
      data: {
        title: "GRN List"}
    },
    {
      path: "grn-approver",
      component: GrnApproverComponent,
      data: {
        title: "GRN Approver"}
    },
    {
      path: "grn-freezed",
      component: GrnFreezedComponent,
      data: {
        title: "GRN Freezed"}
    },
    {
      path: "inventory",
      component: InventoryComponent,
      data: {
        title: "Inventory"}
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrnRoutingModule { }
