import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { APIService } from '../../services/apieservice';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SupplierContactMaster } from '../../model/supplierContact.model'
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

  isEdit: boolean = false
  selectedstatus;
  selectedAddress;
  statusData;
  addressData;
  iSupContactID: number;
  sup_Id: number;
  public supContactForm: FormGroup;
  contactData: SupplierContactMaster;

  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef,
    private toastService: ToastService, private httpService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.sup_Id = +localStorage.getItem('iSupID');
    this.defaultDropDwnValue()
    this.contactData = new SupplierContactMaster();
    this.supContactForm = this.createControl(this.contactData);
    this.iSupContactID = this.config.data.iSupContactID;
    if (this.iSupContactID != null) {
      this.isEdit = true
      var dataToSendEdit = {
        "iRequestID": 2195,
        "iSupContactID": this.iSupContactID
      }
      this.httpService.getDropDownData(dataToSendEdit).then(response => {
        this.contactData = new SupplierContactMaster(response[0]);
        this.supContactForm = this.createControl(this.contactData);
        Promise.all([this.getStatusDrpDwn(), this.getAddressDrpDwn()]).then(values => {
          this.setDropDownVal()
        });
      });
    }
    else {
      this.isEdit = false
      Promise.all([this.getStatusDrpDwn(), this.getAddressDrpDwn()]).then(values => {
        console.log(values);
      });
    }
  }

  defaultDropDwnValue() {
    this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
    this.selectedAddress = { iSupAddID: "", sAddress: "Select Address" }
  }

  setDropDownVal() {
    // Status Dropdown Select
    let selectedStatusObj = this.statusData.find(x => x.iKVID == this.contactData.iStatusID);
    if (selectedStatusObj !== undefined) {
      this.selectedstatus = selectedStatusObj;
    }

    // Address Dropdown Select
    let selectedAddressObj = this.addressData.find(x => x.iSupAddID == this.contactData.iSupAddID);
    if (selectedAddressObj !== undefined) {
      this.selectedAddress = selectedAddressObj;
    }
  }

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

  getAddressDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2186,
        "iSupID": this.sup_Id
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.addressData = response
        this.addressData.splice(0, 0, { iSupAddID: "", sAddress: "Select Address" })
        this.selectedAddress = { iSupAddID: "", sAddress: "Select Address" }
        resolve(this.statusData)
      });
    })
  }

  addSupplierContact() {
    var formData = this.supContactForm.getRawValue();
    var dataToSendAdd = {
      "iRequestID": 2191,
      "iSupID": this.sup_Id,
      "iSupAddID": formData.sAddress.iSupAddID,
      "sFullName": formData.sFullName,
      "sDesignation": formData.sDesignation,
      "sMobileNo": formData.sMobileNo,
      "sContactNo": formData.sContactNo,
      "sDirectNo": formData.sDirectNo,
      "sFaxNo": formData.sFaxNo,
      "sPOBox": "7418529636",
      "sEmailID": formData.sEmailID
    }
    this.httpService.callPostApi(dataToSendAdd).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      error => console.log(error)
    );
  }

  updateSupplierContact() {
    var formData = this.supContactForm.getRawValue();
    var dataToSendEdit = {
      "iRequestID": 2192,
      "iStatusID": formData.iStatusID.iKVID,
      "iSupAddID": formData.sAddress.iSupAddID,
      "iSupContactID": this.iSupContactID,
      "iSupID": this.sup_Id,
      "sContactNo": formData.sContactNo,
      "sDesignation": formData.sDesignation,
      "sDirectNo": formData.sDirectNo,
      "sEmailID": formData.sEmailID,
      "sFaxNo": formData.sFaxNo,
      "sFullName": formData.sFullName,
      "sMobileNo": formData.sMobileNo,
      "sPOBox": "1111111111"
    }
    this.httpService.callPostApi(dataToSendEdit).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      error => console.log(error)
    );
  }

  closeDialog() {
    this.ref.close()
  }

  createControl(contactData?: SupplierContactMaster): FormGroup {
    this.supContactForm = this.fb.group({
      iCreatedBy: [contactData.iCreatedBy],
      iStatusID: [contactData.iStatusID, [Validators.required]],
      iSupAddID: [contactData.iSupAddID],
      iSupContactID: [contactData.iSupContactID],
      iSupID: [contactData.iSupID],
      sAddress: [contactData.sAddress, [Validators.required]],
      sContactNo: [contactData.sContactNo, [Validators.required, Validators.pattern('^[0-9]*$')]],
      sCreatedDate: [contactData.sCreatedDate],
      sDesignation: [contactData.sDesignation, [Validators.required]],
      sDirectNo: [contactData.sDirectNo, [Validators.required, Validators.pattern('^[0-9]*$')]],
      sEmailID: [contactData.sEmailID, [Validators.required, Validators.email]],
      sFaxNo: [contactData.sFaxNo, [Validators.required]],
      sFullName: [contactData.sFullName, [Validators.required]],
      sMobileNo: [contactData.sMobileNo, [Validators.required, Validators.pattern('^[0-9]*$')]],
      sPOBox: [contactData.sPOBox],
      sStatusName: [contactData.sStatusName],
      sSupName: [contactData.sSupName]
    });
    return this.supContactForm;
  }


  dropDownValidityCheck() {
    if (this.selectedstatus.iKVID == '') {
      return true
    }
    else if (this.selectedAddress.iSupAddID == '') {
      return true
    }
    else {
      return false
    }
  }

}
