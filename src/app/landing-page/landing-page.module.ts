import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { httpInterceptorProviders } from '../interceptors/httpinterceptors';

import {FormsModule} from '@angular/forms';

//Prime Ng Module
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    FormsModule,
    ButtonModule,
  ],
  providers:[httpInterceptorProviders]
})
export class LandingPageModule { }
