/**
Template Name: HealthNow
Author: Priyanka, Neelam, Rajnish and Shibin
Created Date: 
File: add-new-supplier.component
**/

import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { Message } from 'primeng/api';
import { SupplierRoutingModule } from '../supplier-routing.module';
import { AddressComponent } from '../address/address.component';
import { ContactComponent } from '../contact/contact.component';
import { BankComponent } from '../bank/bank.component';
import { GstComponent } from '../gst/gst.component';
import { SupplierAddress } from 'src/app/models/supplier-address.model';
import { ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { seldepData } from 'src/app/model/selDepStatus';
import { ToastService } from 'src/app/services/toast.service';
import { supplierList } from 'src/app/model/supplierlist';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { gstData } from 'src/app/model/gst';
import { SuppMaster } from 'src/app/model/supplier.model';
import { APIService } from '../../services/apieservice';
import { SupplierCategoryMapping } from 'src/app/models/supplier-category-mapping.model';
import { LoginService } from '../../../app/services/login.service'
import { resolve } from 'dns';

@Component({
  selector: 'app-add-new-supplier',
  templateUrl: './add-new-supplier.component.html',
  styleUrls: ['./add-new-supplier.component.css']
})
export class AddNewSupplierComponent implements OnInit {

  selectedstatus;
  selectedlegalEntity;
  selSuppCategory: any[];
  statusData;
  legalEntityData;
  isEdit: boolean = false
  public addSupplierForm: FormGroup;
  supData: SuppMaster;
  items: MenuItem[];
  supplierAdressData: SupplierAddress;
  tabDisabled: boolean = true;
  bank: any[];
  contact: any[]
  gst: gstData[];
  attachment: any[];
  supId;
  returnSupId;
  selectedFileType;
  fileTypeData;
  uploadedFiles: any[] = [];
  sourceCategory: SupplierCategoryMapping[];
  targetCategory: SupplierCategoryMapping[];

  constructor(private breadcrumbService: BreadcrumbService,
    private dialogService: DialogService,
    private apiService: ApiService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService, private _apiService: APIService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Supplier', routerLink: ['/supplier'] }
    ]);
  }

  ngOnInit(): void {
    this.defaultDropDwnValue()
    this.supData = new SuppMaster();
    this.addSupplierForm = this.createControl(this.supData);
    this.supId = +this.route.snapshot.params['iSupID'];
    localStorage.setItem('iSupID', this.supId)
    if (!isNaN(this.supId)) {
      this.isEdit = true
      this.tabDisabled = false
      var dataToSendEdit = {
        "iRequestID": 2175,
        "iSupID": this.supId
      }
      this.apiService.getDropDownData(dataToSendEdit).then(response => {
        this.supData = new SuppMaster(response[0]);
        this.addSupplierForm = this.createControl(this.supData);
        Promise.all([this.getStatusDrpDwn(), this.getLegalEntityDrpDwn()]).then(values => {
          this.setDropDownVal()
        });
        this.getSupplierAddressList();
      });
    }
    else {
      this.isEdit = false
      Promise.all([this.getStatusDrpDwn(), this.getLegalEntityDrpDwn()]).then(values => {
      });
    }
    this.getFileType();
    this.gstList();
    this.showContact();
    this.showBank();
    this.showAttachment();
    this.getCategoryMappingDataSource();
    this.getCategoryMappingDataTarget();
  }

  //Function for Address list 
  getSupplierAddressList() {
    const supplierAddressAPI = {
      "iRequestID": 2184,
      "iSupID": this.supId
    }
    this.apiService.callPostApi(supplierAddressAPI).subscribe(
      data => { this.supplierAdressData = data.body },
      error => { console.log(error) }
    )
  }

  // Daialogue box to add address
  openDialogForaddAddress() {
    const ref = this.dialogService.open(AddressComponent, {
      data: {},
      header: 'Add New Address',
      width: '80%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getSupplierAddressList();
      }
    });
  }

  // Daialogue box to edit address
  editSupplierAddress(supplierID) {
    const ref = this.dialogService.open(AddressComponent, {
      data: {
        "iSupAddID": supplierID
      },
      header: 'Edit Address',
      width: '80%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getSupplierAddressList();
      }
    });
  }

  // Open Dialog To Delete address
  deleteSupplierAddress(supplierID) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete this Record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var deleteAddressAPI = {
          "iRequestID": 2183,
          "iSupAddID": supplierID
        }
        this.apiService.callPostApi(deleteAddressAPI).subscribe(
          data => {
            this.getSupplierAddressList();
            this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
          },
          error => { console.log(error) }
        );
      }
    });
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  uploadFile() {
    // alert(JSON.stringify(this.uploadedFiles))
    var dataToSend = {
      "iRequestID": 1111,
      "iProcessTranID": this.supId,
      "iProcessID": 2,
      "iDocTypeID": this.selectedFileType.iDocTypeID
    }
    this._apiService.postFile(this.uploadedFiles, dataToSend).subscribe(data => {
      this.showAttachment();
    }, error => {
      console.log(error);
    });
  }

  //code for default dropdown data show
  defaultDropDwnValue() {
    this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
    this.selectedlegalEntity = { iKVID: "", sKVValue: "Select Legal Entity" }
  }

  // code for set dropdown data
  setDropDownVal() {
    let selectedStatusObj = this.statusData.find(x => x.iKVID == this.supData.iStatusID);

    if (selectedStatusObj !== undefined) {
      this.selectedstatus = selectedStatusObj;
    }
    let selectedlegalEntityObj = this.legalEntityData.find(x => x.iKVID == this.supData.iLegalEntityID);

    if (selectedlegalEntityObj !== undefined) {
      this.selectedlegalEntity = selectedlegalEntityObj;
    }
  }

  //code for supplier status dropdown data
  getStatusDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2071,
        "sKVName": "Status"
      }
      this.apiService.getDropDownData(dataToSend4).then(response => {
        this.statusData = response
        this.statusData.splice(0, 0, { iKVID: "", sKVValue: "Select Status" })
        this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
        resolve(this.statusData)
      });
    })
  }

  //code for supplier legalEntity dropdown data
  getLegalEntityDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2071,
        "sKVName": "LegalEntity"
      }
      this.apiService.getDropDownData(dataToSend4).then(response => {
        this.legalEntityData = response
        this.legalEntityData.splice(0, 0, { iKVID: "", sKVValue: "Select Legal Entity" })
        this.selectedlegalEntity = { iKVID: "", sKVValue: "Select Legal Entity" }
        resolve(this.legalEntityData)
      });
    })
  }

  getFileType() {
    return new Promise((resolve, reject) => {
      var dataToSend = {
        "iRequestID": 2261
      }
      this.apiService.getDropDownData(dataToSend).then(response => {
        console.log("Response for File Type ", response)
        this.fileTypeData = response
        this.fileTypeData.splice(0, 0, { iDocTypeID: "", sDocTypeName: "Select File Type" })
        this.selectedFileType = { iDocTypeID: "", sDocTypeName: "Select File Type" }
        resolve(this.fileTypeData)
      });
    })
  }

  //code for implement formBuilder and validation
  createControl(supData?: SuppMaster): FormGroup {
    this.addSupplierForm = this.fb.group({
      sSupName: [supData.sSupName, [Validators.required]],
      iCreatedBy: [supData.iCreatedBy],
      iLegalEntityID: [supData.iLegalEntityID, [Validators.required]],
      sWebsite: [supData.sWebsite, [Validators.required]],
      sTelNo1: [supData.sTelNo1, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(13)]],
      sTelNo2: [supData.sTelNo2, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(13)]],
      iSupID: [supData.iSupID],
      sCreatedDate: [supData.sCreatedDate],
      sFaxNo: [supData.sFaxNo, [Validators.required]],
      sShortCode: [supData.sShortCode, [Validators.required]],
      sPAN: [supData.sPAN, [Validators.required]],
      sStatusName: [supData.sStatusName],
      iStatusID: [supData.iStatusID, Validators.required]
    });
    return this.addSupplierForm;
  }

  //code for show all gst list 
  gstList() {
    const sup_gst_data = {
      "iRequestID": 2203,
      "iSupID": this.supId
    }
    this.apiService.callPostApi(sup_gst_data).subscribe(
      (data) => {
        this.gst = data.body;
      },
      (error) => console.log(error)
    );
  }

  //code for dropdown validity check
  dropDownValidityCheck() {
    if (this.selectedstatus.iKVID == '') {
      return true
    } else if (this.selectedlegalEntity.iKVID == '') {
      return true
    }
    else {
      return false
    }
  }

  //code for add new supplier data
  addSupplier() {
    let supp_name = this.addSupplierForm.controls["sSupName"].value;
    let website_name = this.addSupplierForm.controls["sWebsite"].value;
    let pan_no = this.addSupplierForm.controls["sPAN"].value;
    let short_code = this.addSupplierForm.controls["sShortCode"].value;
    let telephoneno_1 = this.addSupplierForm.controls["sTelNo1"].value;
    let telephoneno_2 = this.addSupplierForm.controls["sTelNo2"].value;
    let fax_no = this.addSupplierForm.controls["sFaxNo"].value;
    let legal_id = this.addSupplierForm.getRawValue();
    const add_supplier_data = {
      "iRequestID": 2171,
      "sSupName": supp_name,
      "sWebsite": website_name,
      "iLegalEntityID": legal_id.iLegalEntityID.iKVID,
      "sPAN": pan_no,
      "sShortCode": short_code,
      "sTelNo1": telephoneno_1,
      "sTelNo2": telephoneno_2,
      "sFaxNo": fax_no
    }
    this.apiService.callPostApi(add_supplier_data).subscribe(
      data => {
        this.supId = data.body[0].isupId;
        localStorage.setItem('iSupID', this.supId)
        this.tabDisabled = false
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
      },
      error => console.log(error)
    );
  }

  //code for edit supplier data
  editSupplier() {
    let supp_name_edit = this.addSupplierForm.controls["sSupName"].value;
    let website_name_edit = this.addSupplierForm.controls["sWebsite"].value;
    let legal_id_edit = this.addSupplierForm.getRawValue();
    let pan_no_edit = this.addSupplierForm.controls["sPAN"].value;
    let short_code_edit = this.addSupplierForm.controls["sShortCode"].value;
    let telephoneno_1_edit = this.addSupplierForm.controls["sTelNo1"].value;
    let telephoneno_2_edit = this.addSupplierForm.controls["sTelNo2"].value;
    let fax_no_edit = this.addSupplierForm.controls["sFaxNo"].value;
    let status_id = this.addSupplierForm.getRawValue();
    const edit_supplier_data = {
      "iRequestID": 2172,
      "sSupName": supp_name_edit,
      "sWebsite": website_name_edit,
      "iLegalEntityID": legal_id_edit.iLegalEntityID.iKVID,
      "sPAN": pan_no_edit,
      "sShortCode": short_code_edit,
      "sTelNo1": telephoneno_1_edit,
      "sTelNo2": telephoneno_2_edit,
      "sFaxNo": fax_no_edit,
      "iSupID": this.supId,
      "iStatusID": status_id.iStatusID.iKVID,
    }
    this.apiService.callPostApi(edit_supplier_data).subscribe(
      data => {
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
      },
      error => console.log(error)
    );
  }

  // code for open dialog for add gst
  openDialogForGST() {
    const ref = this.dialogService.open(GstComponent, {
      data: {},
      header: 'Add New GST',
      width: '28%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.gstList();
      }
    });
  }

  // code for open dialog for edit gst
  editDialogForGST(gst) {
    const ref = this.dialogService.open(GstComponent, {
      data: gst,
      header: 'Add New GST',
      width: '28%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.gstList();
      }
    });
  }

  //code for delete gst data
  deletesupgst(gst) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let loc_id = +gst.iLocID;
        let delete_data_api = {
          "iRequestID": 2205,
          "iLocID": loc_id,
          "iSupID": this.supId
        };
        this.apiService.callPostApi(delete_data_api).subscribe(
          (data) => {
            this.gstList();
            this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
          },
          (error) => console.log(error)
        );
      }
    });
  }

  downloadFile(attachment: any) {
    var dataToSend = {
      "iRequestID": "1112",
      "sActualFileName": attachment.sActualName,
      "sSystemFileName": attachment.sSystemName
    }
    this._apiService.downloadAPI(dataToSend)
  }

  showAttachment() {
    var dataToSend = {
      "iRequestID": 1112,
      "iProcessTranID": parseInt(this.supId),
      "iProcessID": 2
    }
    this._apiService.getDetails(dataToSend).then(response => {
      console.log("Response for attachment ", response)
      this.attachment = response
    });
  }

  showContact() {
    var dataToSend = {
      "iRequestID": 2194
    }
    this._apiService.getDetails(dataToSend).then(response => {
      console.log("Response for Contact ", response)
      this.contact = response
    });
  }

  editContact(iSupContactID) {
    const ref = this.dialogService.open(ContactComponent, {
      data: {
        iSupContactID: iSupContactID
      },
      header: 'Edit Contact',
      width: '70%'
    });
    ref.onClose.subscribe((message: any) => {
      if (message.StatusCode == "200") {
        this.toastService.addSingle("success", message.StatusMessage, "");
      }
      else {
        this.toastService.addSingle("error", message.StatusMessage, "");
      }
      this.showContact()
    });
  }

  deleteContact(iSupContactID) {
    // alert("hi")
    // return false;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID": 2193,
          "iSupContactID": iSupContactID
        }
        this._apiService.getDetails(dataToSendDelete).then(response => {
          console.log("Response for Brand Delete ", response)
          this.toastService.addSingle("info", response.headers.get('StatusMessage'), "");
          this.showContact();
        });
      },
      reject: () => { }
    });
  }

  showBank() {
    var dataToSend = {
      "iRequestID": 2214,
      "iSupID": this.supId
    }
    this._apiService.getDetails(dataToSend).then(response => {
      console.log("Response for Bank ", response)
      this.bank = response
    });
  }

  editBank(iBankID) {
    const ref = this.dialogService.open(BankComponent, {
      data: {
        iBankID: iBankID
      },
      header: 'Edit Contact',
      width: '50%'
    });
    ref.onClose.subscribe((message: any) => {
      if (message.StatusCode == "200") {
        this.toastService.addSingle("success", message.StatusMessage, "");
      }
      else {
        this.toastService.addSingle("error", message.StatusMessage, "");
      }
      this.showBank()
    });
  }

  deleteBank(iBankID) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID": 2213,
          "iSupID": this.supId,
          "iBankID": iBankID
        }
        this._apiService.getDetails(dataToSendDelete).then(response => {
          console.log("Response for Brand Delete ", response)
          this.toastService.addSingle("info", response.headers.get('StatusMessage'), "");
          this.showBank();
        });
      },
      reject: () => { }
    });
  }


  openDialogForaddContact() {
    const ref = this.dialogService.open(ContactComponent, {
      data: {
      },
      header: 'Add New Contact',
      width: '70%'
    });
    ref.onClose.subscribe((message: any) => {
      if (message.StatusCode == "200") {
        this.toastService.addSingle("success", message.StatusMessage, "");
      }
      else {
        this.toastService.addSingle("error", message.StatusMessage, "");
      }
      this.showContact()
    });
  }

  openDialogForBank() {
    const ref = this.dialogService.open(BankComponent, {
      data: {
      },
      header: 'Add New Bank',
      width: '50%'
    });
    ref.onClose.subscribe((message: any) => {
      // alert(JSON.stringify(message))
      if (message.StatusCode == "200") {
        this.toastService.addSingle("success", message.StatusMessage, "");
      }
      else {
        this.toastService.addSingle("error", message.StatusMessage, "");
      }
      this.showBank();
    });
  }

  //category mapping starts
  getCategoryMappingDataSource() {
    let sup_by_id = +this.route.snapshot.params['iSupID'];
    const supplierCategoryMappingAPI = {
      "iRequestID": 2221,
      "iSupID": sup_by_id
    }
    this.apiService.callPostApi(supplierCategoryMappingAPI).subscribe(
      data => { this.sourceCategory = data.body; },
      error => { console.log(error) }
    )
  }
  // category mapping ends

  //category mapping starts
  getCategoryMappingDataTarget() {
    let sup_by_id = +this.route.snapshot.params['iSupID'];
    const supplierCategoryMappingAPI1 = {
      "iRequestID": 2223,
      "iSupID": sup_by_id
    }
    this.apiService.callPostApi(supplierCategoryMappingAPI1).subscribe(
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
        temp_ids_arr.push(val.iSupCatID);
      }
    )
    let string_ids = temp_ids_arr.toString();
    let sup_by_id = +this.route.snapshot.params['iSupID'];
    const supplierCategoryMappingAddAPI = {
      "iRequestID": 2222,
      "iSupID": sup_by_id,
      "sSupCatMap": string_ids
    }
    this.apiService.callPostApi(supplierCategoryMappingAddAPI).subscribe(
      data => {
        if (this.targetCategory)
          this.toastService.addSingle("success", "Categories mapped Successfully", "");
        else
          this.toastService.addSingle("warning", "Select atleast 1 Category", "");
      },
      error => { console.log(error) }
    )
  }
  // add category mapping ends
}