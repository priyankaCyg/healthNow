import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from "../../services/toast.service";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DepartmentMaster } from 'src/app/model/company.department.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit {

  selectedstatus;
  statusData;
  isEdit: boolean = false
  Dep_id;
  public DepartmentSubmit: FormGroup;
  departmentData: DepartmentMaster;

  constructor(private httpService: ApiService, private fb: FormBuilder, private config: DynamicDialogConfig,
    private ref: DynamicDialogRef, private toastService: ToastService) { }

  ngOnInit(): void {
    this.defaultDropDwnValue()
    this.departmentData = new DepartmentMaster();
    this.DepartmentSubmit = this.createControl(this.departmentData);
    this.Dep_id = this.config.data.iDeptID;

    // code for getData by Id on Edit button 
    if (this.Dep_id != null) {
      this.isEdit = true
      var dataToSendEdit = {
        "iRequestID": 2056,
        "iCID": 1,
        "iDeptID": this.Dep_id
      }
      this.httpService.getDropDownData(dataToSendEdit).then(data => {
        this.departmentData = new DepartmentMaster(data[0]);
        this.DepartmentSubmit = this.createControl(this.departmentData);
        Promise.all([this.getStatusDrpDwn()]).then(values => {
          this.setDropDownVal()
        });
      });
    }
    else {
      this.isEdit = false
      this.departmentData = new DepartmentMaster();
      this.DepartmentSubmit = this.createControl(this.departmentData);
      Promise.all([this.getStatusDrpDwn()]).then(values => {
      });
    }
  }

  //code for default dropdown data
  defaultDropDwnValue() {
    this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
  }

  //code for set dropdown data
  setDropDownVal() {
    // Status Dropdown Select
    let selectedStatusObj = this.statusData.find(x => x.iKVID == this.departmentData.iStatusID);

    if (selectedStatusObj !== undefined) {
      this.selectedstatus = selectedStatusObj;
    }
  }

  //code for status dropdown data
  getStatusDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2071,
        "sKVName": "Status"
      }
      this.httpService.getDropDownData(dataToSend4).then(response => {
        this.statusData = response
        this.statusData.splice(0, 0, { iKVID: "", sKVValue: "Select Status" })
        this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
        resolve(this.statusData)
      });
    })
  }

  //code for implement form builder and validation
  createControl(departmentData?: DepartmentMaster): FormGroup {
    this.DepartmentSubmit = this.fb.group({
      iCID: [departmentData.iCID],
      iDeptID: [departmentData.iDeptID],
      iStatusID: [departmentData.iStatusID],
      sDeptName: [departmentData.sDeptName, [Validators.required]],
      iCreatedBy: [departmentData.iCreatedBy],
      sCreatedDate: [departmentData.sCreatedDate]
    });
    return this.DepartmentSubmit;
  }

  //code for add department data
  addDepartment() {
    var formData = this.DepartmentSubmit.getRawValue();
    const dep_submit_data =
    {
      "iRequestID": 2051,
      "iCID": 1,
      "sDeptName": formData.sDeptName
    };
    this.httpService.callPostApi(dep_submit_data).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      error => console.log(error)
    );
    this.DepartmentSubmit.reset();
  }

  //code for edit department data 
  editDepartment() {
    var formData = this.DepartmentSubmit.getRawValue();
    const dep_edit_data =
    {
      "iRequestID": 2052,
      "iCID": 1,
      "sDeptName": formData.sDeptName,
      "iDeptID": this.Dep_id,
      "iStatusID": formData.iStatusID.iKVID
    }
    this.httpService.callPostApi(dep_edit_data).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      error => console.log(error)
    );
  }
  //code for closed dialog 
  close() {
    this.ref.close();
  }
  // code for dropDown validity check
  dropDownValidityCheck() {
    if (this.selectedstatus.iKVID == '') {
      return true
    }
    else {
      return false
    }
  }

}
