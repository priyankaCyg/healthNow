import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import {APIService} from '../../services/apieservice';
import {DynamicDialogConfig,DynamicDialogRef} from 'primeng/dynamicdialog';
import {SupplierBankMaster} from '../../model/supplierBank.model'


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {


  isEdit :boolean = false

  selectedstatus;

  statusData;
  bankId;

  public bankForm: FormGroup;
  bankData : SupplierBankMaster;


  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef,
    private apiService:APIService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.defaultDropDwnValue()

    this.bankData = new SupplierBankMaster();
    this.bankForm = this.createControl(this.bankData);

    this.bankId = this.config.data.iBankID
    // alert(this.bankId)
  if(this.bankId!=null)
  {
    this.isEdit = true

   var dataToSendEdit =  {
      "iRequestID": 2215,
      "iSupID" :1,
    "iBankID": this.bankId
  }

  this.apiService.getDetails(dataToSendEdit).then(response => {

    console.log("Response of Edit Bank ",response)

    this.bankData = new SupplierBankMaster(response[0]);
    this.bankForm = this.createControl(this.bankData);

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
     let selectedStatusObj = this.statusData.find(x => x.iKVID==this.bankData.iStatusID);

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
    console.log(this.bankForm.getRawValue())

    var formData = this.bankForm.getRawValue();

    var dataToSendAdd ={
      "iRequestID": 2211,
    "iSupID" :1,
    "sBankName": formData.sBankName,
    "sAccountNo":formData.sAccountNo,
    "sIFSC":formData.sIFSC,
    "sBankBranch": formData.sBankBranch,
    "sShortCode" :formData.sShortCode
    }

    // alert(JSON.stringify(dataToSendAdd))
    this.apiService.getApiDetails(dataToSendAdd).then(response => {
      console.log("Response for Bank Add ",response)

    this.ref.close(true);

    });
  }


 updateUnit()
  {
    console.log(this.bankForm.getRawValue())

    var formData = this.bankForm.getRawValue();

    var dataToSendEdit ={
      "iRequestID": 2212,
      "iSupID" :1,
      "sBankName": formData.sBankName,
      "sAccountNo":formData.sAccountNo,
      "sIFSC":formData.sIFSC,
      "sBankBranch": formData.sBankBranch,
      "sShortCode" :formData.sShortCode,
      "iStatusID":formData.iStatusID.iKVID,
      "iBankID":this.bankId
    }

    
    this.apiService.getApiDetails(dataToSendEdit).then(response => {
      console.log("Response for Bank Edit ",response)

    this.ref.close(true);

    });
  }



  closeDialog()
  {
    this.ref.close()
  }


  createControl(bankData?: SupplierBankMaster): FormGroup {

    this.bankForm = this._formBuilder.group({
      iBankID: [bankData.iBankID],
      iCreatedBy: [bankData.iCreatedBy],
      iStatusID: [bankData.iStatusID],
      sAccountNo: [bankData.sAccountNo],
      sCreatedDate: [bankData.sCreatedDate],
      sBankBranch: [bankData.sBankBranch],
      sBankName: [bankData.sBankName],
      sIFSC: [bankData.sIFSC],
      sShortCode: [bankData.sShortCode]

    });
    return this.bankForm;
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
