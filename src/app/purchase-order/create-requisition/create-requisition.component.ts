import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from 'src/app/services/toast.service';
import { createRequisitionMaster } from 'src/app/model/createRequisition.model';
import { ProductData } from 'src/app/model/productList-Requisition';

@Component({
  selector: 'app-create-requisition',
  templateUrl: './create-requisition.component.html',
  styleUrls: ['./create-requisition.component.css']
})
export class CreateRequisitionComponent implements OnInit {
  products: ProductData[];
  productCategValue;
  selectedproductCategory;
  selectedPartner;
  selectedpartnerLocation;
  pc_Id: number;
  productCateName: string;
  productName: string;
  prodshortName: string;
  partner;
  partner_Id: number;
  location;
  prd_Id: number;
  preq_Id: number;
  createrequisitionData: createRequisitionMaster;
  public createReqForm: FormGroup;
  isEdit: boolean = false;
  productData;
  selectedProduct;
  unitName: string;
  parentCateName: string;
  isReqSave: number = 0;
  constructor(private httpService: ApiService, private fb: FormBuilder, private ref: DynamicDialogRef,
    private toastService: ToastService, private config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.defaultDropDwnValue();
    this.preq_Id = this.config.data.iPReqID;
    if (this.preq_Id != null) {
      this.isEdit = true;
      this.createrequisitionData = new createRequisitionMaster(this.config.data);
      this.createReqForm = this.createControl(this.createrequisitionData);
      Promise.all([this.productCategDropdown(), this.partnerDropdown()]).then(values => {
        this.setDropDownVal()
      });
    } else {
      this.isEdit = false;
      this.createrequisitionData = new createRequisitionMaster();
      this.createReqForm = this.createControl(this.createrequisitionData);
      Promise.all([this.productCategDropdown(), this.partnerDropdown()]).then(values => {
        this.setDropDownVal()
      });
    }

  }

  //code for default dropdown data
  defaultDropDwnValue() {
    this.selectedproductCategory = { "iPCID": 0, "sPCName": "Select" };
    this.selectedProduct = { "iPCID": 0, "sPCName": "Select " }
    this.selectedPartner = { "iPartnerID": 0, "sPartnerName": "Select" };
    this.selectedpartnerLocation = { "iLocationID": 0, "sLocName": "Select" };
  }

  //code for set dropdown data 
  setDropDownVal() {
    let selectedParProductCateObj = this.productCategValue.find(x => x.iPCID == this.config.data.iParentID);

    if (selectedParProductCateObj !== undefined) {
      this.selectedproductCategory = selectedParProductCateObj;
    }
    // product Category Dropdown Select
    if (this.selectedproductCategory.iPCID) {
      const dataToSend4 = {
        "iRequestID": 2117,
        "iPCID": this.selectedproductCategory.iPCID
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.productData = response
        this.productData.splice(0, 0, { "iPCID": 0, "sPCName": "Select" })
        this.selectedProduct = { "iPCID": 0, "sPCName": "Select" }
        let selectedProductCateObj = this.productData.find(x => x.iPCID == this.config.data.iPCID);

        if (selectedProductCateObj !== undefined) {
          this.selectedProduct = selectedProductCateObj;
          console.log(this.selectedProduct.iPCID, "test")
        }

        if (this.selectedProduct.iPCID) {
          const product_list_data = {
            "iRequestID": 2244,
            "iPCID": this.selectedProduct.iPCID
          }
          this.httpService.callPostApi(product_list_data).subscribe(
            (data) => {
              this.products = data.body;
            },
            (error) => console.log(error)
          );
        }
      });
    }

    // partner Dropdown select
    let selectedPartnerObj = this.partner.find(x => x.iPartnerID == this.config.data.iPartnerID);

    if (selectedPartnerObj !== undefined) {
      this.selectedPartner = selectedPartnerObj;
    }

    //partner location Dropdown select
    if (this.selectedPartner.iPartnerID) {
      const productCateg_dropdown_data = {
        "iRequestID": 22810,
        "iPartnerID": this.selectedPartner.iPartnerID
      }
      this.httpService.getDropDownData(productCateg_dropdown_data).then(
        (data) => {
          this.location = data;
          this.location.splice(0, 0, { "iLocationID": 0, "sLocName": "Select" });
          this.selectedpartnerLocation = { "iLocationID": 0, "sLocName": "Select" };
          let selectedPartnerLocObj = this.location.find(x => x.iLocationID == this.config.data.iPartLocID);

          if (selectedPartnerLocObj !== undefined) {
            this.selectedpartnerLocation = selectedPartnerLocObj;
          }
        },
        (error) => console.log(error)
      );
    }
    this.parentCateName = this.config.data.sParentCatName;
    this.productCateName = this.config.data.sPCName;
    this.productName = this.config.data.sPrdName;
    this.prodshortName = this.config.data.sVariant;
    this.unitName = this.config.data.sUnitSymbol;
    this.prd_Id = this.config.data.iPrdID;
    this.pc_Id = this.config.data.iPCID;
  }

  //code for product category dropdown data
  productCategDropdown() {
    return new Promise((resolve, reject) => {
      const productCateg_dropdown_data = {
        "iRequestID": 2116,
      }
      this.httpService.getDropDownData(productCateg_dropdown_data).then(
        (data) => {
          this.productCategValue = data;
          this.productCategValue.splice(0, 0, { "iPCID": 0, "sPCName": "Select" });
          this.selectedproductCategory = { "iPCID": 0, "sPCName": "Select" };
          resolve(this.productCategValue)
        },
        (error) => console.log(error)
      );
    });
  }

  setPcId(event) {
    this.pc_Id = event.value.iPCID
    this.childCategoryData();
  }

  childCategoryData() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2117,
        "iPCID": this.pc_Id
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.productData = response
        this.productData.splice(0, 0, { iPCID: "", sPCName: "Select Product" })
        this.selectedProduct = { iPCID: "", sPCName: "Select Product" }
        resolve(this.productData)
      });
    })
  }

  //code for onchange to get partner id 
  setPartnerId(event) {
    this.partner_Id = event.value.iPartnerID
    this.partnerlocationDropdown();
  }

  // code for partner dropdown data
  partnerDropdown() {
    return new Promise((resolve, reject) => {
      const partner_dropdown_data = {
        "iRequestID": 2289,
      }
      this.httpService.getDropDownData(partner_dropdown_data).then(
        (data) => {
          this.partner = data;
          this.partner.splice(0, 0, { "iPartnerID": 0, "sPartnerName": "Select" });
          this.selectedPartner = { "iPartnerID": 0, "sPartnerName": "Select" };
          resolve(this.partner);
        },
        (error) => console.log(error)
      );
    });
  }

  // code for partner location dropdown data
  partnerlocationDropdown() {
    const productCateg_dropdown_data = {
      "iRequestID": 22810,
      "iPartnerID": this.partner_Id
    }
    this.httpService.getDropDownData(productCateg_dropdown_data).then(
      (data) => {
        this.location = data;
        this.location.splice(0, 0, { "iLocationID": 0, "sLocName": "Select" });
        this.selectedpartnerLocation = { "iLocationID": 0, "sLocName": "Select" };
      },
      (error) => console.log(error)
    );
  }

  // code for onchange to get pc id 
  onProductChange(event) {
    this.pc_Id = event.value.iPCID;
    this.productList();
  }

  // code for  list of product data
  productList() {
    const product_list_data = {
      "iRequestID": 2244,
      "iPCID": this.pc_Id
    }
    this.httpService.callPostApi(product_list_data).subscribe(
      (data) => {
        this.products = data.body;
      },
      (error) => console.log(error)
    );
  }

  // code for fetch data onclick arrow of product list 
  fetchProductData(products) {
    this.parentCateName = this.selectedproductCategory.sPCName;
    this.productCateName = products.sPCName;
    this.productName = products.sPrdName;
    this.prodshortName = '';
    this.unitName = '';
    this.prd_Id = products.iPrdID;
    this.pc_Id = products.iPCID;
    this.unitName = "";
  }

  //code for implements form builder 
  createControl(createrequisitionData?: createRequisitionMaster): FormGroup {

    this.createReqForm = this.fb.group({
      iQty: [createrequisitionData.iQty, [Validators.required, Validators.pattern('^[0-9]*$')]],
      iPCID: [createrequisitionData.iPCID],
      iPrdID: [createrequisitionData.iPrdID],
      sPCName: [createrequisitionData.sPCName],
      sLocCode: [createrequisitionData.sLocCode],
      sLocName: [createrequisitionData.sLocName],
      sPrdName: [createrequisitionData.sPrdName],
      iPartLocID: [createrequisitionData.iPartLocID, [Validators.required]],
      iPartnerID: [createrequisitionData.iPartnerID],
      sCreatedDate: [createrequisitionData.sCreatedDate],
      sPartnerName: [createrequisitionData.sPartnerName, [Validators.required]]
    });
    return this.createReqForm;
  }

  //code for add new requisition data
  addnewRequisition() {
    if (this.isReqSave == 0) {
      this.isReqSave = 1;
      let form = this.createReqForm.getRawValue();

      const requisition_add_data = {
        "iRequestID": 2331,
        "iPCID": this.pc_Id,
        "iPartnerID": form.sPartnerName.iPartnerID,
        "iPartLocID": form.iPartLocID.iLocationID,
        "iPrdID": this.prd_Id,
        "iQty": +form.iQty
      }
      this.httpService.callPostApi(requisition_add_data).subscribe(
        (data) => {
          this.isReqSave = 0;
          if (data.headers.get('StatusCode') == 200) {
            this.ref.close(true);
          }
          let req_no = data.body[0].sRequisionNo + " has been created successfully";
          //this.ref.close(true);
          this.toastService.displayApiMessage(req_no, data.headers.get('StatusCode'));
        },
        (error) => console.log(error)
      );
      //this.createReqForm.reset();
    }
  }
  //code for edit requisition data 
  editRequisition() {
    let form = this.createReqForm.getRawValue();

    const requisition_edit_data = {
      "iRequestID": 2332,
      "iPCID": this.pc_Id,
      "iPartnerID": form.sPartnerName.iPartnerID,
      "iPartLocID": form.iPartLocID.iLocationID,
      "iPrdID": this.prd_Id,
      "iQty": +form.iQty,
      "iPReqID": this.preq_Id
    }
    this.httpService.callPostApi(requisition_edit_data).subscribe(
      (data) => {
        //this.ref.close(true);
        if (data.headers.get('StatusCode') == 200) {
          this.ref.close(true);
        }
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      (error) => console.log(error)
    );
    //this.createReqForm.reset();
  }

  //code for close dialog box
  closeDialog() {
    this.ref.close();
  }

  //code for form validation check
  dropDownValidityCheck() {
    if (this.selectedPartner.iPartnerID == '') {
      return true;
    }
    else if (this.selectedpartnerLocation.iLocationID == '') {
      return true
    }
    else if (this.productCateName == null) {
      return true
    }
    else if (this.productName == null) {
      return true
    }
    else if (this.prodshortName == null) {
      return true
    }
    else if (this.parentCateName == null) {
      return true
    }
    else {
      return false
    }
  }

}
