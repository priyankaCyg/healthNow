import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import {APIService} from '../../services/apieservice';
import {DynamicDialogConfig,DynamicDialogRef} from 'primeng/dynamicdialog';
import {UnitMaster} from '../../model/unit.model'

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent implements OnInit {
  isEdit :boolean = false

  selectedstatus;

  statusData;
  unitId;

  public unitForm: FormGroup;
  unitData : UnitMaster;


  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef,
    private apiService:APIService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {


    this.defaultDropDwnValue()

    this.unitData = new UnitMaster();
    this.unitForm = this.createControl(this.unitData);

    this.unitId = this.config.data.unitId
  if(this.unitId!=null)
  {
    this.isEdit = true

   var dataToSendEdit =  {
      "iRequestID": 2145,
      "iUnitID":this.unitId
  }

  this.apiService.getDetails(dataToSendEdit).then(response => {

    console.log("Response of Edit Brand ",response)

    this.unitData = new UnitMaster(response[0]);
    this.unitForm = this.createControl(this.unitData);

    Promise.all([ this.getStatusDrpDwn()]).then(values=> {
      console.log(values);
      this.setDropDownVal()
    });

  });

  }
  else{
    this.isEdit = false

    Promise.all([this.getStatusDrpDwn()]).then(values=> {
      console.log(values);
    });
  }

  }


  defaultDropDwnValue()
  {
    this.selectedstatus={iKVID: "", sKVValue: "Select Status"}
  }

  setDropDownVal()
  {
     // Status Dropdown Select
     let selectedStatusObj = this.statusData.find(x => x.iKVID==this.unitData.iStatusID);

     if (selectedStatusObj !== undefined) {
         this.selectedstatus = selectedStatusObj;
       }


  }


  getStatusDrpDwn()
  {
  return new Promise((resolve, reject) =>{
    var dataToSend4 = {
      "iRequestID":2071,
      "sKVName" :"Status"
    }

    this.apiService.getDetails(dataToSend4).then(response => {
      console.log("Response for Status ",response)
      this.statusData = response
      this.statusData.splice(0, 0, {iKVID: "", sKVValue: "Select Status"})
      this.selectedstatus={iKVID: "", sKVValue: "Select Status"}

    resolve(this.statusData)

    });
  })
  }



  addUnit()
  {
    console.log(this.unitForm.getRawValue())

    var formData = this.unitForm.getRawValue();

    var dataToSendAdd ={
      "iRequestID": 2141,
      "sUnitName":formData.sUnitName
    }

    // alert(JSON.stringify(dataToSendAdd))
    this.apiService.getApiDetails(dataToSendAdd).then(response => {
      console.log("Response for Producer Add ",response)

    this.ref.close(true);

    });
  }


 updateUnit()
  {
    console.log(this.unitForm.getRawValue())

    var formData = this.unitForm.getRawValue();

    var dataToSendEdit ={
      "iRequestID": 2142,
      "sUnitName":formData.sUnitName,
      "iStatusID":formData.iStatusID.iKVID,
      "iUnitID":this.unitId
    }

    
    this.apiService.getApiDetails(dataToSendEdit).then(response => {
      console.log("Response for Producer Edit ",response)

    this.ref.close(true);

    });
  }



  closeDialog()
  {
    this.ref.close()
  }


  createControl(unitData?: UnitMaster): FormGroup {

    this.unitForm = this._formBuilder.group({
      iCreatedBy: [unitData.iCreatedBy],
      iStatusID: [unitData.iStatusID],
      iUnitID: [unitData.iUnitID],
      sCreatedDate: [unitData.sCreatedDate],
      sUnitName: [unitData.sUnitName, [Validators.required]],
      sStatusName: [unitData.sStatusName]
    });
    return this.unitForm;
  }


  dropDownValidityCheck()
  {
    if(this.selectedstatus.iKVID=='')
    {
      return true
    }
    else{
      return false
    }
  }

}
