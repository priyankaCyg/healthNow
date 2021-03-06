import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { companyBankMaster } from 'src/app/model/companyBank.model';
import { ToastService } from 'src/app/services/toast.service';
import { ApiService } from 'src/app/services/api.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})

export class BankComponent implements OnInit {

  statusData;
  selectedstatus;
  isEdit: boolean = false
  public bankForm: FormGroup;
  bankData: companyBankMaster;
  bankID: number;
  sup_Id: number;
  isSuppBankSave: number = 0;
  constructor(
    private httpService: ApiService,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.defaultDropDwnValue()
    this.bankData = new companyBankMaster();
    this.bankForm = this.createControl(this.bankData);
    this.bankID = this.config.data.iBankID;
    this.sup_Id = +localStorage.getItem('iSupID');
    if (this.bankID != null || this.bankID != undefined) {
      this.isEdit = true
      var dataToSendEdit = {
        "iRequestID": 2215,
        "iSupID": this.sup_Id,
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
      sBankName: [bankdata.sBankName, ValidationService.nameValidator_space],
      sShortCode: [bankdata.sShortCode, ValidationService.accountTypeValidator],
      sAccountNo: [bankdata.sAccountNo, ValidationService.accountValidator],
      sIFSC: [bankdata.sIFSC, ValidationService.alphaNumericValidator],
      sBankBranch: [bankdata.sBankBranch, ValidationService.addressValidator],
      sStatusName: [bankdata.iStatusID, Validators.required]
    });
    return this.bankForm;
  }

  //Add Bank Function
  addBank() {
    if (this.isSuppBankSave == 0) {
      this.isSuppBankSave = 1;
      var formData = this.bankForm.getRawValue();
      const addBankAPI = {
        "iRequestID": 2211,
        "iSupID": this.sup_Id,
        "sBankName": formData.sBankName,
        "sAccountNo": formData.sAccountNo,
        "sIFSC": formData.sIFSC,
        "sBankBranch": formData.sBankBranch,
        "sShortCode": formData.sShortCode,
      }
      this.httpService.callPostApi(addBankAPI).subscribe(
        data => {
          this.isSuppBankSave = 0;
          if (data.headers.get('StatusCode') == 200) {
            this.ref.close(true);
          }
          this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
        });
    }
  }

  // Edit Bank Function
  editBank() {
    var formData = this.bankForm.getRawValue();
    var editBankAPI = {
      "iRequestID": 2212,
      "iSupID": this.sup_Id,
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
        if (data.headers.get('StatusCode') == 200) {
          this.ref.close(true);
        }
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      }
    );
  }

  // Close Bank Popup
  closeDialog() {
    this.ref.close();
    this.bankForm.reset();
  }

}
