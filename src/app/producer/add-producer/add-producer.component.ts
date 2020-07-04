import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProducerMaster } from '../../model/producer.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from "../../services/toast.service";
import { ApiService } from 'src/app/services/api.service';
import { ThrowStmt } from '@angular/compiler';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-producer',
  templateUrl: './add-producer.component.html',
  styleUrls: ['./add-producer.component.css']
})

export class AddProducerComponent implements OnInit {

  isEdit: boolean = false
  selectedCountry;
  selectedstatus;
  countryData;
  statusData;
  producerId: number;
  public producerForm: FormGroup;
  producerData: ProducerMaster;
  submitFlag = 0;

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef, private fb: FormBuilder,
    private toastService: ToastService, private httpService: ApiService) { }

  ngOnInit(): void {

    this.defaultDropDwnValue()
    this.producerData = new ProducerMaster();
    this.producerForm = this.createControl(this.producerData);
    this.producerId = this.config.data.producerId
    if (this.producerId != null) {
      this.isEdit = true
      var dataToSendEdit = {
        "iRequestID": 2125,
        "iProducerID": this.producerId
      }
      this.httpService.getDropDownData(dataToSendEdit).then(response => {
        this.producerData = new ProducerMaster(response[0]);
        this.producerForm = this.createControl(this.producerData);
        Promise.all([this.getCountryDrpDwn(), this.getStatusDrpDwn()]).then(values => {
          this.setDropDownVal()
        });
      });
    }
    else {
      this.isEdit = false
      Promise.all([this.getCountryDrpDwn(), this.getStatusDrpDwn()]).then(values => {
      });
    }
  }

  //code for set dropdown value
  setDropDownVal() {
    // Country Dropdown Select
    let selectedCountryObj = this.countryData.find(x => x.iLocationID == this.producerData.iCountryID);
    if (selectedCountryObj !== undefined) {
      this.selectedCountry = selectedCountryObj;
    }
    // Status Dropdown Select
    let selectedStatusObj = this.statusData.find(x => x.iKVID == this.producerData.iStatusID);
    if (selectedStatusObj !== undefined) {
      this.selectedstatus = selectedStatusObj;
    }
  }

  //code for default dropdown value
  defaultDropDwnValue() {
    this.selectedCountry = { iLocationID: "", sLocName: "Select Country" }
    this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
  }

  //code for country dropdown data 
  getCountryDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend5 = {
        "iRequestID": 2103
      }
      this.httpService.getDropDownData(dataToSend5).then(response => {
        this.countryData = response
        this.countryData.splice(0, 0, { iLocationID: "", sLocName: "Select Country" })
        this.selectedCountry = { iLocationID: "", sLocName: "Select Country" }
        resolve(this.countryData)
      });
    })
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

  //code for add new producer data
  addProducer() {
    if (this.submitFlag == 0) {
      this.submitFlag = 1;
      var formData = this.producerForm.getRawValue();
      var dataToSendAdd = {
        "iRequestID": 2121,
        "sProducerName": formData.sProducerName,
        "iCountryID": formData.sCountryName.iLocationID,
        "sShortCode": formData.sShortCode
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

  //code for edit producer data
  updateProducer() {
    var formData = this.producerForm.getRawValue();
    var dataToSendEdit = {
      "iRequestID": 2122,
      "sProducerName": formData.sProducerName,
      "iCountryID": formData.sCountryName.iLocationID,
      "sShortCode": formData.sShortCode,
      "iStatusID": formData.iStatusID.iKVID,
      "iProducerID": this.producerId
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
    this.ref.close();
  }

  //code for implements formbuilder 
  createControl(producerData?: ProducerMaster): FormGroup {
    this.producerForm = this.fb.group({
      iStatusID: [producerData.iStatusID, [Validators.required]],
      iCountryID: [producerData.iCountryID],
      iCreatedBy: [producerData.iCreatedBy],
      sShortCode: [producerData.sShortCode, [ValidationService.nameValidator_shortcode]],
      iProducerID: [producerData.iProducerID],
      sStatusName: [producerData.sStatusName],
      sCountryName: [producerData.sCountryName, [Validators.required]],
      sCreatedDate: [producerData.sCreatedDate],
      sProducerName: [producerData.sProducerName, [ValidationService.nameValidator_space]]
    });
    return this.producerForm;
  }

  //code for dropdown validity check 
  dropDownValidityCheck() {
    if (this.selectedCountry.iLocationID == '') {
      return true;
    }
    else if (this.selectedstatus.iKVID == '') {
      return true
    }
    else {
      return false
    }
  }

}
