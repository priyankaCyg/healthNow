import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UnitMaster } from '../../model/unit.model'
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from "../../services/toast.service";
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})

export class AddUnitComponent implements OnInit {
  isEdit: boolean = false
  selectedstatus;
  statusData;
  unitId: number;
  public unitForm: FormGroup;
  unitData: UnitMaster;
  submitFlag: number = 0;

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef, private fb: FormBuilder,
    private toastService: ToastService, private httpService: ApiService) { }

  ngOnInit(): void {
    this.defaultDropDwnValue()
    this.unitData = new UnitMaster();
    this.unitForm = this.createControl(this.unitData);
    this.unitId = this.config.data.unitId
    if (this.unitId != null) {
      this.isEdit = true
      var dataToSendEdit = {
        "iRequestID": 2145,
        "iUnitID": this.unitId
      }
      this.httpService.getDropDownData(dataToSendEdit).then(response => {
        this.unitData = new UnitMaster(response[0]);
        this.unitForm = this.createControl(this.unitData);
        Promise.all([this.getStatusDrpDwn()]).then(values => {
          this.setDropDownVal()
        });
      });
    }
    else {
      this.isEdit = false
      Promise.all([this.getStatusDrpDwn()]).then(values => {
      });
    }
  }

  //code for default dropdown value
  defaultDropDwnValue() {
    this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
  }

  //code for set dropdown value
  setDropDownVal() {
    // Status Dropdown Select
    let selectedStatusObj = this.statusData.find(x => x.iKVID == this.unitData.iStatusID);

    if (selectedStatusObj !== undefined) {
      this.selectedstatus = selectedStatusObj;
    }
    this.unitForm.get('iStatusID').setValue(this.selectedstatus);

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

  //code for add new unit data
  addUnit() {
    if (this.submitFlag == 0) {
      this.submitFlag = 1;
      var formData = this.unitForm.getRawValue();
      var dataToSendAdd = {
        "iRequestID": 2141,
        "sUnitName": formData.sUnitName,
        "sSymbol": formData.sSymbol
      }
      this.httpService.callPostApi(dataToSendAdd).subscribe(
        (data) => {
          if (data.headers.get('StatusCode') == 200) {
            this.ref.close(true);
          }
          this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          this.submitFlag = 0;
        },
        (error) => console.log(error)
      );
    }
  }

  //code for edit unit data
  updateUnit() {
    var formData = this.unitForm.getRawValue();
    var dataToSendEdit = {
      "iRequestID": 2142,
      "sUnitName": formData.sUnitName,
      "iStatusID": formData.iStatusID.iKVID,
      "iUnitID": this.unitId,
      "sSymbol": formData.sSymbol
    }
    this.httpService.callPostApi(dataToSendEdit).subscribe(
      (data) => {
        if (data.headers.get('StatusCode') == 200) {
          this.ref.close(true);
        }
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      (error) => console.log(error)
    );
  }

  //code for close dialog box
  closeDialog() {
    this.ref.close()
  }

  // code for implements form builder 
  createControl(unitData?: UnitMaster): FormGroup {
    this.unitForm = this.fb.group({
      iCreatedBy: [unitData.iCreatedBy],
      iStatusID: [unitData.iStatusID, [ValidationService.dropdownValidator]],
      iUnitID: [unitData.iUnitID],
      sCreatedDate: [unitData.sCreatedDate],
      sUnitName: [unitData.sUnitName, [ValidationService.nameValidator]],
      sSymbol: [unitData.sSymbol, [ValidationService.nameValidator]],
      sStatusName: [unitData.sStatusName]
    });
    return this.unitForm;
  }

  //code for dropdown validity check
  // dropDownValidityCheck() {
  //   if (this.selectedstatus.iKVID == '') {
  //     return true
  //   }
  //   else {
  //     return false
  //   }
  // }

}
