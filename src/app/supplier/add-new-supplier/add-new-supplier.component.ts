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
import { SupplierAddress } from 'src/app/model/supplier-address.model';
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
import { SupplierCategoryMapping } from 'src/app/model/supplier-category-mapping.model';
import { companyBankMaster } from 'src/app/model/companyBank.model';
import { config } from 'src/config';

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
  producerData;
  parentCatData;
  selectedparentCategory;
  iPCID: number;
  iProducerID: number;
  productData;
  selectedProducer;
  selectedProduct;
  legalEntityData;
  suppCatData;
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
  sourceCategory: SupplierCategoryMapping[] = [];
  targetCategory: SupplierCategoryMapping[] = [];
  bankData: companyBankMaster[];
  selectedSuppCat;
  index: number = 0;
  supplierSubmitFlag: number = 0;
  constructor(private breadcrumbService: BreadcrumbService,
    private dialogService: DialogService,
    private httpService: ApiService,
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
    // this.supId = +this.route.snapshot.params['iSupID'];
    // localStorage.setItem('iSupID', this.supId);
    if (this.route.snapshot.params['iSupID']) {
      this.supId = +this.route.snapshot.params['iSupID'];
      localStorage.setItem('iSupID', this.supId)
    }
    else {
      this.supId = +localStorage.getItem("iSupID");
    }
    if (this.supId) {
      this.isEdit = true
      this.tabDisabled = false
      var dataToSendEdit = {
        "iRequestID": 2175,
        "iSupID": this.supId
      }
      this.httpService.getDropDownData(dataToSendEdit).then(response => {
        this.supData = new SuppMaster(response[0]);
        this.addSupplierForm = this.createControl(this.supData);
        Promise.all([this.getStatusDrpDwn(), this.getLegalEntityDrpDwn(), this.getSuppCatDrpDwn(), this.getParentCatData()]).then(values => {
          this.setDropDownVal()
        });
        this.getSupplierAddressList();
        this.getFileType();
        this.gstList();
        this.showContact();
        this.bankSelectData();
        this.showAttachment();
        //this.getCategoryMappingDataSource();
        //this.getCategoryMappingDataTarget();
        // if (this.targetCategory.length) {
        //   this.getCategoryMappingDataTarget();
        // }
      });
    }
    else {
      this.isEdit = false
      Promise.all([this.getStatusDrpDwn(), this.getLegalEntityDrpDwn(), this.getSuppCatDrpDwn(), this.getParentCatData()]).then(values => {
      });
    }
  }

  //Function for Address list 
  getSupplierAddressList() {
    const supplierAddressAPI = {
      "iRequestID": 2184,
      "iSupID": this.supId
    }
    this.httpService.callPostApi(supplierAddressAPI).subscribe(
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
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var deleteAddressAPI = {
          "iRequestID": 2183,
          "iSupAddID": supplierID
        }
        this.httpService.callPostApi(deleteAddressAPI).subscribe(
          data => {
            this.getSupplierAddressList();
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
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
    this.selectedSuppCat = { iSupCatID: "", sSupCName: "Select Supplier Category" }
    this.selectedProducer = { iProducerID: "", sProducerName: "Select Producer" }
    this.selectedProduct = { iPrdID: "", sPrdName: "Select Product" }
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

    let selectedSuppCatObj = this.suppCatData.find(x => x.iSupCatID == this.supData.iSupCatID);
    if (selectedSuppCatObj !== undefined) {
      this.selectedSuppCat = selectedSuppCatObj;
    }

    // let selectedProducerObj = this.producerData.find(x => x.iProducerID == this.supData.iProducerID);
    // if (selectedProducerObj !== undefined) {
    //   this.selectedProducer = selectedProducerObj;
    // }

    // let selectedProductObj = this.productData.find(x => x.iPrdID == this.supData.iPrdID);
    // if (selectedProductObj !== undefined) {
    //   this.selectedProduct = selectedProductObj;
    // }
  }

  //code for supplier status dropdown data
  getStatusDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2071,
        "sKVName": "Status"
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
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
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.legalEntityData = response
        this.legalEntityData.splice(0, 0, { iKVID: "", sKVValue: "Select Legal Entity" })
        this.selectedlegalEntity = { iKVID: "", sKVValue: "Select Legal Entity" }
        resolve(this.legalEntityData)
      });
    })
  }

  //code for supplier Category dropdown data
  getSuppCatDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2154
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.suppCatData = response
        this.suppCatData.splice(0, 0, { iSupCatID: "", sSupCName: "Select Supplier Category" })
        this.selectedlegalEntity = { iSupCatID: "", sSupCName: "Select Supplier Category" }
        resolve(this.suppCatData)
      });
    })
  }

  //code for parent Category dropdown
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

  setPcId(event) {
    this.iPCID = event.value.iPCID
    this.childCategoryData();
    this.producerData = null;
  }

  //code for child product dropdown data
  childCategoryData() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2117,
        "iPCID": this.iPCID
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.productData = response
        this.productData.splice(0, 0, { iPCID: "", sPCName: "Select Product" })
        this.selectedProduct = { iPCID: "", sPCName: "Select Product" }
        resolve(this.productData)
      });
    })
  }

  onProductChange(event) {
    this.iPCID = event.value.iPCID
    this.getProducerDrpDwn();
  }

  //code for producer dropdown
  getProducerDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2224,
        "iPCID": this.iPCID
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.producerData = response
        this.producerData.splice(0, 0, { iProducerID: "", sProducerName: "Select Product" })
        this.selectedProducer = { iProducerID: "", sProducerName: "Select Product" }
        resolve(this.productData)
      });
    })
  }

  onProducerChange(event) {
    this.iPCID = event.value.iPCID;
    this.iProducerID = event.value.iProducerID;
    this.getCategoryMappingDataSource();
    this.getCategoryMappingDataTarget();
  };

  //code for unmapped list data
  getCategoryMappingDataSource() {
    const supplierCategoryMappingAPI1 = {
      "iRequestID": 2225,
      "iPCID": this.iPCID,
      "iProducerID": this.iProducerID,
      "iSupID": this.supId
    }
    this.httpService.callPostApi(supplierCategoryMappingAPI1).subscribe(
      data => {
        this.sourceCategory = data.body;
        console.log(this.sourceCategory)
      },
      error => { console.log(error) }
    )
  }

  getFileType() {
    return new Promise((resolve, reject) => {
      var dataToSend = {
        "iRequestID": 2261
      }
      this.httpService.getDropDownData(dataToSend).then(response => {
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
      iStatusID: [supData.iStatusID, Validators.required],
      sSupCName: [supData.iSupCatID, Validators.required]
    });
    return this.addSupplierForm;
  }

  //code for show all gst list 
  gstList() {
    const sup_gst_data = {
      "iRequestID": 2203,
      "iSupID": this.supId
    }
    this.httpService.callPostApi(sup_gst_data).subscribe(
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
    if (this.supplierSubmitFlag == 0) {
      this.supplierSubmitFlag = 1;
      let supp_name = this.addSupplierForm.controls["sSupName"].value;
      let website_name = this.addSupplierForm.controls["sWebsite"].value;
      let pan_no = this.addSupplierForm.controls["sPAN"].value;
      let short_code = this.addSupplierForm.controls["sShortCode"].value;
      let telephoneno_1 = this.addSupplierForm.controls["sTelNo1"].value;
      let telephoneno_2 = this.addSupplierForm.controls["sTelNo2"].value;
      let fax_no = this.addSupplierForm.controls["sFaxNo"].value;
      let formData = this.addSupplierForm.getRawValue();
      const add_supplier_data = {
        "iRequestID": 2171,
        "sSupName": supp_name,
        "sWebsite": website_name,
        "iLegalEntityID": formData.iLegalEntityID.iKVID,
        "sPAN": pan_no,
        "sShortCode": short_code,
        "sTelNo1": telephoneno_1,
        "sTelNo2": telephoneno_2,
        "sFaxNo": fax_no,
        "iSupCatID": formData.sSupCName.iSupCatID
      }
      this.httpService.callPostApi(add_supplier_data).subscribe(
        data => {
          if (data.headers.get('StatusCode') == 200) {
            this.supId = data.body[0].isupId;
            localStorage.setItem('iSupID', this.supId)
            this.getSupplierAddressList();
            this.getFileType();
            this.gstList();
            this.showContact();
            this.bankSelectData();
            this.showAttachment();
            // this.getCategoryMappingDataSource();
            //this.getCategoryMappingDataTarget();
            this.tabDisabled = false
            let supp_name = "Supplier " + formData.supp_name + " has been added successfully"
            this.toastService.displayApiMessage(supp_name, data.headers.get('StatusCode'));
            this.index = 1;
            this.isEdit = true;
          }
          else {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          }
          this.supplierSubmitFlag = 0;
        },
        error => console.log(error)
      );
    }

  }

  //code for edit supplier data
  editSupplier() {
    let supp_name_edit = this.addSupplierForm.controls["sSupName"].value;
    let website_name_edit = this.addSupplierForm.controls["sWebsite"].value;
    let formData = this.addSupplierForm.getRawValue();
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
      "iLegalEntityID": formData.iLegalEntityID.iKVID,
      "sPAN": pan_no_edit,
      "sShortCode": short_code_edit,
      "sTelNo1": telephoneno_1_edit,
      "sTelNo2": telephoneno_2_edit,
      "sFaxNo": fax_no_edit,
      "iSupID": this.supId,
      "iStatusID": status_id.iStatusID.iKVID,
      "iSupCatID": formData.sSupCName.iSupCatID
    }
    this.httpService.callPostApi(edit_supplier_data).subscribe(
      data => {
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
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
      header: 'Edit GST',
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
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let loc_id = +gst.iSSGID;
        let delete_data_api = {
          "iRequestID": 2205,
          "iSSGID": loc_id,
          "iSupID": this.supId
        };
        this.httpService.callPostApi(delete_data_api).subscribe(
          (data) => {
            this.gstList();
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
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

  deleteAttFile(attachment) {
    this.confirmationService.confirm({
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID": 1113,
          "iFileID": attachment.iFileID
        }
        this.httpService.callPostApi(dataToSendDelete).subscribe(
          (data) => {
            this.showAttachment();
            this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
          },
          (error) => console.log(error)
        );
      },
    });
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
      "iRequestID": 2194,
      "iSupID": this.supId
    }
    this.httpService.callPostApi(dataToSend).subscribe(
      (data) => {
        this.contact = data.body;
      },
      (error) => console.log(error)
    );
  }

  editContact(iSupContactID) {
    const ref = this.dialogService.open(ContactComponent, {
      data: {
        iSupContactID: iSupContactID
      },
      header: 'Edit Contact',
      width: '70%'
    });
    ref.onClose.subscribe((success: any) => {
      if (success) {
        this.showContact();
      }
    });
  }

  deleteContact(iSupContactID) {
    this.confirmationService.confirm({
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID": 2193,
          "iSupContactID": iSupContactID
        }
        this.httpService.callPostApi(dataToSendDelete).subscribe(
          (data) => {
            this.showContact();
            this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
          },
          (error) => console.log(error)
        );
      },
    });
  }

  // Function for Bank table data
  bankSelectData() {
    const selectBank_data = {
      "iRequestID": 2214,
      "iSupID": this.supId
    };
    this.httpService.callPostApi(selectBank_data).subscribe(
      (data) => {
        this.bankData = data.body;
      },
      (error) => console.log(error)
    );
  }

  //Function to open dialog box to Add bank details
  openDialogForBank() {
    const ref = this.dialogService.open(BankComponent, {
      data: {},
      header: "Add New Bank",
      width: "50%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.bankSelectData();
      }
    });
  }

  // Function to open dialog box to Update bank details
  updateBank(bank) {
    const ref = this.dialogService.open(BankComponent, {
      data: bank,
      header: "Edit Bank",
      width: "50%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.bankSelectData();
      }
    });
  }

  // Function to delete Bank details
  deleteBank(bank) {
    let bank_id = bank.iBankID;
    this.confirmationService.confirm({
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deleteBank_data = {
          "iRequestID": 2213,
          "iSupID": this.supId,
          "iBankID": bank_id
        };
        this.httpService.callPostApi(deleteBank_data).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.bankSelectData();
          },
          (error) => console.log(error)
        );
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
    ref.onClose.subscribe((success: any) => {
      if (success) {
        this.showContact();
      }
    });
  }

  //category mapping starts
  // getCategoryMappingDataSource() {
  //   let sup_by_id = +this.route.snapshot.params['iSupID'];
  //   const supplierCategoryMappingAPI = {
  //     "iRequestID": 2221,
  //     "iSupID": sup_by_id
  //   }
  //   this.httpService.callPostApi(supplierCategoryMappingAPI).subscribe(
  //     data => { this.sourceCategory = data.body; },
  //     error => { console.log(error) }
  //   )
  // }
  // category mapping ends

  //category mapping starts
  getCategoryMappingDataTarget() {
    //let sup_by_id = +this.route.snapshot.params['iSupID'];
    const supplierCategoryMappingAPI1 = {
      "iRequestID": 2226,
      "iSupID": this.supId,
      "iPCID": this.selectedProducer.iPCID,
      "iProducerID": this.selectedProducer.iProducerID
    }
    this.httpService.callPostApi(supplierCategoryMappingAPI1).subscribe(
      data => {
        this.targetCategory = data.body;
        console.log(this.targetCategory)
      },
      error => { console.log(error) }
    )
  }
  // category mapping ends

  // add category mapping starts
  addCategoryMappingData() {
    let temp_ids_arr = [];
    this.targetCategory.map(
      (val) => {
        temp_ids_arr.push(val.iPrdID);
      }
    )
    let string_ids = temp_ids_arr.toString();
    //let sup_by_id = +this.route.snapshot.params['iSupID'];
    const supplierCategoryMappingAddAPI = {
      "iRequestID": 2222,
      "iSupID": this.supId,
      "iPCID": this.selectedProduct.iPCID,
      "iProducerID": this.selectedProducer.iProducerID,
      "sPrdID": string_ids
    }
    // console.log(supplierCategoryMappingAddAPI)
    this.httpService.callPostApi(supplierCategoryMappingAddAPI).subscribe(
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