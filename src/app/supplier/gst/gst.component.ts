import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GstMaster } from 'src/app/model/gst.model';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.css']
})
export class GstComponent implements OnInit {
  supgstData;
  selectedState;
  countryValue;
  selectedCountry;
  locId: number;;
  sup_Id: number;
  iSSGID: number;
  country_id: number;
  isEdit: boolean = false
  isGstSave: number = 0;
  public gstForm: FormGroup;
  gstData: GstMaster;
  constructor(public config: DynamicDialogConfig,
    private httpService: ApiService,
    private fb: FormBuilder,
    private toastService: ToastService,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.defaultDropDwnValue()
    this.locId = this.config.data.iLocID;
    this.sup_Id = +localStorage.getItem('iSupID');
    this.iSSGID = this.config.data.iSSGID;

    //code for select data by edit
    if (this.iSSGID != null) {
      this.isEdit = true
      this.gstData = new GstMaster(this.config.data);
      this.gstForm = this.createControl(this.gstData);
      Promise.all([this.getCountryDrpDwn()]).then(values => {
        this.setDropDownVal()
      });
      // });
    }
    else {
      this.isEdit = false
      this.gstData = new GstMaster();
      this.gstForm = this.createControl(this.gstData);
      Promise.all([this.getCountryDrpDwn()]).then(values => {
      });
    }
  }

  // code for default dropdown data 
  defaultDropDwnValue() {
    this.selectedCountry = { "iLocationID": 0, "sLocName": "Select" }
    this.selectedState = { "iLocationID": 0, "sLocName": "Select" }

  }

  //code for set dropdown data 
  setDropDownVal() {
    // Country Dropdown Select
    let selectedCountryObj = this.countryValue.find(x => x.iLocationID == this.config.data.iCountryID);

    if (selectedCountryObj !== undefined) {
      this.selectedCountry = selectedCountryObj;
    }

    //State dropdown Select
    if (this.selectedCountry.iLocationID) {
      var dataToSend = {
        "iRequestID": 2104,
        "iLevelCode1": this.selectedCountry.iLocationID
      }
      this.httpService.getDropDownData(dataToSend).then(response => {
        this.supgstData = response
        this.supgstData.splice(0, 0, { iLocationID: "", sLocName: "Select State" })
        this.selectedState = { iLocationID: "", sLocName: "Select State" }
        let selectedStateObj = this.supgstData.find(x => x.iLocationID == this.config.data.iLocID);

        if (selectedStateObj !== undefined) {
          this.selectedState = selectedStateObj;
        }
      });
    }

  }

  //code for supplier country dropdown data 
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

  //code for onchange to get country id
  countryDropdownChange(event) {
    this.country_id = event.value.iLocationID
    this.stateDropdown();
  }
  //code for supplier state dropdown data
  stateDropdown() {
    return new Promise((resolve, reject) => {
      var dataToSend = {
        "iRequestID": 2104,
        "iLevelCode1": this.country_id
      }
      this.httpService.getDropDownData(dataToSend).then(response => {
        this.supgstData = response
        this.supgstData.splice(0, 0, { iLocationID: "", sLocName: "Select State" })
        this.selectedState = { iLocationID: "", sLocName: "Select State" }
        resolve(this.supgstData)
      });
    })
  }

  //code for implement formBuilder and validation 
  createControl(gstData?: GstMaster): FormGroup {

    this.gstForm = this.fb.group({
      iSupID: [gstData.iSupID],
      iStateID: [gstData.iStateID],
      sCreatedDate: [gstData.sCreatedDate],
      sGST: [gstData.sGST, [Validators.required]],
      sLocCode: [gstData.sLocCode],
      sStateName: [gstData.sStateName, [Validators.required]],
      sCountryName: [gstData.sStateName, [Validators.required]]
    });
    return this.gstForm;
  }

  //code for add supplier gst data
  addGst() {
    if (this.isGstSave == 0) {
      this.isGstSave = 1;
      let gst_no = this.gstForm.controls["sGST"].value;
      let state_code = this.gstForm.controls["sStateName"].value;
      let loc_code = state_code.sLocCode;
      let loc_int_id = +state_code.iLocationID;

      const add_gst_data = {
        "iRequestID": 2201,
        "iSupID": this.sup_Id,
        "iLocID": loc_int_id,
        "sGST": gst_no,
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
    let gst_no = this.gstForm.controls["sGST"].value;
    let state_code = this.gstForm.controls["sStateName"].value;
    let loc_code = state_code.sLocCode;
    let loc_int_id = +state_code.iLocationID;

    const add_gst_data = {
      "iRequestID": 2202,
      "iSupID": this.sup_Id,
      "iLocID": loc_int_id,
      "sGST": gst_no,
      "sLocCode": loc_code,
      "iSSGID": this.iSSGID
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

  //code for close dialog box
  closeDialog() {
    this.ref.close()
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
    console.log(this.supgstData);
    let stateCode = this.selectedState.sLocCode;
    this.gstForm.patchValue({
      sGST: stateCode
    });
  }
}
