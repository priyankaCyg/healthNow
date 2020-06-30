import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { companyBankMaster } from 'src/app/model/companyBank.model';
import { ToastService } from 'src/app/services/toast.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: "app-bank",
  templateUrl: "./bank.component.html",
  styleUrls: ["./bank.component.css"],
})
export class BankComponent implements OnInit {

  statusData;
  selectedstatus;
  isEdit: boolean = false
  public bankForm: FormGroup;
  bankData: companyBankMaster;
  bankID: number;

  constructor(
    private httpService: ApiService, private fb: FormBuilder, private config: DynamicDialogConfig,
    private ref: DynamicDialogRef, private toastService: ToastService) { }

  ngOnInit(): void {

    this.defaultDropDwnValue()
    this.bankData = new companyBankMaster();
    this.bankForm = this.createControl(this.bankData);
    this.bankID = this.config.data.iBankID;
    if (this.bankID != null || this.bankID != undefined) {
      this.isEdit = true
      var dataToSendEdit = {
        "iRequestID": 2046,
        "iCID": 1,
        "iBankID": this.bankID
      }
      this.httpService.callPostApi(dataToSendEdit).subscribe(
        data => {
          this.bankData = new companyBankMaster(data.body[0]);
          this.bankForm = this.createControl(this.bankData);
          Promise.all([this.getStatusData()]).then(values => {
            console.log(values);
            this.setDropDownVal();
          });
        });
    }
    else {
      this.isEdit = false;
      this.bankData = new companyBankMaster();
      this.bankForm = this.createControl(this.bankData);
      Promise.all([this.getStatusData()]).then(values => {
        console.log(values);
      });
    }
    this.bankForm.valueChanges.subscribe((changedObj: any) => {
      this.dropDownValidityCheck()
    });
  }

  // Set Dropdown value on Edit
  setDropDownVal() {
    // Status Dropdown 
    let selectedStatus = this.statusData.find(data => data.iKVID == +this.bankData.iStatusID);
    if (selectedStatus !== undefined) {
      this.selectedstatus = selectedStatus;
    }
  }

  // Set Defalut  Dropdown value
  defaultDropDwnValue() {
    this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
  }

  // Validity Check for Dropdown
  dropDownValidityCheck() {
    if (this.selectedstatus.iKVID == '') {
      return true;
    }
    else {
      return false
    }
  }

  // Select Status Dropdown Function
  getStatusData() {
    return new Promise((resolve, reject) => {
      var status_api = {
        "iRequestID": 2071,
        "sKVName": "Status"
      }
      this.httpService.getDropDownData(status_api).then(
        data => {
          this.statusData = data;
          this.statusData.unshift({ iKVID: "", sKVValue: "Select Status" });
          this.selectedstatus = { iKVID: "", sKVValue: "Select Status" };
          resolve(this.statusData);
        },
        error => console.log(error)
      );
    });
  }

  createControl(bankdata?: companyBankMaster): FormGroup {
    this.bankForm = this.fb.group({
      sBankName: [bankdata.sBankName, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      sShortCode: [bankdata.sShortCode, Validators.required],
      sAccountNo: [bankdata.sAccountNo, [Validators.required, Validators.pattern('^[0-9]*$')]],
      sIFSC: [bankdata.sIFSC, [Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')]],
      sBankBranch: [bankdata.sBankBranch, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      sStatusName: [bankdata.iStatusID, Validators.required]
    });
    return this.bankForm;
  }

  //Add Bank Function
  addBank() {
    var formData = this.bankForm.getRawValue();
    const addBankAPI = {
      "iRequestID": 2041,
      "iCID": 1,
      "sBankName": formData.sBankName,
      "sAccountNo": formData.sAccountNo,
      "sIFSC": formData.sIFSC,
      "sBankBranch": formData.sBankBranch,
      "sShortCode": formData.sShortCode,
    }
    this.httpService.callPostApi(addBankAPI).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      });
  }

  // Edit Bank Function
  editBank() {
    var formData = this.bankForm.getRawValue();
    var editBankAPI = {
      "iRequestID": 2042,
      "iCID": 1,
      "sBankName": formData.sBankName,
      "sAccountNo": formData.sAccountNo,
      "sIFSC": formData.sIFSC,
      "sBankBranch": formData.sBankBranch,
      "sShortCode": formData.sShortCode,
      "iStatusID": formData.sStatusName.iKVID,
      "iBankID": this.bankID,
    }
    this.httpService.callPostApi(editBankAPI).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      }
    )
  }

  // Close Bank Popup
  closeDialog() {
    this.ref.close();
    this.bankForm.reset();
  }
  
}
