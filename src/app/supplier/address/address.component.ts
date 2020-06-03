import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SupplierAddress } from 'src/app/models/supplier-address.model';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  supplierAddressData: SupplierAddress;
  public SupplierAddressForm: FormGroup;
  adressTypeData;
  selectedAddressType;
  StatesCityData;
  addressID: number;
  isEdit: boolean = false;
  sup_Id: number;

  constructor(
    private fb: FormBuilder,
    private httpService: ApiService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.defaultDropDwnValue();
    this.addressID = this.config.data.iSupAddID;
    this.sup_Id = +localStorage.getItem('iSupID');
    this.supplierAddressData = new SupplierAddress();
    this.SupplierAddressForm = this.createControl(this.supplierAddressData);
    if (this.addressID != null) {
      this.isEdit = true
      var getaAddressDataApi = {
        "iRequestID": 2185,
        "iSupID": this.sup_Id,
        "iSupAddID": this.addressID
      }
      this.httpService.callPostApi(getaAddressDataApi).subscribe(
        data => {
          this.supplierAddressData = new SupplierAddress(data.body[0]);
          this.SupplierAddressForm = this.createControl(this.supplierAddressData);
          Promise.all([this.getAddressTypeData()]).then(values => {
            console.log(values);
            this.setDropDownVal();
          });
        });
    }
    else {
      this.isEdit = false;
      this.supplierAddressData = new SupplierAddress();
      this.SupplierAddressForm = this.createControl(this.supplierAddressData);
      Promise.all([this.getAddressTypeData()]).then(values => {
        console.log(values);
      });
    }
    this.SupplierAddressForm.valueChanges.subscribe((changedObj: any) => {
      this.dropDownValidityCheck()
    });
  }

  createControl(supplierAddress?: SupplierAddress): FormGroup {
    this.SupplierAddressForm = this.fb.group({
      sAdd1: [supplierAddress.sAdd1, Validators.required],
      sAdd2: [supplierAddress.sAdd2, Validators.required],
      iAddID: [supplierAddress.iAddID],
      iLocID: [supplierAddress.iLocID],
      sAddType: [supplierAddress.sAddType],
      sSupName: [supplierAddress.sSupName],
      iCityCode: [supplierAddress.iCityCode],
      iStatusID: [supplierAddress.iStatusID],
      sCityName: [supplierAddress.sCityName],
      sLandmark: [supplierAddress.sLandmark, Validators.required],
      iAddTypeID: [supplierAddress.iAddTypeID, Validators.required],
      iCreatedBy: [supplierAddress.iCreatedBy],
      iStateCode: [supplierAddress.iStateCode],
      sStateName: [supplierAddress.sStateName],
      sPostalCode: [supplierAddress.sPostalCode, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
      sStatusName: [supplierAddress.sStatusName],
      iCountryCode: [supplierAddress.iCountryCode],
      sCountryName: [supplierAddress.sCountryName]
    })
    this.DisableFields();
    return this.SupplierAddressForm;
  }

  //Function to get addresstyoe drodown 
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

  // Function to disable state and city field
  DisableFields() {
    this.SupplierAddressForm.get('sStateName').disable();
    this.SupplierAddressForm.get('sCityName').disable();
  }

  // Function to get state ans city name
  onChangePincode() {
    this.SupplierAddressForm.patchValue({
      sStateName: '',
      sCityName: ''
    });
    let pincode_value = this.SupplierAddressForm.get('sPostalCode').value;
    const pincodeChangesApi = {
      "iRequestID": 2101,
      "sPostalCode": pincode_value
    }
    this.httpService.callPostApi(pincodeChangesApi).subscribe(
      data => {
        if (data.body.length != 0) {
          this.StatesCityData = data.body;
          this.SupplierAddressForm.patchValue({
            sStateName: this.StatesCityData[0].sStateName,
            sCityName: this.StatesCityData[0].sCityName
          });
        }
        else {
          const nameControl = this.SupplierAddressForm.get('sPostalCode');
          nameControl.setErrors({});
          // this.SupplierAddressForm.patchValue({
          //   state: '',
          //   city:''
          // });
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  // Function to add supplier address
  addSupplierAddress() {
    var formData = this.SupplierAddressForm.getRawValue();
    const addSupplieraddressAPI = {
      "iRequestID": 2181,
      "iSupID": this.sup_Id,
      "iAddTypeID": parseInt(formData.iAddTypeID.iKVID),
      "sAdd1": formData.sAdd1,
      "sAdd2": formData.sAdd2,
      "iStateCode": this.StatesCityData[0].iStateCode,
      "iCityCode": this.StatesCityData[0].iCityCode,
      "sLandmark": formData.sLandmark,
      "iLocID": this.StatesCityData[0].iLocationID,
      "sPostalCode": formData.sPostalCode
    }
    this.httpService.callPostApi(addSupplieraddressAPI).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
      });
  }

  //Function to update supplier address
  editSupplierAddress() {
    let state_code = this.supplierAddressData.iStateCode;
    let city_code = this.supplierAddressData.iCityCode;
    let location_id = this.supplierAddressData.iLocID;
    let pincode_valid = this.SupplierAddressForm.controls['sPostalCode'].valid;
    let pincode_dirty = this.SupplierAddressForm.controls['sPostalCode'].dirty;
    var formData = this.SupplierAddressForm.getRawValue();
    if ((pincode_valid && pincode_dirty)) {
      var editSupplieraddressAPI1 = {
        "iRequestID": 2182,
        "iAddTypeID": parseInt(formData.iAddTypeID.iKVID),
        "sAdd1": formData.sAdd1,
        "sAdd2": formData.sAdd2,
        "iStateCode": this.StatesCityData[0].iStateCode,
        "iCityCode": this.StatesCityData[0].iCityCode,
        "sLandmark": formData.sLandmark,
        "iLocID": this.StatesCityData[0].iLocationID,
        "sPostalCode": formData.sPostalCode,
        "iStatusID": formData.iStatusID,
        "iSupID": this.sup_Id,
        "iSupAddID": this.addressID
      }
      this.httpService.callPostApi(editSupplieraddressAPI1).subscribe(
        data => {
          this.ref.close(true);
          this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
        }
      )
    }
    else {
      var editSupplieraddressAPI2 = {
        "iRequestID": 2182,
        "iAddTypeID": parseInt(formData.iAddTypeID.iKVID),
        "sAdd1": formData.sAdd1,
        "sAdd2": formData.sAdd2,
        "iStateCode": state_code,
        "iCityCode": city_code,
        "sLandmark": formData.sLandmark,
        "iLocID": location_id,
        "sPostalCode": formData.sPostalCode,
        "iStatusID": formData.iStatusID,
        "iSupID": this.sup_Id,
        "iSupAddID": this.addressID
      }
      this.httpService.callPostApi(editSupplieraddressAPI2).subscribe(
        data => {
          this.ref.close(true);
          this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
        }
      )
    }
  }

  //Function to set default dropdown value
  defaultDropDwnValue() {
    this.selectedAddressType = { iKVID: "", sKVValue: "Select Address Type" }
  }

  //Function to set dropdwon value on edit
  setDropDownVal() {
    // address type Dropdown Select
    let selectedAdressTypeObj = this.adressTypeData.find(data => data.iKVID == this.supplierAddressData.iAddTypeID);
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
