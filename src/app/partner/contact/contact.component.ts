import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { PartnerContactMaster } from 'src/app/model/partnerContact.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from 'src/app/services/toast.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isEdit: boolean = false
  statusData;
  selectedstatus;
  addressData;
  selectedaddress;
  iPartnerContactID;
  parent_id;
  public partnerContactForm: FormGroup;
  partnerData: PartnerContactMaster;
  submitFlag: number = 0;

  constructor(private httpService: ApiService, private fb: FormBuilder, public config: DynamicDialogConfig
    , private toastService: ToastService, public ref: DynamicDialogRef

  ) { }

  ngOnInit(): void {
    this.defaultDropDwnValue()
    this.parent_id = +localStorage.getItem('iPartnerID');
    this.partnerData = new PartnerContactMaster();
    this.partnerContactForm = this.createControl(this.partnerData);

    this.iPartnerContactID = this.config.data.iPartnerContactID
    if (this.iPartnerContactID != null) {
      this.isEdit = true
      var dataToSendEdit = {
        "iRequestID": 2305,
        "iPartnerContactID": this.iPartnerContactID
      }
      this.httpService.getDropDownData(dataToSendEdit).then(response => {
        this.partnerData = new PartnerContactMaster(response[0]);
        this.partnerContactForm = this.createControl(this.partnerData);
        Promise.all([this.getStatusDrpDwn(), this.getAddressDrpDwn()]).then(values => {
          this.setDropDownVal()
        });
      });
    }
    else {
      this.isEdit = false
      Promise.all([this.getStatusDrpDwn(), this.getAddressDrpDwn()]).then(values => {
      });
    }
  }

  //code for default dropdown value
  defaultDropDwnValue() {
    this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
    this.selectedaddress = { iPartnerAddID: "", sAddress: "Select Address" }
  }

  //code for set dropdown data
  setDropDownVal() {
    // Status Dropdown Select
    let selectedStatusObj = this.statusData.find(x => x.iKVID == this.partnerData.iStatusID);

    if (selectedStatusObj !== undefined) {
      this.selectedstatus = selectedStatusObj;
    }

    //Address Dropdown Select
    let selectedAddressObj = this.addressData.find(x => x.iPartnerAddID == this.partnerData.iPartnerAddID);

    if (selectedAddressObj !== undefined) {
      this.selectedaddress = selectedAddressObj;
    }
  }
  //code for partner contact status dropdown data
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

  //code for partner contact address dropdown data
  getAddressDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2296,
        "iPartnerID": 1
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.addressData = response
        this.addressData.splice(0, 0, { iPartnerAddID: "", sAddress: "Select Address" })
        this.selectedaddress = { iPartnerAddID: "", sAddress: "Select Address" }
        resolve(this.addressData)
      });
    })
  }

  //code for implement formBuilder and validation
  createControl(partnerData?: PartnerContactMaster): FormGroup {

    this.partnerContactForm = this.fb.group({
      iCreatedBy: [partnerData.iCreatedBy],
      iStatusID: [partnerData.iStatusID, [Validators.required]],
      iPartnerAddID: [partnerData.iPartnerAddID],
      iPartnerContactID: [partnerData.iPartnerContactID],
      iPartnerID: [partnerData.iPartnerID],
      sAddress: [partnerData.sAddress, [Validators.required]],
      sContactNo: [partnerData.sContactNo,  ValidationService.telephoneNoValidator],
      sCreatedDate: [partnerData.sCreatedDate],
      sDesignation: [partnerData.sDesignation, ValidationService.nameValidator_space],
      sDirectNo: [partnerData.sDirectNo, ValidationService.telephoneNoValidator],
      sEmailID: [partnerData.sEmailID, [Validators.required, Validators.email]],
      sFaxNo: [partnerData.sFaxNo,  ValidationService.faxNoValidator],
      sFullName: [partnerData.sFullName,  ValidationService.nameValidator_space],
      sMobileNo: [partnerData.sMobileNo,  ValidationService.telephoneNoValidator],
      sPOBox: [partnerData.sPOBox],
      sStatusName: [partnerData.sStatusName],
      sPartnerName: [partnerData.sPartnerName]
    });
    return this.partnerContactForm;
  }

  // code for add partner contact data
  addPartnerContact() {
    if(this.submitFlag ==0){
      this.submitFlag=1;
      var formData = this.partnerContactForm.getRawValue();
    const add_partner_contact_data = {
      "iRequestID": 2301,
      "iPartnerID": this.parent_id,
      "iPartnerAddID": formData.sAddress.iPartnerAddID,
      "sFullName": formData.sFullName,
      "sDesignation": formData.sDesignation,
      "sMobileNo": formData.sMobileNo,
      "sContactNo": formData.sContactNo,
      "sDirectNo": formData.sDirectNo,
      "sFaxNo": formData.sFaxNo,
      "sPOBox": "1111111111",
      "sEmailID": formData.sEmailID
    }
    this.httpService.callPostApi(add_partner_contact_data).subscribe(
      data => {
        if(data.headers.get('StatusCode') ==200){
        this.ref.close(true);
        }
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
        this.submitFlag=0;
      },
      error => console.log(error)
    );
    }
  }

  // code for edit partner contact data
  editPartnerContact() {
    var formData = this.partnerContactForm.getRawValue();
    const edit_partner_contact_data = {
      "iRequestID": 2302,
      "iPartnerID": this.parent_id,
      "iPartnerAddID": formData.sAddress.iPartnerAddID,
      "sFullName": formData.sFullName,
      "sDesignation": formData.sDesignation,
      "sMobileNo": formData.sMobileNo,
      "sContactNo": formData.sContactNo,
      "sDirectNo": formData.sDirectNo,
      "sFaxNo": formData.sFaxNo,
      "sPOBox": "1111111111",
      "sEmailID": formData.sEmailID,
      "iStatusID": formData.iStatusID.iKVID,
      "iPartnerContactID": this.iPartnerContactID
    }
    this.httpService.callPostApi(edit_partner_contact_data).subscribe(
      data => {
        if(data.headers.get('StatusCode') ==200){
          this.ref.close(true);
          }
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      error => console.log(error)
    );
  }

  //code for close dialog box
  closeDialog() {
    this.ref.close()
  }

  //code for partner contact dropdown validity check
  dropDownValidityCheck() {
    if (this.selectedstatus.iKVID == '') {
      return true
    }
    else if (this.selectedaddress.iPartnerAddID == '') {
      return true
    }
    else {
      return false
    }
  }
}
