import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierMappingComponent } from './supplier-mapping.component';

const routes: Routes = [ {
  path: "",
  component: SupplierMappingComponent,
  data: {
    title: "Supplier Mapping"
  }
},
{
  path: "/addsupplier-mapping",
  component: SupplierMappingComponent,
  data: {
    title: "Supplier Mapping"
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierMappingRoutingModule { }
