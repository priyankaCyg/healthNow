import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { PartnerContactMaster } from 'src/app/model/partnerContact.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from 'src/app/services/toast.service';

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

  constructor(private apiService: ApiService, private fb: FormBuilder, public config: DynamicDialogConfig
    , private toastService: ToastService, public ref: DynamicDialogRef

  ) { }

  ngOnInit(): void {
    this.defaultDropDwnValue()
    this.parent_id = +localStorage.getItem('iPartnerID');
    this.partnerData = new PartnerContactMaster();
    this.partnerContactForm = this.createControl(this.partnerData);

    this.iPartnerContactID = this.config.data.iPartnerContactID
    console.log(this.iPartnerContactID)
    if (this.iPartnerContactID != null) {
      this.isEdit = true

      var dataToSendEdit = {
        "iRequestID": 2305,
        "iPartnerContactID": this.iPartnerContactID
      }

      this.apiService.getDropDownData(dataToSendEdit).then(response => {
        this.partnerData = new PartnerContactMaster(response[0]);
        this.partnerContactForm = this.createControl(this.partnerData);

        Promise.all([this.getStatusDrpDwn(), this.getAddressDrpDwn()]).then(values => {
          console.log(values);
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
    this.selectedaddress = { iPartnerAddID: "", sAddress: "Select Address" }
  }
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

  getAddressDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2296,
        "iPartnerID": 1
      }

      this.apiService.getDropDownData(dataToSend4).then(response => {
        this.addressData = response
        this.addressData.splice(0, 0, { iPartnerAddID: "", sAddress: "Select Address" })
        this.selectedaddress = { iPartnerAddID: "", sAddress: "Select Address" }

        resolve(this.addressData)

      });
    })
  }

  createControl(partnerData?: PartnerContactMaster): FormGroup {

    this.partnerContactForm = this.fb.group({
      iCreatedBy: [partnerData.iCreatedBy],
      iStatusID: [partnerData.iStatusID, [Validators.required]],
      iPartnerAddID: [partnerData.iPartnerAddID],
      iPartnerContactID: [partnerData.iPartnerContactID],
      iPartnerID: [partnerData.iPartnerID],
      sAddress: [partnerData.sAddress, [Validators.required]],
      sContactNo: [partnerData.sContactNo, [Validators.required]],
      sCreatedDate: [partnerData.sCreatedDate],
      sDesignation: [partnerData.sDesignation, [Validators.required]],
      sDirectNo: [partnerData.sDirectNo, [Validators.required]],
      sEmailID: [partnerData.sEmailID, [Validators.required, Validators.email]],
      sFaxNo: [partnerData.sFaxNo, [Validators.required]],
      sFullName: [partnerData.sFullName, [Validators.required]],
      sMobileNo: [partnerData.sMobileNo, [Validators.required]],
      sPOBox: [partnerData.sPOBox],
      sStatusName: [partnerData.sStatusName],
      sPartnerName: [partnerData.sPartnerName]
    });
    return this.partnerContactForm;
  }

  addPartnerContact() {
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
    console.log(add_partner_contact_data);
    this.apiService.callPostApi(add_partner_contact_data).subscribe(
      data => {
        console.log(data);
        this.ref.close(true);
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");

      },
      error => console.log(error)
    );

  }

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
    console.log(edit_partner_contact_data);
    this.apiService.callPostApi(edit_partner_contact_data).subscribe(
      data => {
        console.log(data);
        this.ref.close(true);
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");

      },
      error => console.log(error)
    );

  }

  closeDialog() {
    this.ref.close()
  }
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
