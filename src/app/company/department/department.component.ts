import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { seldepData } from 'src/app/model/selDepStatus';
import { FormBuilder, Validators } from '@angular/forms'
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  seldepartmentStatus: seldepData[];

  constructor(private _apiService: ApiService, private fb: FormBuilder, public config: DynamicDialogConfig) { }

  ngOnInit(): void {



    const status_data =
    {
      "iRequestID": 2071,
      "sKVName": "Status"
    };
    this._apiService.callPostApi(status_data).subscribe(
      data => {
        console.log(data);
        this.seldepartmentStatus = data;

      },
      error => console.log(error)
    );
    if (this.config.data.iDeptID != undefined) {
      this.DepartmentSubmit.setValue({
        departmentname: this.config.data.sDeptName,
        depstatus: this.config.data.sStatusName
      });
    }
  }

  DepartmentSubmit = this.fb.group({
    departmentname: ['', Validators.required],
    depstatus: ['', Validators.required]
  });

  onSubmit() {
    if (this.config.data.iDeptID == undefined) {
      let dep_name = this.DepartmentSubmit.controls["departmentname"].value;
      console.log(dep_name);
      const dep_submit_data =
      {
        "iRequestID": 2051,
        "iCID": 1,
        "sDeptName": dep_name
      };
      this._apiService.callPostApi(dep_submit_data).subscribe(
        data => {
          console.log(data);

        },
        error => console.log(error)
      );
    } else {
      let dep_id = this.config.data.iDeptID;
      //let status = this.config.data.iStatusID;
      let status_id = this.DepartmentSubmit.controls["depstatus"].value;
      let status = status_id.iKVID;
      console.log(status);
      let dep_name_edit = this.DepartmentSubmit.controls["departmentname"].value;

      console.log(status);
      const dep_edit_data =
      {
        "iRequestID": 2052,
        "iCID": 1,
        "sDeptName": dep_name_edit,
        "iDeptID": dep_id,
        "iStatusID": status
      }
      this._apiService.callPostApi(dep_edit_data).subscribe(
        data => {
          console.log(data);

        },
        error => console.log(error)
      );
    }
  }
}
