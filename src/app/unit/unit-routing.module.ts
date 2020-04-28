import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitComponent } from './unit.component';

const routes: Routes = [ {
  path: "",
  component: UnitComponent,
  data: {
    title: "Unit"
  }
},
{
  path: "/addunit",
  component: UnitComponent,
  data: {
    title: "Unit"
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }
