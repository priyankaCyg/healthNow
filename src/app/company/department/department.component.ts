import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { seldepData } from 'src/app/model/selDepStatus';
import { FormBuilder } from '@angular/forms'
import { departmentData } from 'src/app/model/department';
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
    alert(this.config.data.iDeptID)
    // this.DepartmentSubmit.setValue({
    //   departmentname: this.departmentdata.sDeptName,
    //   depstatus: this.departmentdata.iStatusID
    // });
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
  }

  DepartmentSubmit = this.fb.group({
    departmentname: [''],
    depstatus: ['']
  })

  onSubmit() {
    let dep_name = this.DepartmentSubmit.controls["departmentname"].value;
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
  }
}
