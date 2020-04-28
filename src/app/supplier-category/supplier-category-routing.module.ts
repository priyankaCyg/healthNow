import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierCategoryComponent } from './supplier-category.component';

const routes: Routes = [ {
  path: "",
  component: SupplierCategoryComponent,
  data: {
    title: "Supplier Category"
  }
},
{
  path: "/addsupplier-category",
  component: SupplierCategoryComponent,
  data: {
    title: "Supplier Category"
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierCategoryRoutingModule { }
