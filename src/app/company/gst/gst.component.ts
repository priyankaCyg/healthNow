import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { stateData } from 'src/app/model/selState';
import { ToastService } from "../../services/toast.service";
import { GstMaster } from 'src/app/model/gst.model';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.css']
})
export class GstComponent implements OnInit {
  countryValue;
  country_id: number;
  stateValue;
  selectedCountry;
  selectedState;
  stateId: number;
  iCSGID: number;
  isEdit: boolean = false;
  public GSTSubmit: FormGroup;
  gstData: GstMaster;
  isGstSave: number = 0;
  constructor(private fb: FormBuilder, private httpService: ApiService, private config: DynamicDialogConfig,
    private ref: DynamicDialogRef, private toastService: ToastService) { }

  ngOnInit(): void {
    this.defaultDropDwnValue()
    this.stateId = this.config.data.iStateID;
    this.iCSGID = this.config.data.iCSGID;

    //code for select data by edit
    if (this.iCSGID != null) {
      this.isEdit = true
      this.gstData = new GstMaster(this.config.data);
      this.GSTSubmit = this.createControl(this.gstData);
      Promise.all([this.getCountryDrpDwn()]).then(values => {
        this.setDropDownVal()
      });
    }
    else {
      this.isEdit = false
      this.gstData = new GstMaster(this.config.data);
      this.GSTSubmit = this.createControl(this.gstData);
      Promise.all([this.getCountryDrpDwn()]).then(values => {
      });
    }
  }

  // code for default dropdown data 
  defaultDropDwnValue() {
    this.selectedCountry = { "iLocationID": 0, "sLocName": "Select" }
    this.selectedState = { "iLocationID": 0, "sLocName": "Select" }
  }

  setDropDownVal() {
    // Country Dropdown Select
    let selectedCountryObj = this.countryValue.find(x => x.iLocationID == this.config.data.iCountryID);

    if (selectedCountryObj !== undefined) {
      this.selectedCountry = selectedCountryObj;
    }

    // state dropdown select
    if (this.selectedCountry.iLocationID) {
      var dataToSend = {
        "iRequestID": 2104,
        "iLevelCode1": this.selectedCountry.iLocationID
      }
      this.httpService.getDropDownData(dataToSend).then(response => {
        this.stateValue = response
        this.stateValue.splice(0, 0, { iLocationID: "", sLocName: "Select" })
        this.selectedState = { iLocationID: "", sLocName: "Select " }
        let selectedCountryObj = this.stateValue.find(x => x.iLocationID == this.config.data.iStateID);

        if (selectedCountryObj !== undefined) {
          this.selectedState = selectedCountryObj;
        }
      });
    }

  }

  //code for Country dropdown data 
  getCountryDrpDwn() {
    return new Promise((resolve, reject) => {
      var sup_gst_data = {
        "iRequestID": 2103,
      }
      this.httpService.getDropDownData(sup_gst_data).then(response => {
        this.countryValue = response
        this.countryValue.splice(0, 0, { "iLocationID": 0, "sLocName": "Select" })
        this.selectedCountry = { "iLocationID": 0, "sLocName": "Select" }
        resolve(this.countryValue)
      });
    })
  }

  //on chanfe function for fetch country id
  countryDropdownChange(event) {
    this.country_id = event.value.iLocationID
    this.stateDropdown();
  }

  //code for state dropdown data
  stateDropdown() {
    return new Promise((resolve, reject) => {
      var dataToSend = {
        "iRequestID": 2104,
        "iLevelCode1": this.country_id
      }
      this.httpService.getDropDownData(dataToSend).then(response => {
        this.stateValue = response
        this.stateValue.splice(0, 0, { iLocationID: "", sLocName: "Select State" })
        this.selectedState = { iLocationID: "", sLocName: "Select State" }
        resolve(this.stateValue)
      });
    })
  }


  //code for implement formBuilder and validation 
  createControl(gstData?: GstMaster): FormGroup {

    this.GSTSubmit = this.fb.group({
      iSupID: [gstData.iSupID],
      iStateID: [gstData.iStateID],
      sCreatedDate: [gstData.sCreatedDate],
      sGST: [gstData.sGST, ValidationService.alphaNumericValidator],
      sLocCode: [gstData.sLocCode],
      sStateName: [gstData.sStateName, [Validators.required]],
      sCountryName: [gstData.sStateName, [Validators.required]]
    });
    return this.GSTSubmit;
  }

  //code for add supplier gst data
  addGst() {
    if (this.isGstSave == 0) {
      this.isGstSave = 1;
      let gst_no = this.GSTSubmit.controls["sGST"].value;
      let state_code = this.GSTSubmit.controls["sStateName"].value;
      let loc_code = state_code.sLocCode;
      let loc_int_id = +state_code.iLocationID;
      const add_gst_data = {
        "iRequestID": 2061,
        "iCID": 1,
        "iStateID": loc_int_id,
        "sGST": gst_no,
        "iUserID": 1,
        "sLocCode": loc_code
      }
      this.httpService.callPostApi(add_gst_data).subscribe(
        data => {
          this.isGstSave = 0;
          if (data.headers.get('StatusCode') == 200) {
            this.ref.close(true);
          }
          this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
        },
        error => console.log(error)
      );
    }
  }

  //code for edit supplier gst data
  editGst() {
    let gst_edit_no = this.GSTSubmit.controls["sGST"].value;
    let state_code = this.GSTSubmit.controls["sStateName"].value;
    let loc_code = state_code.sLocCode;
    let loc_int_id_edit = +state_code.iLocationID;
    const add_gst_data = {
      "iRequestID": 2062,
      "iCID": 1,
      "iStateID": loc_int_id_edit,
      "sGST": gst_edit_no,
      "iUserID": 1,
      "sLocCode": loc_code,
      "iCSGID": this.iCSGID
    }
    this.httpService.callPostApi(add_gst_data).subscribe(
      data => {
        if (data.headers.get('StatusCode') == 200) {
          this.ref.close(true);
        }
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      error => console.log(error)
    );
  }

  //code for close Dialog box
  close() {
    this.ref.close();
  }

  //code for dropdown validity check
  dropDownValidityCheck() {
    if (this.selectedCountry.iLocationID == '') {
      return true
    }
    else if (this.selectedState.iLocationID == '') {
      return true
    }
    else {
      return false
    }
  }

  getStateCode() {
    let stateCode = this.selectedState.sLocCode;
    this.GSTSubmit.patchValue({
      sGST: stateCode
    });
  }
}
