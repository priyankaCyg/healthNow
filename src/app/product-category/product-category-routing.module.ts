import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryComponent } from './product-category.component'


const routes: Routes = [ {
  path: "",
  component: ProductCategoryComponent,
  data: {
    title: "Product Category"
  }
},
{
  path: "/addproduct-category",
  component: ProductCategoryComponent,
  data: {
    title: "Product Category"
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryRoutingModule { }
