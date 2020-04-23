import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProducerComponent } from './producer.component';

const routes: Routes = [ {
  path: "",
  component: ProducerComponent,
  data: {
    title: "Producer"
  }
},
{
  path: "/addproducer",
  component: ProducerComponent,
  data: {
    title: "Producer"
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducerRoutingModule { }
