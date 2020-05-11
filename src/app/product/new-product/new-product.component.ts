import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { Message } from 'primeng/api';
import { Car } from '../../demo/domain/car';
import { CarService } from '../../demo/service/carservice';
import { ProductRoutingModule } from '../product-routing.module';
import { ProductImageComponent } from '../product-image/product-image.component';
import { ProductVariantComponent } from '../product-variant/product-variant.component';
import { ProductInfoComponent } from '../product-info/product-info.component';
import { ProductDescriptionComponent } from '../product-description/product-description.component';
import { ProductQueriesComponent } from '../product-queries/product-queries.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ProductInfoData } from 'src/app/model/productInfo';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  items: MenuItem[];

  product: any[];

  images: any[];

  display: boolean;

prImage: any[];

  productVariant: any[];

 

  productDesc: any[];

  productQueries: any[];

  // multiCategory: any[];


    cars2: Car[];

    selectedCar: Car;

    selectedCar2: Car;

    sourceCars: Car[];

    targetCars: Car[];

    brands: SelectItem[];

    productInfoData: ProductInfoData[];
    city;
    selectedproducer;
    unit;
    selectedunit;
    foodCulture;
    selectedfoodCulture;
    
  constructor(private carService: CarService,private breadcrumbService: BreadcrumbService, private dialogService:DialogService,  private route: ActivatedRoute, private apiService: ApiService,
    private toastService: ToastService,
   private fb: FormBuilder) {
  
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Product', routerLink: ['/app/product'] }
    ]);
}

  ngOnInit(): void {
    
    this.carService.getCarsMedium().then(cars => this.cars2 = cars);
    this.carService.getCarsMedium().then(cars => this.sourceCars = cars);
    this.targetCars = [];
    this.brands = [
        { label: 'Food -	Vitamin', value: 'Food -	Vitamin' },
        { label: 'Food -	Supplements	', value: 'Food -	Supplements	' },
        { label: 'Food -	Dairy', value: 'Food -	Dairy' },
        { label: 'Food -	Cookinig Oil', value: 'Food -	Cookinig Oil	' },
        { label: 'Health Concern - Diabetes	', value: 'Health Concern - Diabetes	' },
        { label: 'Health Concern - Weight Loss', value: 'Health Concern - Weight Loss' }
    ];


    
    this.images = [];
    this.images.push({
        source: 'assets/demo/images/sopranos/sopranos1.jpg',
        thumbnail: 'assets/demo/images/sopranos/sopranos1_small.jpg', title: 'Sopranos 1'
    });
   
    this.prImage =[
      {sequence: '1', imgName: 'Gluten Free Wheat'},
      {sequence: '2', imgName: 'Gluten Free Wheat'},
      {sequence: '3', imgName: 'Gluten Free Wheat'},
      {sequence: '4', imgName: 'Gluten Free Wheat'},
      {sequence: '5', imgName: 'Gluten Free Wheat'},
      {sequence: '6', imgName: 'Gluten Free Wheat'},
      {sequence: '7', imgName: 'Gluten Free Wheat'},
      {sequence: '8', imgName: 'Gluten Free Wheat'},
      {sequence: '9', imgName: 'Gluten Free Wheat'},
      {sequence: '10', imgName: 'Gluten Free Wheat'}
    ];

    this.productVariant = [
      {Unit: 'Gram',  variant: '500'},
      {Unit: 'Kg',  variant: '1'}
    ];

    this.getProductInfo();
      

    this.productDesc = [
      {prDesc: 'Handpicked from india’s finest wheat fields, fortune chakki fresh atta is made with 100 percent atta and 0 percent maida which complements your ghar ka khana perfectly. You can differentiate these fibre-rich rotis with your 5 senses - their superior quality taste, soft touch, mesmerizing aroma and a fluffy look, so words of appreciation are bound to come your way. '}
    ];


}

openDialogForaddProductImage() {
  const ref = this.dialogService.open( ProductImageComponent , {
    data: {
    },
    header: 'Upload Product Image',
    width: '80%'
  });

  ref.onClose.subscribe((success: boolean) => {
    if (success) {
      // this.toastService.addSingle("success", "Mail send successfully", "");
    }
  });
}


openDialogForProductVariant() {
  const ref = this.dialogService.open( ProductVariantComponent , {
    data: {
    },
    header: 'Add New Product Variant',
    width: '28%'
  });

  ref.onClose.subscribe((success: boolean) => {
    if (success) {
      // this.toastService.addSingle("success", "Mail send successfully", "");
    }
  });
}


getProductInfo(){
  let prd_by_id = +this.route.snapshot.params['iProductID'];
  const productInfoAPI = {
    "iRequestID": 2161,
    // "iProductID":prd_by_id
    "iProductID":1
  }
  this.apiService.callPostApi(productInfoAPI).subscribe(
    data => { console.log(data);

      this.productInfoData = data[0];
      console.log(this.productInfoData)
    },
    error => {console.log(error)}
  )
  
}
openDialogForProductInfo() {
  const ref = this.dialogService.open( ProductInfoComponent , {
    data: {
    },
    header: 'Add Product Info',
    width: '40%'
  });
  localStorage.setItem('iProductID', this.route.snapshot.params['iProductID']);
  ref.onClose.subscribe((success: any) => {
    if (success) {
      this.getProductInfo();
      this.toastService.addSingle("success", "Record Added Successfully", "");
    }
    
  });
}
openDialogForProductDesc() {
  const ref = this.dialogService.open( ProductDescriptionComponent , {
    data: {
    },
    header: 'Add Product Description',
    width: '28%'
  });
  ref.onClose.subscribe((success: boolean) => {
    if (success) {
      // this.toastService.addSingle("success", "Mail send successfully", "");
    }
  });
}
openDialogForPrQueries() {
  const ref = this.dialogService.open( ProductQueriesComponent , {
    data: {
    },
    header: 'Add Product Queries',
    width: '82%'
  });
  ref.onClose.subscribe((success: boolean) => {
    if (success) {
      // this.toastService.addSingle("success", "Mail send successfully", "");
    }
  });
}


}
