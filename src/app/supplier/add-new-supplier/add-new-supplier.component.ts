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
import {APIService} from '../../services/apieservice';

import {LoginService} from '../../../app/services/login.service'

@Component({
  selector: 'app-add-new-supplier',
  templateUrl: './add-new-supplier.component.html',
  styleUrls: ['./add-new-supplier.component.css']
})
export class AddNewSupplierComponent implements OnInit {

  selectedstatus;
  selSuppCategory: any[];
  statusData;
  isEdit: boolean = false
  public addSupplierForm: FormGroup;
  supData: SuppMaster;

  items: MenuItem[];

  supplierAdressData : SupplierAddress;


  bank: any[];
  contact : any[]

  gst: gstData[];

  attachment: any[];

  supId;

  selectedFileType;
  fileTypeData;

  uploadedFiles: any[] = [];

  sourceCategory;
  targetCategory;
  addCategoryMappingData;

  constructor(private breadcrumbService: BreadcrumbService,
     private dialogService: DialogService,
    private apiService: ApiService,
     private toastService: ToastService,
    private fb: FormBuilder,
     private route: ActivatedRoute,
      private confirmationService: ConfirmationService,private _apiService:APIService,private loginService:LoginService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Supplier', routerLink: ['/app/supplier'] }
    ]);
  }

  ngOnInit(): void {

    var isBrowserClosed = localStorage.getItem('isBrowserClosed')
    if(isBrowserClosed || isBrowserClosed==null)
    {
      this.loginService.getAccess().then(response1 => {

        console.log("Response of Access ",response1)
    
    
      }).catch(error=>{
        // console.log(JSON.stringify(error))
      })
    }

this.getFileType();
this.gstList();
 //new code added 
 this.defaultDropDwnValue()

 this.supData = new SuppMaster();
 this.addSupplierForm = this.createControl(this.supData);

 this.supId = this.route.snapshot.params['iSupID'];
 if (this.supId != null) {
   this.isEdit = true
   let sup_by_id = +this.route.snapshot.params['iSupID'];

   var dataToSendEdit = {
     "iRequestID": 2175,
     "iSupID": sup_by_id
   }

   this.apiService.getDropDownData(dataToSendEdit).then(response => {

     console.log("Response of Edit Brand ", response)

     this.supData = new SuppMaster(response[0]);
     this.addSupplierForm = this.createControl(this.supData);

     Promise.all([this.getStatusDrpDwn()]).then(values => {
       console.log(values);
       this.setDropDownVal()
     });
     this.getSupplierAddressList();
   });

 }
 else {
   this.isEdit = false

   Promise.all([this.getStatusDrpDwn()]).then(values => {
     console.log(values);
   });
 }

//  this.gstList();
 //end 


 this.showContact();
 this.showBank();
 this.showAttachment();

  }
//Address list starts
  getSupplierAddressList(){
    let sup_by_id = +this.route.snapshot.params['iSupID'];
    const supplierAddressAPI = {
      "iRequestID": 2184,
      "iSupID":sup_by_id
    }
    this.apiService.callPostApi(supplierAddressAPI).subscribe(
      data => { this.supplierAdressData = data},
      error => {console.log(error)}
    )
  }
  // address list ends

  // Daialogue to add address
    openDialogForaddAddress() {
      const ref = this.dialogService.open( AddressComponent , {
        data: {
        },
        header: 'Add New Address',
        width: '80%'
      });
      localStorage.setItem('iSupID', this.route.snapshot.params['iSupID']);
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          this.getSupplierAddressList();
           this.toastService.addSingle("success", "Record Added successfully", "");
        }
      });

    }

    // Daialogue to edit address
    editSupplierAddress(supplierID) {
      const ref = this.dialogService.open(AddressComponent, {
        data: {
          "iSupAddID": supplierID
        },
        header: 'Edit Address',
        width: '80%'
      });
      localStorage.setItem('iSupID', this.route.snapshot.params['iSupID']);
      ref.onClose.subscribe((success: any) => {
        // alert(success)
        if(success)
        {
          this.getSupplierAddressList();
          this.toastService.addSingle("success", "Updated Successfully", "");
        }
      });
    }

     // Open Dialog To Delete address
     deleteSupplierAddress(supplierID) {
    console.log(supplierID);
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete this Record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var deleteAddressAPI = {
          "iRequestID": 2183,
          "iSupAddID":supplierID
        }

        this.apiService.callPostApi(deleteAddressAPI).subscribe(
          data => {
            this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
            this.getSupplierAddressList();
          },
          error => { console.log(error)}
        );
      }
    });
  }
    
    
  onUpload(event) {
    alert("hi")
    for (const file of event.files) {
        this.uploadedFiles.push(file);
      }

}

uploadFile()
{
  alert(JSON.stringify(this.uploadedFiles))
  var dataToSend ={
    "iRequestID": 1111,
    "iProcessTranID":this.supId,
    "iProcessID":2,
    "iDocTypeID":this.selectedFileType.iDocTypeID
}
  this._apiService.postFile(this.uploadedFiles,dataToSend).subscribe(data => {
    alert('Success '+data);
    this.showAttachment();
  }, error => {
    console.log(error);
  });
}

  //new coded added

  defaultDropDwnValue() {
    this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
  }

  // Status Dropdown Select
  setDropDownVal() {
    let selectedStatusObj = this.statusData.find(x => x.iKVID == this.supData.iStatusID);

    if (selectedStatusObj !== undefined) {
      this.selectedstatus = selectedStatusObj;
    }


  }


  getStatusDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2071,
        "sKVName": "Status"
      }

      this.apiService.getDropDownData(dataToSend4).then(response => {
        console.log("Response for Status ", response)
        this.statusData = response
        this.statusData.splice(0, 0, { iKVID: "", sKVValue: "Select Status" })
        this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }

        resolve(this.statusData)

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

  createControl(supData?: SuppMaster): FormGroup {

    this.addSupplierForm = this.fb.group({
      sSupName: [supData.sSupName, [Validators.required]],
      iCreatedBy: [supData.iCreatedBy],
      iLegalEntityID: [supData.iLegalEntityID, [Validators.required]],
      sWebsite: [supData.sWebsite, [Validators.required]],
      sTelNo1: [supData.sTelNo1, [Validators.required]],
      sTelNo2: [supData.sTelNo2, [Validators.required]],
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

  //end 


  //gst list 
  gstList() {
    let sup_id_list = +this.route.snapshot.params['iSupID'];

    const sup_gst_data = {

      "iRequestID": 2203,
      "iSupID": sup_id_list

    }
    this.apiService.callPostApi(sup_gst_data).subscribe(
      (data) => {
        this.gst = data;
      },
      (error) => console.log(error)
    );
  }

  dropDownValidityCheck() {
    if (this.selectedstatus.iKVID == '') {
      return true
    }
    else {
      return false
    }
  }

  addSupplier() {
    let supp_name = this.addSupplierForm.controls["sSupName"].value;
    let website_name = this.addSupplierForm.controls["sWebsite"].value;
    let entity_id = +this.addSupplierForm.controls["iLegalEntityID"].value;
    let pan_no = this.addSupplierForm.controls["sPAN"].value;
    let short_code = this.addSupplierForm.controls["sShortCode"].value;
    let telephoneno_1 = this.addSupplierForm.controls["sTelNo1"].value;
    let telephoneno_2 = this.addSupplierForm.controls["sTelNo2"].value;
    let fax_no = this.addSupplierForm.controls["sFaxNo"].value;

    const add_supplier_data = {
      "iRequestID": 2171,
      "sSupName": supp_name,
      "sWebsite": website_name,
      "iLegalEntityID": entity_id,
      "sPAN": pan_no,
      "sShortCode": short_code,
      "sTelNo1": telephoneno_1,
      "sTelNo2": telephoneno_2,
      "sFaxNo": fax_no
    }
    console.log(add_supplier_data);
    this.apiService.callPostApi(add_supplier_data).subscribe(
      data => {
        console.log(data);
        this.toastService.addSingle("success", "Record Added Successfully", "");

      },
      error => console.log(error)
    );

    this.addSupplierForm.reset();

  }

  editSupplier() {
    let supp_name_edit = this.addSupplierForm.controls["sSupName"].value;
    let website_name_edit = this.addSupplierForm.controls["sWebsite"].value;
    let entity_id_edit = +this.addSupplierForm.controls["iLegalEntityID"].value;
    let pan_no_edit = this.addSupplierForm.controls["sPAN"].value;
    let short_code_edit = this.addSupplierForm.controls["sShortCode"].value;
    let telephoneno_1_edit = this.addSupplierForm.controls["sTelNo1"].value;
    let telephoneno_2_edit = this.addSupplierForm.controls["sTelNo2"].value;
    let fax_no_edit = this.addSupplierForm.controls["sFaxNo"].value;
    let status_id = this.addSupplierForm.getRawValue();
    let sup_edit_id = +this.route.snapshot.params['iSupID'];

    const edit_supplier_data = {

      "iRequestID": 2172,
      "sSupName": supp_name_edit,
      "sWebsite": website_name_edit,
      "iLegalEntityID": entity_id_edit,
      "sPAN": pan_no_edit,
      "sShortCode": short_code_edit,
      "sTelNo1": telephoneno_1_edit,
      "sTelNo2": telephoneno_2_edit,
      "sFaxNo": fax_no_edit,
      "iSupID": sup_edit_id,
      "iStatusID": status_id.iStatusID.iKVID,
    }
    console.log(edit_supplier_data);
    this.apiService.callPostApi(edit_supplier_data).subscribe(
      data => {
        console.log(data);
        this.toastService.addSingle("success", "Record Updated Successfully", "");

      },
      error => console.log(error)
    );

    this.addSupplierForm.reset();

  }



 
  openDialogForGST() {
    const ref = this.dialogService.open(GstComponent, {
      data: {}
      ,
      header: 'Add New GST',
      width: '28%'
    });
    localStorage.setItem('iSupID', this.route.snapshot.params['iSupID'])
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
      this.gstList();

    });
  }

  editDialogForGST(gst) {
    const ref = this.dialogService.open(GstComponent, {
      data: gst,
      header: 'Add New GST',
      width: '28%'
    });
    localStorage.setItem('iSupID', this.route.snapshot.params['iSupID'])

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
      this.gstList();

    });
  }

  deletesupgst(gst) {
    console.log(gst);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let loc_id = +gst.iLocID;
        let sup_id = +gst.iSupID;
        let delete_data_api = {
          "iRequestID": 2205,
          "iLocID": loc_id,
          "iSupID": sup_id
        };
        this.apiService.callPostApi(delete_data_api).subscribe(
          (data) => {
            console.log(data);
            this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
            this.gstList();
          },
          (error) => console.log(error)
        );
      }

    });
  }

  downloadFile(attachment:any)
  {
    var dataToSend ={
      "iRequestID": "1112",
      "sActualFileName":attachment.sActualName,
      "sSystemFileName":attachment.sSystemName
  }
    this._apiService.downloadAPI(dataToSend)
  }

  


  showAttachment()
  {
    var dataToSend ={
      "iRequestID": 1112,
      "iProcessTranID":parseInt(this.supId),
      "iProcessID":2
  }
    this._apiService.getDetails(dataToSend).then(response => {
      console.log("Response for attachment ",response)
      this.attachment = response
    });
  }


  showContact()
  {
    var dataToSend ={
      "iRequestID": 2194
  }
    this._apiService.getDetails(dataToSend).then(response => {
      console.log("Response for Contact ",response)
      this.contact = response
    });
  }


  editContact(iSupContactID) {
    const ref = this.dialogService.open( ContactComponent , {
      data: {
        iSupContactID:iSupContactID
      },
      header: 'Edit Contact',
      width: '70%'
    });
  
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.toastService.addSingle("success", "Updated successfully", "");
      this.showContact();
  
      }
    });
    }
  
    deleteContact(iSupContactID)
    {
      // alert("hi")
      // return false;
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          var dataToSendDelete = {
            "iRequestID":2193,
            "iSupContactID":iSupContactID
          }
  
          this._apiService.getDetails(dataToSendDelete).then(response => {
            console.log("Response for Brand Delete ",response)
            this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
            this.showContact();
          });
        },
        reject: () => {
    this.toastService.addSingle("info", "Rejected", "Rejected");
  
        }
    });
    }


    showBank()
  {
    var dataToSend ={
      "iRequestID": 2214,
      "iSupID" :1
  }
    this._apiService.getDetails(dataToSend).then(response => {
      console.log("Response for Bank ",response)
      this.bank = response
    });
  }


  editBank(iBankID) {
    const ref = this.dialogService.open( BankComponent , {
      data: {
        iBankID:iBankID
      },
      header: 'Edit Contact',
      width: '50%'
    });
  
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.toastService.addSingle("success", "Updated successfully", "");
        this.showBank();
  
      }
    });
    }
  
    deleteBank(iBankID)
    {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          var dataToSendDelete = {
            "iRequestID": 2213,
    "iSupID" :1,
    "iBankID":iBankID
          }
  
          this._apiService.getDetails(dataToSendDelete).then(response => {
            console.log("Response for Brand Delete ",response)
            this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
            this.showBank();
          });
        },
        reject: () => {
    this.toastService.addSingle("info", "Rejected", "Rejected");
  
        }
    });
    }


    openDialogForaddContact() {
      const ref = this.dialogService.open( ContactComponent , {
        data: {
        },
        header: 'Add New Contact',
        width: '70%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          this.toastService.addSingle("success", "Record added successfully", "");
          this.showContact();

        }
      });
    }
    
    openDialogForBank() {
      const ref = this.dialogService.open( BankComponent , {
        data: {
        },
        header: 'Add New Bank',
        width: '50%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          this.toastService.addSingle("success", "RecordAdded Successfully", "");
          this.showBank();
        }
      });
    }

}