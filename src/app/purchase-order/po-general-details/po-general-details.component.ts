import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { POGeneralMaster } from 'src/app/model/poGeneral.model';
import { ApiService } from 'src/app/services/api.service';
import { supplierReqListData } from 'src/app/model/supplier-requisitionList';
import { ToastService } from 'src/app/services/toast.service';
import { DatePipe } from '@angular/common';
import { APIService } from 'src/app/services/apieservice';
import { Router } from '@angular/router';
import { PoTnc } from 'src/app/model/po-tnc.model';

@Component({
  selector: 'app-po-general-details',
  templateUrl: './po-general-details.component.html',
  styleUrls: ['./po-general-details.component.css'],
})
export class PoGeneralDetailsComponent implements OnInit {

  text: string;
  disabled: boolean = true;
  attachment: any[];
  data: object;
  public POForm: FormGroup;
  poRespData: object;
  purchaseOrderData: POGeneralMaster;
  productDetails: supplierReqListData[];
  poId: number;
  addressData;
  selectedAddress;
  selectedSuppContact;
  supplierContact;
  selectedPartnerContact;
  partnerContact;
  currencyData;
  selectedCurrency;
  checked: boolean = false;
  uploadedFiles: any[] = [];
  fileTypeData;
  selectedFileType;
  editPo: string;
  TermsData: PoTnc[];
  General: PoTnc[];
  Selectedvalue: PoTnc[] = [];
  Payment: PoTnc[];
  SelectedPayment: PoTnc[] = [];
  Warranty: PoTnc[];
  SelectedWarranty: PoTnc[] = [];
  Custom: PoTnc[];
  termsCondData: PoTnc[];
  tnc_mandate_data = [];
  customTnc: FormArray;
  termsCondForm: FormGroup;
  GeneralDisable: boolean = false;
  PaymentDisable: boolean;
  WarrantyDisable: boolean;
  sinlgepaymentVal: PoTnc;
  selectedCustom: PoTnc[] = [];
  po_no_display: string;
  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService, private fb: FormBuilder,
    private httpService: ApiService, private toastService: ToastService, private datePipe: DatePipe, private confirmationService: ConfirmationService,
    private _apiService: APIService, private router: Router) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
  }

  ngOnInit(): void {
    this.defaultDropDwnValue();
    this.editPo = localStorage.getItem('isPoEdit');
    this.data = JSON.parse(localStorage.getItem('poDetails'));
    console.log(this.data, "data");

    this.poRespData = Object.values(this.data);
    console.log(this.poRespData, "resp")
    this.poId = this.poRespData[0].iPOID;
    if (this.editPo == 'true') {
      var dataToSendEdit = {
        "iRequestID": 23510,
        "iPOID": this.poId
      }
      this.httpService.callPostApi(dataToSendEdit).subscribe(
        data => {
          this.purchaseOrderData = new POGeneralMaster(data.body[0]);
          this.POForm = this.createControl(this.purchaseOrderData);
          this.poId = this.purchaseOrderData.iPOID;
          this.po_no_display = this.purchaseOrderData.sPONo;
          if (this.purchaseOrderData.iIncludeTaxes == 1) {
            this.checked = true;
          }
          Promise.all([this.getSuppContact(), this.getSuppAddress(), this.getPartnerContact(), this.getCurrency(), this.getFileType()]).then(values => {
            console.log(values);
            this.setDropDownVal()
          });
        });
    }
    else {
      this.purchaseOrderData = new POGeneralMaster(this.poRespData[0]);
      console.log(this.purchaseOrderData, "2")
      this.POForm = this.createControl(this.purchaseOrderData);
      this.poId = this.purchaseOrderData.iPOID;
      this.po_no_display = this.purchaseOrderData.sPONo;
      Promise.all([this.getSuppContact(), this.getSuppAddress(), this.getPartnerContact(), this.getCurrency(), this.getFileType()]).then(values => {
        console.log(values);
      });
    }
    // this.POForm.valueChanges.subscribe((changedObj: any) => {
    //   this.dropDownValidityCheck()
    // });
    this.getProductList();
    this.showAttachment();
    this.getTermsCondList();
    this.termsCondForm = this.fb.group({
      customTnc: new FormArray([])
    });
  }

  //code for product default dropdown data
  defaultDropDwnValue() {
    this.selectedSuppContact = { iSupContactID: "", sFullName: "Select Contact" }
    this.selectedAddress = { iSupAddID: "", sAddress: "Select Address" }
    this.selectedPartnerContact = { iPartnerContactID: "", sFullName: "Select Contact" }
    this.selectedCurrency = { iKVID: "", sKVValue: "Select Currency" }
  }
  //Function to set dropdown value on edit
  setDropDownVal() {
    // Supplier Contact Dropdown 
    let selectedSuppContactObj = this.supplierContact.find(x => x.iSupContactID == this.purchaseOrderData.iSupContactID);
    if (selectedSuppContactObj !== undefined) {
      this.selectedSuppContact = selectedSuppContactObj;
    }

    // Supplier Address Dropdown
    let selectedAddressObj = this.addressData.find(x => x.iSupAddID == this.purchaseOrderData.iSupAddID);
    if (selectedAddressObj !== undefined) {
      this.selectedAddress = selectedAddressObj;
    }

    // Partner Contact Dropdown
    let selectedPartnerContactObj = this.partnerContact.find(x => x.iPartnerContactID == this.purchaseOrderData.iPOContactID);
    if (selectedPartnerContactObj !== undefined) {
      this.selectedPartnerContact = selectedPartnerContactObj;
    }

    // Currency Dropdown
    let selectedCurrencyObj = this.currencyData.find(x => x.iKVID == this.purchaseOrderData.iCurrencyID);
    if (selectedCurrencyObj !== undefined) {
      this.selectedCurrency = selectedCurrencyObj;
    }
  }

  //Function to check Dropdown Validation
  dropDownValidityCheck() {
    if (this.selectedAddress.iSupAddID == '') {
      return true;
    }
    if (this.selectedSuppContact.iSupContactID == '') {
      return true;
    }
    if (this.selectedPartnerContact.iPartnerContactID == '') {
      return true;
    }
    if (this.selectedCurrency.iKVID == '') {
      return true;
    }
    else {
      return false;
    }
  }

  //Function to get supplier contact dropdwon
  getSuppContact() {
    return new Promise((resolve, reject) => {
      const dataToSend = {
        "iRequestID": 2196,
        "iSupID": this.purchaseOrderData.iSupID
      }
      this.httpService.getDropDownData(dataToSend).then(response => {
        this.supplierContact = response
        this.supplierContact.splice(0, 0, { iSupContactID: "", sFullName: "Select Contact" })
        this.selectedSuppContact = { iSupContactID: "", sFullName: "Select Contact" }
        resolve(this.supplierContact)
      });
    })
  }

  //Function to get Supplier Address dropdown 
  getSuppAddress() {
    return new Promise((resolve, reject) => {
      const dataToSend = {
        "iRequestID": 2186,
        "iSupID": this.purchaseOrderData.iSupID
      }
      this.httpService.getDropDownData(dataToSend).then(response => {
        this.addressData = response
        this.addressData.splice(0, 0, { iSupAddID: "", sAddress: "Select Address" })
        this.selectedAddress = { iSupAddID: "", sAddress: "Select Address" }
        resolve(this.addressData)
      });
    })
  }

  //Function to get partner contact dropdown
  getPartnerContact() {
    return new Promise((resolve, reject) => {
      const dataToSend = {
        "iRequestID": 2306,
        "iPartnerID": this.purchaseOrderData.iPartnerID
      }
      this.httpService.getDropDownData(dataToSend).then(response => {
        this.partnerContact = response
        this.partnerContact.splice(0, 0, { iPartnerContactID: "", sFullName: "Select Contact" })
        this.selectedPartnerContact = { iPartnerContactID: "", sFullName: "Select Contact" }
        resolve(this.partnerContact)
      });
    })
  }

  //Function to get currency dropdown
  getCurrency() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2071,
        "sKVName": "Currency"
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.currencyData = response
        this.currencyData.splice(0, 0, { iKVID: "", sKVValue: "Select Currency" })
        this.selectedCurrency = { iKVID: "", sKVValue: "Select Currency" }
        resolve(this.currencyData)
      });
    })
  }

  createControl(poData?: POGeneralMaster): FormGroup {
    this.POForm = this.fb.group({
      sPODate: [poData.sPODate, Validators.required],
      iSuppContactName: [poData.iSupContactID, Validators.required],
      sSuppAddress: [poData.iSupAddID, Validators.required],
      iPartnerContactName: [poData.iPOContactID, Validators.required],
      iCurrencyName: [poData.iCurrencyID, Validators.required],
      sLocName: [poData.sLocName],
      sPartnerName: [poData.sPartnerName],
      sSupName: [poData.sSupName],
      sPONo: [poData.sPONo],
      iIncludeTaxes: [poData.iIncludeTaxes],
    });
    return this.POForm;
  }

  //Save PO Details
  savePODetail() {
    var formData = this.POForm.getRawValue();
    let new_date = formData.sPODate;
    let po_date = this.datePipe.transform(new_date, 'dd/MM/yyyy');
    let taxVal: number = 0;
    if (this.checked == true) {
      taxVal = 1;
    }
    const addAPI = {
      "iRequestID": 2352,
      "sPODate": po_date,
      "iSupContactID": formData.iSuppContactName.iSupContactID,
      "iSupAddID": formData.sSuppAddress.iSupAddID,
      "iPOContactID": formData.iPartnerContactName.iPartnerContactID,
      "iCurrencyID": formData.iCurrencyName.iKVID,
      "iPOID": this.poId,
      "iIncludeTaxes": taxVal
    }
    this.httpService.callPostApi(addAPI).subscribe(
      data => {
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      });
  }

  //Cancel button function for PO details page
  cancelClick() {
    if (this.editPo == 'true') {
      this.router.navigate(['/purchase-order/po-list'])
    }
    else {
      this.router.navigate(['/purchase-order/create-po-detail'])
    }
  }

  //Function to fetch products in product tab
  getProductList() {
    const getProduct = {
      "iRequestID": 2362,
      "iPOID": this.poId
    }
    this.httpService.callPostApi(getProduct).subscribe(
      data => {
        this.productDetails = data.body;
      });
  }

  //code for show terms and condition data
  getTermsCondList() {
    const getTermsCond_data = {
      "iRequestID": 2384,
      "iPOID": this.poId
    }
    this.httpService.callPostApi(getTermsCond_data).subscribe(
      data => {
        this.TermsData = data.body;
        this.General = this.TermsData.filter(key => key.iTnCTypeID == 51);
        this.General.map(key => {
          this.setSelectedarray(key, this.Selectedvalue, this.GeneralDisable)
        })
        this.Payment = this.TermsData.filter(key => key.iTnCTypeID == 52);
        this.Payment.map(key => {
          // if(key.iIsMandatory == 1){
          //   this.SelectedPayment.push(key);
          //   this.PaymentDisable = true;
          // }
          // else if(key.iIsMandatory == 0){
          //   if(key.iPOID != 0){
          //     this.SelectedPayment.push(key);
          //   }
          // }
          this.setSelectedarray(key, this.SelectedPayment, this.PaymentDisable)
        })
        this.Warranty = this.TermsData.filter(key => key.iTnCTypeID == 54);
        this.Warranty.map(key => {
          // if(key.iIsMandatory == 1){
          //   this.SelectedWarranty.push(key);
          //   this.WarrantyDisable = true;
          // }
          // else if(key.iIsMandatory == 0){
          //   if(key.iPOID != 0){
          //     this.SelectedWarranty.push(key);
          //   }
          // }
          this.setSelectedarray(key, this.SelectedWarranty, this.WarrantyDisable)
        })
        this.Custom = this.TermsData.filter(key => key.iTnCTypeID == 55);
        this.createtncTable(this.Custom, this.customTnc, 'customTnc');
        // this.selectedCustom = this.Custom;
      });
  }


  setSelectedarray(key: PoTnc, arrayName: PoTnc[], buttonName: boolean) {
    if (key.iIsMandatory == 1) {
      arrayName.push(key);
      buttonName = true;
    }
    else if (key.iIsMandatory == 0) {
      if (key.iPOID != 0) {
        arrayName.push(key);
      }
    }
  }

  // select single checkbox
  checkBoxValidation(requiredSelectedArray) {
    const latestValue = requiredSelectedArray[requiredSelectedArray.length - 1];
    requiredSelectedArray.length = 0;
    if (latestValue != undefined)
      requiredSelectedArray.push(latestValue);
  }

  //code to add new terms and condition data
  onSubmit() {
    this.termsCondData = [];
    this.termsCondData.push(...this.Selectedvalue, ...this.SelectedPayment, ...this.SelectedWarranty);
    console.log(this.termsCondData);
    this.tnc_mandate_data = [];
    this.termsCondData.forEach((key, index) => {
      let iTnCID = this.termsCondData[index].iTnCID;
      let iTnCTypeID = this.termsCondData[index].iTnCTypeID;
      let sTnCDesc = this.termsCondData[index].sTnCDesc;
      let iDisplayOrder = this.termsCondData[index].iDisplayOrder;
      let temp_array = {
        "iTnCID": iTnCID,
        "iTnCTypeID": iTnCTypeID,
        "sTnCDesc": sTnCDesc,
        "iDisplayOrder": iDisplayOrder
      }
      this.tnc_mandate_data.push(temp_array);
    })
    this.Custom.forEach((key, index) => {
      let initial_value = Object.values(this.termsCondForm.value.customTnc[index]);
      let first_value = initial_value[0];
      if (first_value != null || first_value != undefined) {
        let iTnCID = this.Custom[index].iTnCID;
        let iTnCTypeID = this.Custom[index].iTnCTypeID;
        let iDisplayOrder = this.Custom[index].iDisplayOrder;
        let temp_array = {
          "iTnCID": iTnCID,
          "iTnCTypeID": iTnCTypeID,
          "sTnCDesc": first_value,
          "iDisplayOrder": iDisplayOrder
        }
        this.tnc_mandate_data.push(temp_array);
      }
    })

    const tncAddAPI = {
      "iRequestID": 2385,
      "iPOID": this.poId,
      "sTnCDesc": this.tnc_mandate_data
    }
    console.log(tncAddAPI);
    console.log(this.tnc_mandate_data);
    let a = Object.values(this.termsCondForm.value.customTnc[0])
    console.log(a[0])

    this.httpService.callPostApi(tncAddAPI).subscribe(
      data => {
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      });
  }


  createtncTable(curr_arr, arrayName, controlArraName) {
    curr_arr.map(key => {
      if (curr_arr.length) {
        this.addItem(key.sTnCDesc, arrayName, controlArraName);
      }

    })

  }

  createItem(obj): FormGroup {
    return this.fb.group({
      custom: obj
    });
  }


  addItem(obj, arrayName, controlArrayName): void {
    arrayName = this.termsCondForm.get(controlArrayName) as FormArray;
    arrayName.push(this.createItem(obj));
  }


  // code for select files 
  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  //code for upload files 
  uploadFile() {
    var dataToSend = {
      "iRequestID": 1111,
      "iProcessTranID": this.poId,
      "iProcessID": 2,
      "iDocTypeID": this.selectedFileType.iDocTypeID
    }
    this._apiService.postFile(this.uploadedFiles, dataToSend).subscribe(data => {
      this.showAttachment();
    }, error => {
      console.log(error);
    });
  }

  //code for filetype dropdown data
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

  //code for list of attachments
  showAttachment() {
    var dataToSend = {
      "iRequestID": 1112,
      "iProcessTranID": this.poId,
      "iProcessID": 2
    }
    this._apiService.getDetails(dataToSend).then(response => {
      this.attachment = response
    });
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
  // Dialog box to delete product 
  deleteProduct(iPrdID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete this Record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var deleteAPI = {
          "iRequestID": 2363,
          "iPOID": this.poId,
          "iPrdID": iPrdID
        }
        this.httpService.callPostApi(deleteAPI).subscribe(
          data => {
            this.getProductList();
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          },
          error => { console.log(error) }
        );
      }
    });
  }

}
