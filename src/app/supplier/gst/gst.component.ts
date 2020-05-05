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
  selectedstatus;
  locId;
  sup_Id;
  isEdit: boolean = false

  public gstForm: FormGroup;
  gstData: GstMaster;
  constructor(public config: DynamicDialogConfig,
    private apiService: ApiService,
    private _formBuilder: FormBuilder,
    private toastService: ToastService,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.defaultDropDwnValue()

    this.gstData = new GstMaster();
    this.gstForm = this.createControl(this.gstData);

    this.locId = this.config.data.iLocID;
    this.sup_Id = this.config.data.iSupID;

    if (this.locId != null) {
      this.isEdit = true

      var dataToSendEdit = {
        "iRequestID": 2204,
        "iLocID": this.locId,
        "iSupID": this.sup_Id
      }

      this.apiService.getDropDownData(dataToSendEdit).then(response => {

        console.log("Response of Edit Brand ", response)

        this.gstData = new GstMaster(response[0]);
        this.gstForm = this.createControl(this.gstData);

        Promise.all([this.getStatusDrpDwn()]).then(values => {
          console.log(values);
          this.setDropDownVal()
        });

      });

    }
    else {
      this.isEdit = false

      Promise.all([this.getStatusDrpDwn()]).then(values => {
        console.log(values);
      });
    }
  }

  defaultDropDwnValue() {
    this.selectedstatus = {
      "iLocationID": 0, "sLocName": "Select", "iStateCode": 0, "sLocCode": null,
      "sStateName": null
    }
  }

  setDropDownVal() {
    // Status Dropdown Select
    let selectedStatusObj = this.supgstData.find(x => x.sLocCode == this.gstData.sLocCode);

    if (selectedStatusObj !== undefined) {
      this.selectedstatus = selectedStatusObj;
    }


  }


  getStatusDrpDwn() {
    return new Promise((resolve, reject) => {
      var sup_gst_data = {
        "iRequestID": 2102,

      }

      this.apiService.getDropDownData(sup_gst_data).then(response => {
        console.log("Response for Status ", response)
        this.supgstData = response
        this.supgstData.splice(0, 0, {
          "iLocationID": 0, "sLocName": "Select", "iStateCode": 0, "sLocCode": null,
          "sStateName": null
        })
        this.selectedstatus = {
          "iLocationID": 0, "sLocName": "Select", "iStateCode": 0, "sLocCode": null,
          "sStateName": null
        }

        resolve(this.supgstData)

      });
    })
  }

  createControl(gstData?: GstMaster): FormGroup {

    this.gstForm = this._formBuilder.group({
      iSupID: [gstData.iSupID],
      iStateID: [gstData.iStateID],
      sCreatedDate: [gstData.sCreatedDate],
      sGST: [gstData.sGST, [Validators.required]],
      sLocCode: [gstData.sLocCode],
      sStateName: [gstData.sStateName, [Validators.required]]
    });
    return this.gstForm;
  }

  addGst() {
    let gst_no = this.gstForm.controls["sGST"].value;
    let state_code = this.gstForm.controls["sStateName"].value;
    let loc_code = state_code.sLocCode;
    let loc_int_id = +state_code.iLocationID;
    let sup_id_add = +localStorage.getItem('iSupID');
    const add_gst_data = {
      "iRequestID": 2201,
      "iSupID": sup_id_add,
      "iLocID": loc_int_id,
      "sGST": gst_no,
      "sLocCode": loc_code
    }
    console.log(add_gst_data);
    this.apiService.callPostApi(add_gst_data).subscribe(
      data => {
        console.log(data);
        this.toastService.addSingle("success", "Record Added Successfully", "");

      },
      error => console.log(error)
    );
    this.ref.close(true);
  }


  editGst() {
    let gst_no = this.gstForm.controls["sGST"].value;
    let state_code = this.gstForm.controls["sStateName"].value;
    let loc_code = state_code.sLocCode;
    let loc_int_id = +state_code.iLocationID;
    let sup_id_add = +localStorage.getItem('iSupID');
    const add_gst_data = {
      "iRequestID": 2202,
      "iSupID": sup_id_add,
      "iLocID": loc_int_id,
      "sGST": gst_no,
      "sLocCode": loc_code
    }
    console.log(add_gst_data);
    this.apiService.callPostApi(add_gst_data).subscribe(
      data => {
        console.log(data);
        this.toastService.addSingle("success", "Record Updated Successfully", "");

      },
      error => console.log(error)
    );
    this.ref.close(true);
  }

  closeDialog() {
    this.ref.close()
  }

  dropDownValidityCheck() {
    if (this.selectedstatus.iLocationID == '') {
      return true
    }
    else {
      return false
    }
  }
}
