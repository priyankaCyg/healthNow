import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerComponent } from './partner.component';
import { NewPartnerComponent } from './new-partner/new-partner.component';

const routes: Routes = [
  {
    path: "",
    component: PartnerComponent,
    data: {
      title: "Partner"}
  },
  {
    path:"new-partner",
    component: NewPartnerComponent,
    data: {
      title: "New Partner"}
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
