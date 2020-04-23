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

    console.log(this.config.data.sGST);

    const status_data =
    {
      "iRequestID": 2071,
      "sKVName": "Status"
    };
    this._apiService.callPostApi(status_data).subscribe(
      data => {
        console.log(data);
        this.gstStatus = data;

      },
      error => console.log(error)
    );

    // if (this.config.data.iStateID != undefined) {
    //   this.GSTSubmit.setValue({
    //     state: this.config.data.sStateName,
    //     gst: this.config.data.sGST,
    //     gststatus: this.config.data.iStatusID
    //   });
    // }
  }

  GSTSubmit = this.fb.group({
    state: ['', Validators.required],
    gst: ['', Validators.required],
    gststatus: ['', Validators.required]
  });

  // onSubmit() {
  //   if (this.config.data.iStateID == undefined) {
  //     let dep_name = this.DepartmentSubmit.controls["departmentname"].value;
  //     console.log(dep_name);
  //     const gst_submit_data =
  //     {
  //       "iRequestID":2061,
  //     	"iCID":1,
  //       "iStateID":2,
  //       "sGST":"02AAAAAAA",
  //       "iUserID":1,
  //       "sLocCode":"02"
  //     };
  //     this._apiService.callPostApi(gst_submit_data).subscribe(
  //       data => {
  //         console.log(data);

  //       },
  //       error => console.log(error)
  //     );
  //   } else {
  //     let dep_id = this.config.data.iDeptID;
  //     //let status = this.config.data.iStatusID;
  //     let status_id = this.DepartmentSubmit.controls["depstatus"].value;
  //     let status = status_id.iKVID;
  //     console.log(status);
  //     let dep_name_edit = this.DepartmentSubmit.controls["departmentname"].value;

  //     console.log(status);
  //     const gst_edit_data =
  //     {
  //  	"iRequestID":2062,
  //      "iCID":1,
  //      "iStateID":12,
  //      "sGST":"12kkkkk",
  //     	"iUserID":1,
  //     	"sLocCode":"12"
  //      "iStatusID": status
  //     }
  //     this._apiService.callPostApi(gst_edit_data).subscribe(
  //       data => {
  //         console.log(data);

  //       },
  //       error => console.log(error)
  //     );
  //   }
  // }
}
