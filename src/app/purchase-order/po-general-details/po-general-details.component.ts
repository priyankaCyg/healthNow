import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { POGeneralMaster } from 'src/app/model/poGeneral.model';
import { ApiService } from 'src/app/services/api.service';
import { supplierReqListData } from 'src/app/model/supplier-requisitionList';
import { ToastService } from 'src/app/services/toast.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-po-general-details',
  templateUrl: './po-general-details.component.html',
  styleUrls: ['./po-general-details.component.css']
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
  selectedTax: string[] = [];
  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService, private fb: FormBuilder,
    private httpService: ApiService, private toastService: ToastService, private datePipe: DatePipe) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
  }

  ngOnInit(): void {
    this.defaultDropDwnValue();
    this.attachment = [
      { fileName: 'Testing File', fileType: 'testing.pdf' },
      { fileName: 'Demo File', fileType: 'demo.xlsx' },
      { fileName: 'Detail Document', fileType: 'details.pdf' },
      { fileName: 'Supplier Details', fileType: 'supplier-details.pdf' }
    ];
    let editPo: string = localStorage.getItem('isPoEdit');
    if (editPo == 'true') {
      var dataToSendEdit = {
        // "iRequestID": 2288,
        // "iPartnerID": this.partner_id
      }
      this.httpService.callPostApi(dataToSendEdit).subscribe(
        data => {
          this.purchaseOrderData = new POGeneralMaster(data.body[0]);
          this.POForm = this.createControl(this.purchaseOrderData);
          this.poId = this.purchaseOrderData.iPOID;
          Promise.all([this.getSuppContact(), this.getSuppAddress(), this.getPartnerContact(), this.getCurrency()]).then(values => {
            console.log(values);
            this.setDropDownVal()
          });
        });
    }
    else {
      this.data = JSON.parse(localStorage.getItem('poDetails'));
      this.poRespData = Object.values(this.data);
      this.purchaseOrderData = new POGeneralMaster(this.poRespData[0]);
      this.POForm = this.createControl(this.purchaseOrderData);
      this.poId = this.purchaseOrderData.iPOID;
      Promise.all([this.getSuppContact(), this.getSuppAddress(), this.getPartnerContact(), this.getCurrency()]).then(values => {
        console.log(values);
      });
    }
    this.POForm.valueChanges.subscribe((changedObj: any) => {
      this.dropDownValidityCheck()
    });
    this.getProductList();

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
    let selectedPartnerContactObj = this.partnerContact.find(x => x.iPartnerContactID == this.purchaseOrderData.iPartnerContactID);
    if (selectedPartnerContactObj !== undefined) {
      this.selectedPartnerContact = selectedPartnerContactObj;
    }

    // Currency Dropdown
    let selectedCurrencyObj = this.currencyData.find(x => x.iKVID == this.purchaseOrderData.iKVID);
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
    if (this.selectedTax.length == 1) {
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

}
