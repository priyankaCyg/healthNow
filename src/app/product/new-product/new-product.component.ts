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
import { ApiService } from 'src/app/services/api.service';
import { ProductMaster } from '../../model/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';


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

  productInfo: any[];

  productDesc: any[];

  productQueries: any[];

  // multiCategory: any[];
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
  constructor(private carService: CarService, private breadcrumbService: BreadcrumbService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private _formBuilder: FormBuilder,
    private toastService: ToastService,

  ) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Product', routerLink: ['/app/product'] }
    ]);
  }

  ngOnInit(): void {
    this.defaultDropDwnValue()
    this.productData = new ProductMaster();
    this.ProductForm = this.createControl(this.productData);
    this.prdId = this.route.snapshot.params['iPrdID'];
    if (this.prdId != null) {
      this.isEdit = true
      let prd_by_id = +this.route.snapshot.params['iPrdID'];

      var dataToSendEdit = {
        "iRequestID": 2255,
        "iPrdID": prd_by_id
      }

      this.apiService.getDropDownData(dataToSendEdit).then(response => {
        this.productData = new ProductMaster(response[0]);
        this.ProductForm = this.createControl(this.productData);

        Promise.all([this.getProducerDrpDwn(), this.getUnitDrpDwn(), this.getFoodCultureDrpDwn(), this.getstatusDrpDwn()]).then(values => {
          console.log(values);
          this.setDropDownVal()
        });

      });

    }
    else {
      this.isEdit = false

      Promise.all([this.getProducerDrpDwn(), this.getUnitDrpDwn(), this.getFoodCultureDrpDwn(), this.getstatusDrpDwn()]).then(values => {
        console.log(values);
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

    this.productInfo = [
      { srNo: '#', prInfo: 'Extra protein helps build strength' },
      { srNo: '#', prInfo: '100% Whole wheat chapati flour' },
      { srNo: '#', prInfo: 'No Maida Added ' },
      { srNo: '#', prInfo: 'Atta is made from the choicest grains - heavy on the palm, golden amber in colour and hard in bite' },
      { srNo: '#', prInfo: 'The dough made from Aashirvaad Atta absorbs more water, hence rotis remain softer for longer' }
    ];

    this.productDesc = [
      { prDesc: 'Handpicked from india’s finest wheat fields, fortune chakki fresh atta is made with 100 percent atta and 0 percent maida which complements your ghar ka khana perfectly. You can differentiate these fibre-rich rotis with your 5 senses - their superior quality taste, soft touch, mesmerizing aroma and a fluffy look, so words of appreciation are bound to come your way. ' }
    ];


  }

  defaultDropDwnValue() {
    this.selectedproducer = { iProducerID: "", sProducerName: "Select Producer" }
    this.selectedunit = { iUnitID: "", sUnitName: "Select Unit" }
    this.selectedfoodculture = { iKVID: "", sKVValue: "Select Foodculture" }
    this.selectedStatus = { iStatusID: "", sStatusName: "Select Status" }

  }

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

  //dropdown validity
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

  //producer dropdown
  getProducerDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2126,
      }

      this.apiService.getDropDownData(dataToSend4).then(response => {
        this.producerData = response
        this.producerData.splice(0, 0, { iProducerID: "", sProducerName: "Select Producer" })
        this.selectedproducer = { iProducerID: "", sProducerName: "Select Producer" }

        resolve(this.producerData)

      });
    })
  }

  //unit dropdown
  getUnitDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2146,
      }

      this.apiService.getDropDownData(dataToSend4).then(response => {
        this.unitData = response
        this.unitData.splice(0, 0, { iUnitID: "", sUnitName: "Select Unit" })
        this.selectedunit = { iUnitID: "", sUnitName: "Select Unit" }

        resolve(this.unitData)

      });
    })
  }

  //foodculture dropdown
  getFoodCultureDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2071,
        "sKVName": "FoodType"
      }

      this.apiService.getDropDownData(dataToSend4).then(response => {
        this.foodcultureData = response
        this.foodcultureData.splice(0, 0, { iKVID: "", sKVValue: "Select Foodculture" })
        this.selectedfoodculture = { iKVID: "", sKVValue: "Select Foodculture" }

        resolve(this.foodcultureData)

      });
    })
  }

  //status dropdown
  getstatusDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2271,
        "sProcessName": "Product"
      }

      this.apiService.getDropDownData(dataToSend4).then(response => {
        this.statusData = response
        this.statusData.splice(0, 0, { iStatusID: "", sStatusName: "Select Status" })
        this.selectedStatus = { iStatusID: "", sStatusName: "Select Status" }

        resolve(this.statusData)

      });
    })
  }

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

  //add product form
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
    this.apiService.callPostApi(addProductData).subscribe(
      data => {
        console.log(data);
        this.toastService.addSingle("success", "Record Added Successfully", "");

      },
      error => console.log(error)
    );
    this.ProductForm.reset();
  }

  //edit product form
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
      "iPrdID": +this.prdId
    }
    this.apiService.callPostApi(editProductData).subscribe(
      data => {
        console.log(data);
        this.toastService.addSingle("success", "Record Updated Successfully", "");

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
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
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
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
  openDialogForProductInfo() {
    const ref = this.dialogService.open(ProductInfoComponent, {
      data: {
      },
      header: 'Add New Product Info',
      width: '40%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
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
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
  openDialogForPrQueries() {
    const ref = this.dialogService.open(ProductQueriesComponent, {
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
