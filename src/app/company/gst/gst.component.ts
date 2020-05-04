import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { stateData } from 'src/app/model/selState';
import { ToastService } from "../../services/toast.service";

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.css']
})
export class GstComponent implements OnInit {
  gstState: stateData[];
  temp: string;
  selectedstatus;
  setStatus: Object;
  constructor(private fb: FormBuilder, private apiService: ApiService, public config: DynamicDialogConfig,
    private ref: DynamicDialogRef, private toastService: ToastService) { }

  async ngOnInit(): Promise<void> {

    const status_data = {
      "iRequestID": 2102,
    };

    await this.apiService.getDropDownData(status_data).then(
      data => {
        this.gstState = data;
        this.gstState.unshift({
          "iLocationID": 0, "sLocName": "Select", "iStateCode": 0, "sLocCode": null,
          "sStateName": null
        });
        this.selectedstatus = {
          "iLocationID": 0, "sLocName": "Select", "iStateCode": 0, "sLocCode": null,
          "sStateName": null
        }

      },
      error => console.log(error)
    );
    this.temp = this.config.data.sLocCode;
    let tempData = this.gstState.filter(t => t.sLocCode == this.temp);
    this.setStatus = tempData[0];


    if (this.config.data.iStateID != undefined) {
      this.GSTSubmit.patchValue({
        state: this.setStatus,
        gst: this.config.data.sGST,
      });
    }
  }

  GSTSubmit = this.fb.group({
    state: ['', Validators.required],
    gst: ['02', Validators.required],
  });

  onSubmit() {
    let state_code = this.GSTSubmit.controls["state"].value;
    let loc_code = +state_code.sLocCode;
    if (loc_code == 0) {
      this.GSTSubmit.setErrors({ 'invalid': true });

    } else {
      if (this.config.data.iStateID == undefined) {
        let gst_no = this.GSTSubmit.controls["gst"].value;
        let state_code = this.GSTSubmit.controls["state"].value;
        let loc_code = state_code.sLocCode;
        let loc_int_id = +state_code.iLocationID;
        const gst_submit_data =
        {
          "iRequestID": 2061,
          "iCID": 1,
          "iStateID": loc_int_id,
          "sGST": gst_no,
          "iUserID": 1,
          "sLocCode": loc_code,
        };
        console.log(gst_submit_data);
        this.apiService.callPostApi(gst_submit_data).subscribe(
          data => {
            console.log(data);
            this.toastService.addSingle("success", "Record Added Successfully", "");

          },
          error => console.log(error)
        );
      } else {
        let gst_edit_no = this.GSTSubmit.controls["gst"].value;
        let loc_code_edit = this.config.data.sLocCode;
        let loc_id_edit = this.GSTSubmit.controls["state"].value;
        let loc_int_id_edit = +loc_id_edit.iLocationID;
        const gst_edit_data =
        {
          "iRequestID": 2062,
          "iCID": 1,
          "iStateID": loc_int_id_edit,
          "sGST": gst_edit_no,
          "iUserID": 1,
          "sLocCode": loc_code_edit

        }
        console.log(gst_edit_data);
        this.apiService.callPostApi(gst_edit_data).subscribe(
          data => {
            console.log(data);
            this.toastService.addSingle("success", "Record Updated Successfully", "");

          },
          error => console.log(error)
        );
      }
      this.ref.close();
      this.GSTSubmit.reset();
    }
  }
  close() {
    this.ref.close();
  }
}
