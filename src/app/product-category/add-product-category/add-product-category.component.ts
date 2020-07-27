import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ProductCategory } from 'src/app/model/product-category.model';
import { ToastService } from 'src/app/services/toast.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.css']
})

export class AddProductCategoryComponent implements OnInit {

  productCategoryData: ProductCategory;
  public ProductCategoryForm: FormGroup;
  PCID: number;
  isEdit: boolean = false;
  parentCatData;
  statusData;
  selectedparentCategory;
  selectedstatus;
  submitFlag: number = 0;

  constructor(public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private httpService: ApiService,
    private toastService: ToastService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.defaultDropDwnValue();
    this.PCID = this.config.data.iPCID;
    this.productCategoryData = new ProductCategory();
    this.ProductCategoryForm = this.createControl(this.productCategoryData);
    if (this.PCID != null) {
      this.isEdit = true
      var getCategoryDataApi = {
        "iRequestID": 2115,
        "iPCID": this.PCID
      }
      this.httpService.callPostApi(getCategoryDataApi).subscribe(
        data => {
          this.productCategoryData = new ProductCategory(data.body[0]);
          this.ProductCategoryForm = this.createControl(this.productCategoryData);
          Promise.all([this.getParentCatData(), this.getStatusData()]).then(values => {
            console.log(values);
            this.setDropDownVal();
          });
        });
    }
    else {
      this.isEdit = false;
      this.productCategoryData = new ProductCategory();
      this.ProductCategoryForm = this.createControl(this.productCategoryData);
      Promise.all([this.getParentCatData(), this.getStatusData()]).then(values => {
        console.log(values);
      });
    }
    this.ProductCategoryForm.valueChanges.subscribe((changedObj: any) => {
      //this.dropDownValidityCheck()
    });
  }

  createControl(productcategory?: ProductCategory): FormGroup {
    this.ProductCategoryForm = this.fb.group({
      iPCID: [productcategory.iPCID],
      sPCName: [productcategory.sPCName, ValidationService.nameValidator_space],
      iStatusID: [productcategory.iStatusID, ValidationService.dropdownValidator],
      sStatusName: [productcategory.sStatusName],
      iParentID: [productcategory.iParentID, ValidationService.parentCateDropdownValidator],
      sParentCategoryName: [productcategory.sParentCategoryName]
    });
    return this.ProductCategoryForm;
  }

  closeDialog() {
    this.ref.close();
  }

  getParentCatData() {
    return new Promise((resolve, reject) => {
      var parent_cat_api = {
        "iRequestID": 2116
      }
      this.httpService.callPostApi(parent_cat_api).subscribe(
        data => {
          this.parentCatData = data.body;
          this.parentCatData.unshift({ iPCID: "", sPCName: "Select Product Category" });
          this.selectedparentCategory = { iPCID: "", sPCName: "Select Product Category" };
          resolve(this.parentCatData);
        },
        error => {
          console.log(error);
        });
    });
  }

  getStatusData() {
    return new Promise((resolve, reject) => {
      var status_api = {
        "iRequestID": 2071,
        "sKVName": "Status"
      }
      this.httpService.callPostApi(status_api).subscribe(
        data => {
          this.statusData = data.body;
          this.statusData.unshift({ iKVID: "", sKVValue: "Select Status" });
          this.selectedstatus = { iKVID: "", sKVValue: "Select Status" };
          resolve(this.statusData);
        },
        error => {
          console.log(error)
        });
    });
  }

  addProductCategory() {
    if (this.submitFlag == 0) {
      this.submitFlag = 1;
      var formData = this.ProductCategoryForm.getRawValue();
      const addProductCategoryAPI = {
        "iRequestID": 2111,
        "sPCName": formData.sPCName,
        "iParentID": parseInt(formData.iParentID.iPCID)
      }
      this.httpService.callPostApi(addProductCategoryAPI).subscribe(
        data => {
          if (data.headers.get('StatusCode') == 200) {
            this.ref.close(true);
          }
          this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          this.submitFlag = 0;
        });
    }

  }

  editProductCategory() {
    var formData = this.ProductCategoryForm.getRawValue();
    var editProductCategoryAPI = {
      "iRequestID": 2112,
      "sPCName": formData.sPCName,
      "iParentID": parseInt(formData.iParentID.iPCID),
      "iStatusID": parseInt(formData.iStatusID.iKVID),
      "iPCID": this.PCID
    }
    this.httpService.callPostApi(editProductCategoryAPI).subscribe(
      data => {
        if (data.headers.get('StatusCode') == 200) {
          this.ref.close(true);
        }
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      }
    )
  }


  setDropDownVal() {
    // Parent product category Dropdown Select
    let selectedParentCat = this.parentCatData.find(data => data.iPCID == this.productCategoryData.iParentID);
    if (selectedParentCat !== undefined) {
      this.selectedparentCategory = selectedParentCat;
    }
    this.ProductCategoryForm.get('iParentID').setValue(this.selectedparentCategory);


    // status Dropdown Select
    let selectedStatus = this.statusData.find(data => data.iKVID == this.productCategoryData.iStatusID);
    if (selectedStatus !== undefined) {
      this.selectedstatus = selectedStatus;
    }
    this.ProductCategoryForm.get('iStatusID').setValue(this.selectedstatus);

  }

  defaultDropDwnValue() {
    this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
    this.selectedparentCategory = { iPCID: "", sPCName: "Select Parent category" }
  }

  // dropDownValidityCheck() {
  //   if (this.selectedstatus.iKVID == '') {
  //     return true;
  //   }
  //   else if (this.selectedparentCategory.iPCID == '') {
  //     return true
  //   }
  //   else {
  //     return false
  //   }
  // }

}
