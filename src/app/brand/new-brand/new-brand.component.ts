import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BrandMaster } from '../../model/brand.model'
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-brand',
  templateUrl: './new-brand.component.html',
  styleUrls: ['./new-brand.component.css']
})

export class NewBrandComponent implements OnInit {

  isEdit: boolean = false
  selectedProducer;
  selectedstatus;
  statusData;
  producerData;
  brandId: number;
  public brandForm: FormGroup;
  brandData: BrandMaster;
  submitFlag: number = 0;

  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef, private httpService: ApiService,
    private fb: FormBuilder, private toastService: ToastService) { }

  ngOnInit(): void {
    this.defaultDropDwnValue()
    this.brandData = new BrandMaster();
    this.brandForm = this.createControl(this.brandData);
    this.brandId = this.config.data.brandId
    if (this.brandId != null || this.brandId != undefined) {
      this.isEdit = true
      var dataToSendEdit = {
        "iRequestID": 2135,
        "iBrandID": this.brandId
      }
      this.httpService.callPostApi(dataToSendEdit).subscribe(
        data => {
          this.brandData = new BrandMaster(data.body[0]);
          this.brandForm = this.createControl(this.brandData);
          Promise.all([this.getProducerDrpDwn(), this.getStatusData()]).then(values => {
            this.setDropDownVal();
          });
        });
    }
    else {
      this.isEdit = false;
      this.brandData = new BrandMaster();
      this.brandForm = this.createControl(this.brandData);
      Promise.all([this.getProducerDrpDwn(), this.getStatusData()]).then(values => {
      });
    }
    this.brandForm.valueChanges.subscribe((changedObj: any) => {
      this.dropDownValidityCheck()
    });
  }

  //Function to set dropdown value on edit
  setDropDownVal() {

    // Producer Dropdown Select
    let selectedProducerObj = this.producerData.find(x => x.iProducerID == this.brandData.iProducerID);
    if (selectedProducerObj !== undefined) {
      this.selectedProducer = selectedProducerObj;
    }

    // Status Dropdown Select
    let selectedStatusObj = this.statusData.find(x => x.iKVID == this.brandData.iStatusID);
    if (selectedStatusObj !== undefined) {
      this.selectedstatus = selectedStatusObj;
    }
  }

  //Function to set default dropdown value
  defaultDropDwnValue() {
    this.selectedProducer = { iProducerID: "", sProducerName: "Select Producer" }
    this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
  }

  //Function to check dropdown validity
  dropDownValidityCheck() {
    if (this.selectedProducer.iProducerID == '') {
      return true;
    }
    else if (this.selectedstatus.iKVID == '') {
      return true
    }
    else {
      return false
    }
  }

  //Function to get producer dropdown
  getProducerDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend5 = {
        "iRequestID": 2126
      }
      this.httpService.getDropDownData(dataToSend5).then(
        data => {
          this.producerData = data
          this.producerData.splice(0, 0, { iProducerID: "", sProducerName: "Select Producer" })
          this.selectedProducer = { iProducerID: "", sProducerName: "Select Producer" }
          resolve(this.producerData)
        });
    })
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

  createControl(brandData?: BrandMaster): FormGroup {
    this.brandForm = this.fb.group({
      iBrandID: [brandData.iStatusID],
      iCreatedBy: [brandData.iCreatedBy],
      iProducerID: [brandData.iProducerID],
      iStatusID: [brandData.iStatusID, Validators.required],
      sBrandName: [brandData.sBrandName, [Validators.required]],
      sCreatedDate: [brandData.sCreatedDate],
      sProducerName: [brandData.sProducerName, Validators.required],
      sStatusName: [brandData.sStatusName]
    });
    return this.brandForm;
  }

  //Function to add brand
  addBrand() {
    if(this.submitFlag==0){
      this.submitFlag=1;
      var formData = this.brandForm.getRawValue();
    var dataToSendAdd = {
      "iRequestID": 2131,
      "iProducerID": formData.sProducerName.iProducerID,
      "sBrandName": formData.sBrandName
    }
    this.httpService.callPostApi(dataToSendAdd).subscribe(
      data => {
        if(data.headers.get('StatusCode')==200){
          this.ref.close(true);
        }
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
        this.submitFlag=0;
      });
    }
  }

  //Function to update brand 
  updateBrand() {
    var formData = this.brandForm.getRawValue();
    var dataToSendEdit = {
      "iRequestID": 2132,
      "iProducerID": formData.sProducerName.iProducerID,
      "sBrandName": formData.sBrandName,
      "iStatusID": formData.iStatusID.iKVID,
      "iBrandID": this.brandId
    }
    this.httpService.callPostApi(dataToSendEdit).subscribe(
      data => {
        if(data.headers.get('StatusCode')==200){
          this.ref.close(true);
        }
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      });
  }

  // Close brand Popup
  closeDialog() {
    this.ref.close();
    this.brandForm.reset();
  }

}
