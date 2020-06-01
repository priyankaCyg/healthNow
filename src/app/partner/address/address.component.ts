import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { PartnerAddress } from 'src/app/model/partner_address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  partnerAddressData: PartnerAddress;
  public PartnerAddressForm: FormGroup;
  adressTypeData;
  selectedAddressType;
  StatesCityData;
  addressID: number;
  isEdit: boolean = false;
  partner_id: number;

  constructor(
    private fb: FormBuilder, private httpService: ApiService, public config: DynamicDialogConfig, public ref: DynamicDialogRef,
    private toastService: ToastService,
  ) { }
  ngOnInit(): void {
    this.defaultDropDwnValue();
    this.addressID = this.config.data.iPartnerAddID;
    this.partner_id = +localStorage.getItem('iPartnerID');
    this.partnerAddressData = new PartnerAddress();
    this.PartnerAddressForm = this.createControl(this.partnerAddressData);
    if (this.addressID != null) {
      this.isEdit = true
      var getaAddressDataApi = {
        "iRequestID": 2295,
        "iPartnerID": this.partner_id,
        "iPartnerAddID": this.addressID
      }
      this.httpService.callPostApi(getaAddressDataApi).subscribe(
        data => {
          this.partnerAddressData = new PartnerAddress(data.body[0]);
          this.PartnerAddressForm = this.createControl(this.partnerAddressData);
          Promise.all([this.getAddressTypeData()]).then(values => {
            console.log(values);
            this.setDropDownVal();
          });
        });
    }
    else {
      this.isEdit = false;
      this.partnerAddressData = new PartnerAddress();
      this.PartnerAddressForm = this.createControl(this.partnerAddressData);
      Promise.all([this.getAddressTypeData()]).then(values => {
        console.log(values);
      });
    }
    this.PartnerAddressForm.valueChanges.subscribe((changedObj: any) => {
      this.dropDownValidityCheck()
    });
  }

  createControl(partnerAddress?: PartnerAddress): FormGroup {
    this.PartnerAddressForm = this.fb.group({
      sAdd1: [partnerAddress.sAdd1, Validators.required],
      sAdd2: [partnerAddress.sAdd2, Validators.required],
      iPartnerAddID: [partnerAddress.iPartnerAddID],
      iLocID: [partnerAddress.iLocID],
      sAddType: [partnerAddress.sAddType],
      sPartnerName: [partnerAddress.sPartnerName],
      iCityCode: [partnerAddress.iCityCode],
      iStatusID: [partnerAddress.iStatusID],
      sCityName: [partnerAddress.sCityName],
      sLandmark: [partnerAddress.sLandmark, Validators.required],
      iAddTypeID: [partnerAddress.iAddTypeID, Validators.required],
      iCreatedBy: [partnerAddress.iCreatedBy],
      iStateCode: [partnerAddress.iStateCode],
      sStateName: [partnerAddress.sStateName],
      sPostalCode: [partnerAddress.sPostalCode, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
      sStatusName: [partnerAddress.sStatusName],
      iCountryCode: [partnerAddress.iCountryCode],
      sCountryName: [partnerAddress.sCountryName],
      sCreatedDate: [partnerAddress.sCreatedDate],
    })
    this.DisableFields();
    return this.PartnerAddressForm;
  }

  // Function to get Address type dropdown
  getAddressTypeData() {
    return new Promise((resolve, reject) => {
      var address_type_api = {
        "iRequestID": 2071,
        "sKVName": "addresstype"
      }
      this.httpService.callPostApi(address_type_api).subscribe(
        data => {
          this.adressTypeData = data.body;
          this.adressTypeData.unshift({ iKVID: "", sKVValue: "Select Address Type" });
          this.selectedAddressType = { iKVID: "", sKVValue: "Select Address Type" };
          resolve(this.adressTypeData);
        },
        error => {
          console.log(error);
        });
    });
  }

  //Function to close dialog box
  closeDialog() {
    this.ref.close();
  }

  //Function to disable fields
  DisableFields() {
    this.PartnerAddressForm.get('sStateName').disable();
    this.PartnerAddressForm.get('sCityName').disable();
  }

  //Function to get state and city name
  onChangePincode() {
    this.PartnerAddressForm.patchValue({
      sStateName: '',
      sCityName: ''
    });
    let pincode_value = this.PartnerAddressForm.get('sPostalCode').value;
    const pincodeChangesApi = {
      "iRequestID": 2101,
      "sPostalCode": pincode_value
    }
    this.httpService.callPostApi(pincodeChangesApi).subscribe(
      data => {
        if (data.body.length != 0) {
          this.StatesCityData = data.body;
          this.PartnerAddressForm.patchValue({
            sStateName: this.StatesCityData[0].sStateName,
            sCityName: this.StatesCityData[0].sCityName
          });
        }
        else {
          const nameControl = this.PartnerAddressForm.get('sPostalCode');
          nameControl.setErrors({});
          // this.PartnerAddressForm.patchValue({
          //   state: '',
          //   city: ''
          // });
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  //Function to Add new partner address
  addPartnerAddress() {
    var formData = this.PartnerAddressForm.getRawValue();
    const addpartneraddressAPI = {
      "iRequestID": 2291,
      "iPartnerID": this.partner_id,
      "iAddTypeID": parseInt(formData.iAddTypeID.iKVID),
      "sAdd1": formData.sAdd1,
      "sAdd2": formData.sAdd2,
      "iStateCode": this.StatesCityData[0].iStateCode,
      "iCityCode": this.StatesCityData[0].iCityCode,
      "sLandmark": formData.sLandmark,
      "iLocID": this.StatesCityData[0].iLocationID,
      "sPostalCode": formData.sPostalCode
    }
    this.httpService.callPostApi(addpartneraddressAPI).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
      });
  }

  //Function to update partner address
  editPartnerAddress() {
    let state_code = this.partnerAddressData.iStateCode;
    let city_code = this.partnerAddressData.iCityCode;
    let location_id = this.partnerAddressData.iLocID;
    let pincode_valid = this.PartnerAddressForm.controls['sPostalCode'].valid;
    let pincode_dirty = this.PartnerAddressForm.controls['sPostalCode'].dirty;
    var formData = this.PartnerAddressForm.getRawValue();
    if ((pincode_valid && pincode_dirty)) {
      var editPartneraddressAPI1 = {
        "iRequestID": 2292,
        "iAddTypeID": parseInt(formData.iAddTypeID.iKVID),
        "sAdd1": formData.sAdd1,
        "sAdd2": formData.sAdd2,
        "iStateCode": this.StatesCityData[0].iStateCode,
        "iCityCode": this.StatesCityData[0].iCityCode,
        "sLandmark": formData.sLandmark,
        "iLocID": this.StatesCityData[0].iLocationID,
        "sPostalCode": formData.sPostalCode,
        "iStatusID": formData.iStatusID,
        "iPartnerID": this.partner_id,
        "iPartnerAddID": this.addressID
      }
      console.log(editPartneraddressAPI1)
      this.httpService.callPostApi(editPartneraddressAPI1).subscribe(
        data => {
          this.ref.close(true);
          this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
        }
      )
    }
    else {
      var editPartneraddressAPI2 = {
        "iRequestID": 2292,
        "iAddTypeID": parseInt(formData.iAddTypeID.iKVID),
        "sAdd1": formData.sAdd1,
        "sAdd2": formData.sAdd2,
        "iStateCode": state_code,
        "iCityCode": city_code,
        "sLandmark": formData.sLandmark,
        "iLocID": location_id,
        "sPostalCode": formData.sPostalCode,
        "iStatusID": formData.iStatusID,
        "iPartnerID": this.partner_id,
        "iPartnerAddID": this.addressID
      }
      this.httpService.callPostApi(editPartneraddressAPI2).subscribe(
        data => {
          this.ref.close(true);
          this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
        }
      )
    }
  }

  // Function to set default dropdown value
  defaultDropDwnValue() {
    this.selectedAddressType = { iKVID: "", sKVValue: "Select Address Type" }
  }

  //Function to set dropdown value on edit
  setDropDownVal() {

    // address type Dropdown Select
    let selectedAdressTypeObj = this.adressTypeData.find(data => data.iKVID == this.partnerAddressData.iAddTypeID);
    if (selectedAdressTypeObj !== undefined) {
      this.selectedAddressType = selectedAdressTypeObj;
    }
  }

  //Function to check dropdown validity
  dropDownValidityCheck() {
    if (this.selectedAddressType.iKVID == '') {
      return true;
    }
    else {
      return false
    }
  }
}
