import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierComponent } from './supplier.component';
import { AddNewSupplierComponent } from './add-new-supplier/add-new-supplier.component';
import { from } from 'rxjs';

const routes: Routes = [ {
  path: "",
  component: SupplierComponent,
  data: {
    title: "Supplier"
  }
},
{
  path: "add-new-supplier",
  component: AddNewSupplierComponent,
  data: {
    title: "New Supplier"
  }
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
