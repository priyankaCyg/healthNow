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
  isEdit: boolean = false

  constructor(private fb: FormBuilder, private httpService: ApiService, private config: DynamicDialogConfig,
    private ref: DynamicDialogRef, private toastService: ToastService) { }

  async ngOnInit(): Promise<void> {
    const status_data = {
      "iRequestID": 2102,
    };
    await this.httpService.getDropDownData(status_data).then(
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

    //code for set value on edit gst form
    if (this.config.data.iStateID != undefined) {
      this.isEdit = true
      this.GSTSubmit.patchValue({
        state: this.setStatus,
        gst: this.config.data.sGST,
      });
    } else {
      this.isEdit = false;
    }
  }

  //code for implememnt formBuilder 
  GSTSubmit = this.fb.group({
    state: ['', Validators.required],
    gst: ['', Validators.required],
  });

  // code for submit gst data
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
        }
        this.httpService.callPostApi(gst_submit_data).subscribe(
          data => {
            this.ref.close(true);
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
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
        this.httpService.callPostApi(gst_edit_data).subscribe(
          data => {
            this.ref.close(true);
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          },
          error => console.log(error)
        );
      }
      this.GSTSubmit.reset();
    }
  }

  //code for close Dialog box
  close() {
    this.ref.close();
  }
}
