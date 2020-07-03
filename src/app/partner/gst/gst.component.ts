import { Component, OnInit } from '@angular/core';
import { GstMaster } from 'src/app/model/gst.model';
import { ToastService } from 'src/app/services/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.css']
})
export class GstComponent implements OnInit {
  supgstData;
  selectedstate;
  countryValue;
  selectedCountry;
  country_id: number
  locId: number;
  iPSGID: number;
  partner_id: number;
  isEdit: boolean = false;
  selectedcode: string;
  submitFlag: number = 0;

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
    this.gstData = new GstMaster(this.config.data);
    this.gstForm = this.createControl(this.gstData);
    this.locId = this.config.data.iLocID;
    this.partner_id = +localStorage.getItem('iPartnerID');
    this.iPSGID = this.config.data.iPSGID;

    //code for select data by edit
    if (this.iPSGID != null) {
      this.isEdit = true;
      this.gstData = this.config.data;
      this.gstForm = this.createControl(this.gstData);
      Promise.all([this.getCountryDrpDwn()]).then(values => {
        this.setDropDownVal()
      });
    }
    else {
      this.isEdit = false
      Promise.all([this.getCountryDrpDwn()]).then(values => {
      });
    }
  }

  // code for default dropdown data 
  defaultDropDwnValue() {
    this.selectedCountry = { "iLocationID": 0, "sLocName": "Select" }
    this.selectedstate = { "iLocationID": 0, "sLocName": "Select" }
  }

  //code for set dropdown data 
  setDropDownVal() {
    // Country Dropdown Select
    let selectedCountryObj = this.countryValue.find(x => x.iLocationID == this.config.data.iCountryID);

    if (selectedCountryObj !== undefined) {
      this.selectedCountry = selectedCountryObj;
    }

    //state dropdown Select
    if (this.selectedCountry.iLocationID) {
      var dataToSend = {
        "iRequestID": 2104,
        "iLevelCode1": this.selectedCountry.iLocationID
      }
      this.httpService.getDropDownData(dataToSend).then(response => {
        this.supgstData = response
        this.supgstData.splice(0, 0, { iLocationID: "", sLocName: "Select State" })
        this.selectedstate = { iLocationID: "", sLocName: "Select State" }
        let selectedStateObj = this.supgstData.find(x => x.iLocationID == this.config.data.iLocID);

        if (selectedStateObj !== undefined) {
          this.selectedstate = selectedStateObj;
        }
      });
    }

  }

  //code for partner country dropdown data 
  getCountryDrpDwn() {
    return new Promise((resolve, reject) => {
      var sup_gst_data = {
        "iRequestID": 2103
      }
      this.httpService.getDropDownData(sup_gst_data).then(response => {
        this.countryValue = response
        this.countryValue.splice(0, 0, { "iLocationID": 0, "sLocName": "Select" })
        this.selectedCountry = { "iLocationID": 0, "sLocName": "Select" }
        resolve(this.countryValue)
      });
    })
  }

  //on chanage to get country id 
  countryDropdownChange(event) {
    this.country_id = event.value.iLocationID
    this.stateDropdown();
  }

  //code for partner state dropdown data
  stateDropdown() {
    return new Promise((resolve, reject) => {
      var dataToSend = {
        "iRequestID": 2104,
        "iLevelCode1": this.country_id
      }
      this.httpService.getDropDownData(dataToSend).then(response => {
        this.supgstData = response
        this.supgstData.splice(0, 0, { iLocationID: "", sLocName: "Select State" })
        this.selectedstate = { iLocationID: "", sLocName: "Select State" }
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

  //code for add partner gst data
  addGst() {
    if (this.submitFlag == 0) {
      this.submitFlag = 1;
      let gst_no = this.gstForm.controls["sGST"].value;
      let state_code = this.gstForm.controls["sStateName"].value;
      let loc_code = state_code.sLocCode;
      let loc_int_id = +state_code.iLocationID;

      const add_gst_data = {
        "iRequestID": 2321,
        "iPartnerID": this.partner_id,
        "iLocID": loc_int_id,
        "sGST": gst_no,
        "sLocCode": loc_code
      }
      this.httpService.callPostApi(add_gst_data).subscribe(
        data => {
          if (data.headers.get('StatusCode') == 200) {
            this.ref.close(true);
          }

          this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          this.submitFlag = 0;
        },
        error => console.log(error)
      );
    }

  }

  //code for edit partner gst data
  editGst() {
    let gst_no = this.gstForm.controls["sGST"].value;
    let state_code = this.gstForm.controls["sStateName"].value;
    let loc_code = state_code.sLocCode;
    let loc_int_id = +state_code.iLocationID;
    const add_gst_data = {
      "iRequestID": 2322,
      "iPartnerID": this.partner_id,
      "iLocID": loc_int_id,
      "sGST": gst_no,
      "sLocCode": loc_code,
      "iPSGID": this.iPSGID
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
    else if (this.selectedstate.iLocationID == '') {
      return true
    }
    else {
      return false
    }
  }

  // get state code 
  getStateCode() {
    console.log(this.supgstData);
    let stateCode = this.selectedstate.sLocCode;
    this.gstForm.patchValue({
      sGST: stateCode
    });
  }
}
