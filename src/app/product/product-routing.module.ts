import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { from } from 'rxjs';

const routes: Routes = [{
  path: "",
  component: ProductComponent,
  data: {
    title: "Product"
  }
},
{
  path: "new-product",
  component: NewProductComponent,
  data: {
    title: "New Product"
  }
},
{
  path: "edit-product/:iPrdID",
  component: NewProductComponent,
  data: {
    title: "Edit Product"
  }
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
