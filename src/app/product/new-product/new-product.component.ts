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
import { ProductCategoryMapping } from 'src/app/model/product-category-mapping.model';
import { productQuerData } from 'src/app/model/productQueries';
import { APIService } from 'src/app/services/apieservice';

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
  selectedParent;
  producerData;
  unitData;
  foodcultureData;
  parentData;
  prdId;
  tabDisabled: boolean = true;
  sourceCategory: ProductCategoryMapping[];
  targetCategory: ProductCategoryMapping[];
  selectedFileType;
  fileTypeData;
  uploadedFiles: any[] = [];
  attachment: any[];
  index: number = 0;

  constructor(private carService: CarService, private breadcrumbService: BreadcrumbService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private httpService: ApiService,
    private _formBuilder: FormBuilder,
    private toastService: ToastService,
    private _apiService: APIService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Product', routerLink: ['/product'] }
    ]);
  }

  ngOnInit(): void {

    this.defaultDropDwnValue();
    this.productData = new ProductMaster();
    this.ProductForm = this.createControl(this.productData);
    if (this.route.snapshot.params['iPrdID']) {
      this.prdId = +this.route.snapshot.params['iPrdID'];
      localStorage.setItem('iPrdID', this.prdId)
    }
    else {
      this.prdId = +localStorage.getItem("iPrdID");
    }

    //code for select product  by id
    if (this.prdId) {
      this.isEdit = true
      this.tabDisabled = false
      var dataToSendEdit = {
        "iRequestID": 2255,
        "iPrdID": this.prdId
      }
      this.httpService.getDropDownData(dataToSendEdit).then(response => {
        this.productData = new ProductMaster(response[0]);
        this.ProductForm = this.createControl(this.productData);
        Promise.all([this.getProducerDrpDwn(), this.getUnitDrpDwn(), this.getFoodCultureDrpDwn(), this.getParentDrpDwn()]).then(values => {
          this.setDropDownVal()
        });
        this.getProductInfo();
        this.getProductQueries();
        this.getCategoryMappingDataSource();
        this.getCategoryMappingDataTarget();
      });
    }
    else {
      this.isEdit = false
      Promise.all([this.getProducerDrpDwn(), this.getUnitDrpDwn(), this.getFoodCultureDrpDwn()]).then(values => {
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
    // this.productVariant = [
    //   { Unit: 'Gram', variant: '500' },
    //   { Unit: 'Kg', variant: '1' }
    // ];
    this.productDesc = [
      { prDesc: 'Handpicked from india’s finest wheat fields, fortune chakki fresh atta is made with 100 percent atta and 0 percent maida which complements your ghar ka khana perfectly. You can differentiate these fibre-rich rotis with your 5 senses - their superior quality taste, soft touch, mesmerizing aroma and a fluffy look, so words of appreciation are bound to come your way. ' }
    ];
  }

  //code for product default dropdown data
  defaultDropDwnValue() {
    this.selectedproducer = { iProducerID: "", sProducerName: "Select Producer" }
    this.selectedunit = { iUnitID: "", sUnitName: "Select Unit" }
    this.selectedfoodculture = { iKVID: "", sKVValue: "Select Foodculture" }
    this.selectedParent = { iPrdID: "", sParentPrdName: "Select Parent Category" }
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
    let selectedParentObj = this.parentData.find(x => x.iPrdID == this.productData.iParentID);
    if (selectedParentObj !== undefined) {
      this.selectedParent = selectedParentObj;
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

  //code for parent dropdown
  getParentDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2259,
        "sPrdName": this.ProductForm.controls['sPrdName'].value
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.parentData = response
        this.parentData.splice(0, 0, { iPrdID: "", sParentPrdName: "Select Parent Category" })
        this.selectedParent = { iPrdID: "", sParentPrdName: "Select Parent Category" }
        resolve(this.parentData)
      });
    })
  }

  productChange() {
    this.getParentDrpDwn();
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
      iCreatedBy: [productData.iCreatedBy],
      sVariant: [productData.sVariant, [Validators.required]],
      iProducerID: [productData.iProducerID],
      sCreatedDate: [productData.sCreatedDate],
      sProducerName: [productData.sProducerName, [Validators.required]],
      sParentPrdName: [productData.sParentPrdName]
    });
    return this.ProductForm;
  }

  //code for add product data
  addProductForm() {
    var formData = this.ProductForm.getRawValue();
    var addProductData;
    if (formData.sParentPrdName.iPrdID) {
      addProductData = {
        "iRequestID": 2251,
        "sPrdName": formData.sPrdName,
        "sVariant": formData.sVariant,
        "iUnitID": formData.sUnitName.iUnitID,
        "iFoodCulture": formData.sFoodCulture.iKVID,
        "iProducerID": formData.sProducerName.iProducerID,
        "iParentID": formData.sParentPrdName.iPrdID
      }
    }
    else {
      addProductData = {
        "iRequestID": 2251,
        "sPrdName": formData.sPrdName,
        "sVariant": formData.sVariant,
        "iUnitID": formData.sUnitName.iUnitID,
        "iFoodCulture": formData.sFoodCulture.iKVID,
        "iProducerID": formData.sProducerName.iProducerID,
      }
    }
    this.httpService.callPostApi(addProductData).subscribe(
      data => {
        this.prdId = data.body[0].iprdId;
        localStorage.setItem('iPrdID', this.prdId);
        this.getProductInfo();
        this.getProductQueries();
        this.getCategoryMappingDataSource();
        this.getCategoryMappingDataTarget();
        this.tabDisabled = false
        let prd_name = "Product " + formData.sPrdName + " " + formData.sVariant + " " + formData.sUnitName.sUnitName + " has been created successfully"
        this.toastService.displayApiMessage(prd_name, data.headers.get('StatusCode'));
        this.isEdit = true
        this.index = 1;
      },
      error => console.log(error)
    );
  }

  //code for edit product data
  editProductForm() {
    var formData = this.ProductForm.getRawValue();
    var editProductData;
    if (formData.sParentPrdName.iPrdID) {
      editProductData = {
        "iRequestID": 2252,
        "sPrdName": formData.sPrdName,
        "sVariant": formData.sVariant,
        "iUnitID": formData.sUnitName.iUnitID,
        "iFoodCulture": formData.sFoodCulture.iKVID,
        "iProducerID": formData.sProducerName.iProducerID,
        "iPrdID": this.prdId,
        "iParentID": formData.sParentPrdName.iPrdID
      }
    }
    else {
      editProductData = {
        "iRequestID": 2252,
        "sPrdName": formData.sPrdName,
        "sVariant": formData.sVariant,
        "iUnitID": formData.sUnitName.iUnitID,
        "iFoodCulture": formData.sFoodCulture.iKVID,
        "iProducerID": formData.sProducerName.iProducerID,
        "iPrdID": this.prdId,
      }
    }
    this.httpService.callPostApi(editProductData).subscribe(
      data => {
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
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
  //category mapping starts
  getCategoryMappingDataSource() {
    const supplierCategoryMappingAPI = {
      "iRequestID": 2241,
      "iPrdID": this.prdId
    }
    this.httpService.callPostApi(supplierCategoryMappingAPI).subscribe(
      data => { this.sourceCategory = data.body; },
      error => { console.log(error) }
    )
  }
  // category mapping ends

  //category mapping starts
  getCategoryMappingDataTarget() {
    const supplierCategoryMappingAPI1 = {
      "iRequestID": 2243,
      "iPrdID": this.prdId
    }
    this.httpService.callPostApi(supplierCategoryMappingAPI1).subscribe(
      data => { this.targetCategory = data.body; },
      error => { console.log(error) }
    )
  }
  // category mapping ends

  // add category mapping starts
  addCategoryMappingData() {
    let temp_ids_arr = [];
    this.targetCategory.map(
      (val) => {
        temp_ids_arr.push(val.iPCID);
      }
    )
    let string_ids = temp_ids_arr.toString();
    const supplierCategoryMappingAddAPI = {
      "iRequestID": 2242,
      "iPrdID": this.prdId,
      "sPrdCatMap": string_ids
    }
    if (this.targetCategory.length) {
      this.httpService.callPostApi(supplierCategoryMappingAddAPI).subscribe(
        data => {
          this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
        },
        error => { console.log(error) }
      )
    }
    else
      this.toastService.addSingle("warning", "Select atleast 1 Category", "");
  }
  // add category mapping ends


  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  uploadFile() {
    // alert(JSON.stringify(this.uploadedFiles))
    var dataToSend = {
      "iRequestID": 1111,
      "iProcessTranID": this.prdId,
      "iProcessID": 2,
      "iDocTypeID": this.selectedFileType.iDocTypeID
    }
    this._apiService.postFile(this.uploadedFiles, dataToSend).subscribe(data => {
      this.showAttachment();
    }, error => {
      console.log(error);
    });
  }

  getFileType() {
    return new Promise((resolve, reject) => {
      var dataToSend = {
        "iRequestID": 2261
      }
      this.httpService.getDropDownData(dataToSend).then(response => {
        this.fileTypeData = response
        this.fileTypeData.splice(0, 0, { iDocTypeID: "", sDocTypeName: "Select File Type" })
        this.selectedFileType = { iDocTypeID: "", sDocTypeName: "Select File Type" }
        resolve(this.fileTypeData)
      });
    })
  }

  //code for download attachments
  downloadFile(attachment: any) {
    var dataToSend = {
      "iRequestID": "1112",
      "sActualFileName": attachment.sActualName,
      "sSystemFileName": attachment.sSystemName
    }
    this._apiService.downloadAPI(dataToSend)
  }

  //code for list of attachments
  showAttachment() {
    var dataToSend = {
      "iRequestID": 1112,
      "iProcessTranID": this.prdId,
      "iProcessID": 2
    }
    this._apiService.getDetails(dataToSend).then(response => {
      this.attachment = response
    });
  }

}


