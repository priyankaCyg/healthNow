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
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ProductMaster } from '../../model/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { ProductInfoData } from 'src/app/model/productInfo';
import { productQuerData } from 'src/app/model/productQueries';

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
  productQueries: productQuerData[];
  productInfoData: ProductInfoData[];
  isEdit: boolean = false
  public ProductForm: FormGroup;
  productData: ProductMaster;
  selectedproducer;
  selectedunit;
  selectedfoodculture;
  selectedStatus;
  producerData;
  unitData;
  foodcultureData;
  statusData;
  prdId;
  tabDisabled: boolean = true;

  constructor(private carService: CarService, private breadcrumbService: BreadcrumbService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private httpService: ApiService,
    private _formBuilder: FormBuilder,
    private toastService: ToastService, ) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Product', routerLink: ['/product'] }
    ]);
  }

  ngOnInit(): void {
    this.defaultDropDwnValue()
    this.productData = new ProductMaster();
    this.ProductForm = this.createControl(this.productData);
    this.prdId = +this.route.snapshot.params['iPrdID'];
    localStorage.setItem('iPrdID', this.prdId)

    //code for select product  by id
    if (!isNaN(this.prdId)) {
      this.isEdit = true
      this.tabDisabled = false
      var dataToSendEdit = {
        "iRequestID": 2255,
        "iPrdID": this.prdId
      }
      this.httpService.getDropDownData(dataToSendEdit).then(response => {
        this.productData = new ProductMaster(response[0]);
        this.ProductForm = this.createControl(this.productData);
        Promise.all([this.getProducerDrpDwn(), this.getUnitDrpDwn(), this.getFoodCultureDrpDwn(), this.getstatusDrpDwn()]).then(values => {
          this.setDropDownVal()
        });
      });
    }
    else {
      this.isEdit = false
      Promise.all([this.getProducerDrpDwn(), this.getUnitDrpDwn(), this.getFoodCultureDrpDwn(), this.getstatusDrpDwn()]).then(values => {
      });
    }
    this.images = [];
    this.images.push({
      source: 'assets/demo/images/sopranos/sopranos1.jpg',
      thumbnail: 'assets/demo/images/sopranos/sopranos1_small.jpg', title: 'Sopranos 1'
    });

    this.prImage = [
      { sequence: '1', imgName: 'Gluten Free Wheat' },
      { sequence: '2', imgName: 'Gluten Free Wheat' },
      { sequence: '3', imgName: 'Gluten Free Wheat' },
      { sequence: '4', imgName: 'Gluten Free Wheat' },
      { sequence: '5', imgName: 'Gluten Free Wheat' },
      { sequence: '6', imgName: 'Gluten Free Wheat' },
      { sequence: '7', imgName: 'Gluten Free Wheat' },
      { sequence: '8', imgName: 'Gluten Free Wheat' },
      { sequence: '9', imgName: 'Gluten Free Wheat' },
      { sequence: '10', imgName: 'Gluten Free Wheat' }
    ];

    this.productVariant = [
      { Unit: 'Gram', variant: '500' },
      { Unit: 'Kg', variant: '1' }
    ];

    this.getProductInfo();
    this.getProductQueries();
    this.productDesc = [
      { prDesc: 'Handpicked from india’s finest wheat fields, fortune chakki fresh atta is made with 100 percent atta and 0 percent maida which complements your ghar ka khana perfectly. You can differentiate these fibre-rich rotis with your 5 senses - their superior quality taste, soft touch, mesmerizing aroma and a fluffy look, so words of appreciation are bound to come your way. ' }
    ];
  }

  //code for product default dropdown data
  defaultDropDwnValue() {
    this.selectedproducer = { iProducerID: "", sProducerName: "Select Producer" }
    this.selectedunit = { iUnitID: "", sUnitName: "Select Unit" }
    this.selectedfoodculture = { iKVID: "", sKVValue: "Select Foodculture" }
    this.selectedStatus = { iStatusID: "", sStatusName: "Select Status" }
  }

  //code for product set dropdown data
  setDropDownVal() {

    // Producer Dropdown Select
    let selectedProducerObj = this.producerData.find(x => x.iProducerID == this.productData.iProducerID);
    if (selectedProducerObj !== undefined) {
      this.selectedproducer = selectedProducerObj;
    }

    // Unit Dropdown Select
    let selectedUnitObj = this.unitData.find(x => x.iUnitID == this.productData.iUnitID);
    if (selectedUnitObj !== undefined) {
      this.selectedunit = selectedUnitObj;
    }

    // Foodculture Dropdown Select
    let selectedFoodcultureObj = this.foodcultureData.find(x => x.iKVID == this.productData.iFoodCulture);
    if (selectedFoodcultureObj !== undefined) {
      this.selectedfoodculture = selectedFoodcultureObj;
    }

    // Select Dropdown Select
    let selectedStatusObj = this.statusData.find(x => x.iStatusID == this.productData.iStatusID);
    if (selectedStatusObj !== undefined) {
      this.selectedStatus = selectedStatusObj;
    }
  }

  //code for product form dropdown validity
  dropDownValidityCheck() {
    if (this.selectedproducer.iProducerID == '') {
      return true
    }
    else if (this.selectedunit.iUnitID == '') {
      return true
    }
    else if (this.selectedfoodculture.iKVID == '') {
      return true
    }
    else if (this.selectedStatus.iStatusID == '') {
      return true
    }
    else {
      return false
    }
  }

  //code for producer dropdown
  getProducerDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2126,
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.producerData = response
        this.producerData.splice(0, 0, { iProducerID: "", sProducerName: "Select Producer" })
        this.selectedproducer = { iProducerID: "", sProducerName: "Select Producer" }
        resolve(this.producerData)
      });
    })
  }

  //code for product unit dropdown
  getUnitDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2146,
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.unitData = response
        this.unitData.splice(0, 0, { iUnitID: "", sUnitName: "Select Unit" })
        this.selectedunit = { iUnitID: "", sUnitName: "Select Unit" }
        resolve(this.unitData)
      });
    })
  }

  //code for product foodculture dropdown
  getFoodCultureDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2071,
        "sKVName": "FoodType"
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.foodcultureData = response
        this.foodcultureData.splice(0, 0, { iKVID: "", sKVValue: "Select Foodculture" })
        this.selectedfoodculture = { iKVID: "", sKVValue: "Select Foodculture" }
        resolve(this.foodcultureData)
      });
    })
  }

  //code for product status dropdown
  getstatusDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2271,
        "sProcessName": "Product"
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.statusData = response
        this.statusData.splice(0, 0, { iStatusID: "", sStatusName: "Select Status" })
        this.selectedStatus = { iStatusID: "", sStatusName: "Select Status" }
        resolve(this.statusData)
      });
    })
  }

  //code for implement formBuilder and validation
  createControl(productData?: ProductMaster): FormGroup {
    this.ProductForm = this._formBuilder.group({
      iPrdID: [productData.iPrdID],
      iFoodCulture: [productData.iFoodCulture],
      sFoodCulture: [productData.sFoodCulture, [Validators.required]],
      iUnitID: [productData.iUnitID],
      sUnitName: [productData.sUnitName, [Validators.required]],
      sPrdName: [productData.sPrdName, [Validators.required]],
      iStatusID: [productData.iStatusID],
      iCreatedBy: [productData.iCreatedBy],
      sShortName: [productData.sShortName, [Validators.required]],
      iProducerID: [productData.iProducerID],
      sStatusName: [productData.sStatusName, [Validators.required]],
      sCreatedDate: [productData.sCreatedDate],
      sProducerName: [productData.sProducerName, [Validators.required]],
    });
    return this.ProductForm;
  }

  //code for add product data
  addProductForm() {
    var formData = this.ProductForm.getRawValue();
    const addProductData = {
      "iRequestID": 2251,
      "sPrdName": formData.sPrdName,
      "sShortName": formData.sShortName,
      "iUnitID": formData.sUnitName.iUnitID,
      "iFoodCulture": formData.sFoodCulture.iKVID,
      "iStatusID": formData.sStatusName.iStatusID,
      "iProducerID": formData.sProducerName.iProducerID
    }
    this.httpService.callPostApi(addProductData).subscribe(
      data => {
        this.prdId = data.body[0].iprdId;
        localStorage.setItem('iPrdID', this.prdId);
        this.tabDisabled = false
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
      },
      error => console.log(error)
    );
    this.ProductForm.reset();
  }

  //code for edit product data
  editProductForm() {
    var formData = this.ProductForm.getRawValue();
    const editProductData = {
      "iRequestID": 2252,
      "sPrdName": formData.sPrdName,
      "sShortName": formData.sShortName,
      "iUnitID": formData.sUnitName.iUnitID,
      "iFoodCulture": formData.sFoodCulture.iKVID,
      "iStatusID": formData.sStatusName.iStatusID,
      "iProducerID": formData.sProducerName.iProducerID,
      "iPrdID": this.prdId
    }
    this.httpService.callPostApi(editProductData).subscribe(
      data => {
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
      },
      error => console.log(error)
    );
  }

  openDialogForaddProductImage() {
    const ref = this.dialogService.open(ProductImageComponent, {
      data: {
      },
      header: 'Upload Product Image',
      width: '80%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) { }
    });
  }

  openDialogForProductVariant() {
    const ref = this.dialogService.open(ProductVariantComponent, {
      data: {
      },
      header: 'Add New Product Variant',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) { }
    });
  }

  openDialogForProductDesc() {
    const ref = this.dialogService.open(ProductDescriptionComponent, {
      data: {
      },
      header: 'Add Product Description',
      width: '28%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) { }
    });
  }

  //code for show all product Queries 
  getProductQueries() {
    const productQueAPI = {
      "iRequestID": 2164,
      "iProductID": this.prdId
    }
    this.httpService.callPostApi(productQueAPI).subscribe(
      data => {
        this.productQueries = data.body[0];
      },
      error => { console.log(error) }
    )
  }

  //code for open dialog product Queries add and edit 
  openDialogForPrQueries() {
    const ref = this.dialogService.open(ProductQueriesComponent, {
      data: {
      },
      header: 'Add Product Queries',
      width: '82%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getProductQueries();
      }
    });
  }

  getProductInfo() {

    const productInfoAPI = {
      "iRequestID": 2161,
      "iProductID": this.prdId
    }
    this.httpService.callPostApi(productInfoAPI).subscribe(
      data => {
        this.productInfoData = data.body[0];
      },
      error => { console.log(error) }
    )
  }
  openDialogForProductInfo() {
    const ref = this.dialogService.open(ProductInfoComponent, {
      data: {},
      header: 'Add Product Info',
      width: '40%'
    });
    ref.onClose.subscribe((success: any) => {
      if (success) {
        this.getProductInfo();
      }
    });
  }
}
