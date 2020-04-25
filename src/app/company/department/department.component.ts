import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { seldepData } from 'src/app/model/selDepStatus';
import { FormBuilder, Validators } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  seldepartmentStatus: seldepData[];
  temp;
  setStatus: object;

  constructor(private apiService: ApiService, private fb: FormBuilder, public config: DynamicDialogConfig,
    private ref: DynamicDialogRef) { }

  async ngOnInit(): Promise<void> {
    const status_data = {
      iRequestID: 2071,
      sKVName: "Status",
    };

    await this.apiService.getDropDownData(status_data).then(
      data => {
        this.seldepartmentStatus = data;
        this.seldepartmentStatus.unshift({ "iKVID": 0, "sKVValue": "Select" });

      },
      error => console.log(error)
    );
    this.temp = this.config.data.iStatusID;
    let tempData = this.seldepartmentStatus.filter(t => t.iKVID == this.temp);
    this.setStatus = tempData[0];
    // const status_data =
    // {
    //   "iRequestID": 2071,
    //   "sKVName": "Status"
    // };
    // this.apiService.callPostApi(status_data).subscribe(
    //   data => {
    //     console.log(data);
    //     this.seldepartmentStatus = data;
    //     this.seldepartmentStatus.unshift({ "iKVID": 0, "sKVValue": "select" });
    //   },
    //   error => console.log(error)
    // );
    if (this.config.data.iDeptID != undefined) {
      this.DepartmentSubmit.setValue({
        departmentname: this.config.data.sDeptName,
        //depstatus: this.config.data.sStatusName
        depstatus: this.setStatus,
      });
    }
  }

  DepartmentSubmit = this.fb.group({
    departmentname: ['', Validators.required],
    depstatus: ['', Validators.required]
  });

  get f() { return this.DepartmentSubmit.controls; }
  onSubmit() {
    //this.submitted = true;
    if (this.config.data.iDeptID == undefined) {
      let dep_name = this.DepartmentSubmit.controls["departmentname"].value;
      console.log(dep_name);
      const dep_submit_data =
      {
        "iRequestID": 2051,
        "iCID": 1,
        "sDeptName": dep_name
      };
      this.apiService.callPostApi(dep_submit_data).subscribe(
        data => {
          console.log(data);

        },
        error => console.log(error)
      );
    } else {
      let dep_id = this.config.data.iDeptID;
      let status_id = this.DepartmentSubmit.controls["depstatus"].value;
      let status = status_id.iKVID;
      let dep_name_edit = this.DepartmentSubmit.controls["departmentname"].value;
      const dep_edit_data =
      {
        "iRequestID": 2052,
        "iCID": 1,
        "sDeptName": dep_name_edit,
        "iDeptID": dep_id,
        "iStatusID": status
      }
      this.apiService.callPostApi(dep_edit_data).subscribe(
        data => {
          console.log(data);

        },
        error => console.log(error)
      );
    }
    this.ref.close();
    this.DepartmentSubmit.reset();
  }

  get hasDropDownError() {
    return (
      this.DepartmentSubmit.get('depstatus').touched &&
      this.DepartmentSubmit.get('depstatus').errors &&
      this.DepartmentSubmit.get('depstatus').errors.required
    )
  }

  close() {
    this.ref.close();
  }
}
