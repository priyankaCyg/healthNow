import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';
import { seldepData } from 'src/app/model/selDepStatus';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.css']
})
export class GstComponent implements OnInit {
  gstStatus: seldepData[];

  constructor(private fb: FormBuilder, private _apiService: ApiService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {

    if (this.config.data.iStateID != undefined) {
      this.GSTSubmit.setValue({
        state: this.config.data.sStateName,
        gst: this.config.data.sGST,
      });
    }
  }

  GSTSubmit = this.fb.group({
    state: ['', Validators.required],
    gst: ['', Validators.required],
  });

  onSubmit() {
    console.log(this.GSTSubmit.value);
    if (this.config.data.iStateID == 2) {
      var gst_no = this.GSTSubmit.controls["gst"].value;

      const gst_submit_data =
      {
        "iRequestID": 2061,
        "iCID": 1,
        "iStateID": 2,
        "sGST": gst_no,
        "iUserID": 1,
        "sLocCode": "02"
      };
      this._apiService.callPostApi(gst_submit_data).subscribe(
        data => {
          console.log(data);

        },
        error => console.log(error)
      );
    } else {

      const gst_edit_data =
      {
        "iRequestID": 2062,
        "iCID": 1,
        "iStateID": 12,
        "sGST": gst_no,
        "iUserID": 1,
        "sLocCode": "12"

      }
      this._apiService.callPostApi(gst_edit_data).subscribe(
        data => {
          console.log(data);

        },
        error => console.log(error)
      );
    }
  }
}
