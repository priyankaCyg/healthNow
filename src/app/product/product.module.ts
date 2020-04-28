import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from '../interceptors/httpinterceptors';


import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductImageComponent } from './product-image/product-image.component';
import { ProductVariantComponent } from './product-variant/product-variant.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductQueriesComponent } from './product-queries/product-queries.component';
import { PrcategoriesComponent } from './prcategories/prcategories.component';

//Prime Ng Service
import { DialogService } from 'primeng';
import {FormsModule} from '@angular/forms';

//Prime Ng Module
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
 import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {TreeTableModule} from 'primeng/treetable';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FileUploadModule} from 'primeng/fileupload';
import {LightboxModule} from 'primeng/lightbox';
// import {AccordionModule} from 'primeng/accordion';
// import {PickListModule} from 'primeng/picklist';
import {CheckboxModule} from 'primeng/checkbox';


@NgModule({
  declarations: [ProductComponent, NewProductComponent, ProductImageComponent, ProductVariantComponent, ProductInfoComponent, ProductDescriptionComponent, ProductQueriesComponent, NewProductComponent, PrcategoriesComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ButtonModule,
    PanelModule,
    TabMenuModule,
    TableModule,
    TabViewModule,
    DynamicDialogModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    TreeTableModule,
    RadioButtonModule,
    FileUploadModule,
    LightboxModule,
    // AccordionModule,
    // PickListModule,
    CheckboxModule

  ],
  providers:[httpInterceptorProviders,DialogService],
  entryComponents:[ProductComponent, NewProductComponent, ProductImageComponent,  ProductVariantComponent, ProductInfoComponent, ProductDescriptionComponent, ProductQueriesComponent, PrcategoriesComponent]
})
export class ProductModule { }
