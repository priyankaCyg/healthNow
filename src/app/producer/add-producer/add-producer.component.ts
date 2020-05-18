/**
Template Name: HealthNow
Author: Priyanka Sahu
Created Date: 
File: add-producer.component
**/
import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig,DynamicDialogRef} from 'primeng/dynamicdialog';
import {APIService} from '../../services/apieservice';
import {ProducerMaster} from '../../model/producer.model'
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-producer',
  templateUrl: './add-producer.component.html',
  styleUrls: ['./add-producer.component.css']
})
export class AddProducerComponent implements OnInit {
  isEdit :boolean = false

  selectedCountry;
  selectedstatus;

  countryData;
  statusData;

  producerId

  public producerForm: FormGroup;
  producerData : ProducerMaster;

  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef,
    private apiService:APIService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // alert(this.config.data.producerId)
  
    this.defaultDropDwnValue()
    this.producerData = new ProducerMaster();
    this.producerForm = this.createControl(this.producerData);

  this.producerId = this.config.data.producerId
  if(this.producerId!=null)
  {
    this.isEdit = true

   var dataToSendEdit =  {
      "iRequestID": 2125,
      "iProducerID":this.producerId
  }

  this.apiService.getDetails(dataToSendEdit).then(response => {
    this.producerData = new ProducerMaster(response[0]);
    this.producerForm = this.createControl(this.producerData);

    Promise.all([this.getCountryDrpDwn(), this.getStatusDrpDwn()]).then(values=> {
      console.log(values);
      this.setDropDownVal()
    });

  });

  }
  else{
    this.isEdit = false

    Promise.all([this.getCountryDrpDwn(), this.getStatusDrpDwn()]).then(values=> {
      console.log(values);
    });
  }
  }




  setDropDownVal()
  {
      // Gender Dropdown Select
      let selectedCountryObj = this.countryData.find(x => x.iLocationID == this.producerData.iCountryID);

      if (selectedCountryObj !== undefined) {
          this.selectedCountry = selectedCountryObj;
        }

      
     // Status Dropdown Select
     let selectedStatusObj = this.statusData.find(x => x.iKVID==this.producerData.iStatusID);

     if (selectedStatusObj !== undefined) {
         this.selectedstatus = selectedStatusObj;
       }


  }


  defaultDropDwnValue()
  {
    this.selectedCountry={iLocationID: "", sLocName: "Select Country"}
    this.selectedstatus={iKVID: "", sKVValue: "Select Status"}
  }

  getCountryDrpDwn()
  {
  return new Promise((resolve, reject) =>{
    var dataToSend5 = {
      "iRequestID": 2103
    }

    this.apiService.getDetails(dataToSend5).then(response => {
      console.log("Response for Country ",response)
      this.countryData = response
      this.countryData.splice(0, 0, {iLocationID: "", sLocName: "Select Country"})
      this.selectedCountry={iLocationID: "", sLocName: "Select Country"}
    resolve(this.countryData )

    });
  })
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


  addProducer()
  {
    console.log(this.producerForm.getRawValue())

    var formData = this.producerForm.getRawValue();

    var dataToSendAdd ={
      "iRequestID": 2121,
    "sProducerName": formData.sProducerName,
    "iCountryID":formData.sCountryName.iLocationID,
    "sShortCode":formData.sShortCode
    }

    // alert(JSON.stringify(dataToSendAdd))
    this.apiService.getApiDetails(dataToSendAdd).then(response => {
      console.log("Response for Producer Add ",response)

    this.ref.close(true);

    });
  }


 updateProducer()
  {
    console.log(this.producerForm.getRawValue())

    var formData = this.producerForm.getRawValue();

    var dataToSendEdit ={
      "iRequestID": 2122,
    "sProducerName": formData.sProducerName,
    "iCountryID":formData.sCountryName.iLocationID,
    "sShortCode":formData.sShortCode,
    "iStatusID":formData.iStatusID.iKVID,
    "iProducerID":this.producerId
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
  createControl(producerData?: ProducerMaster): FormGroup {

    this.producerForm = this._formBuilder.group({
      iStatusID: [producerData.iStatusID],
      iCountryID: [producerData.iCountryID],
      iCreatedBy: [producerData.iCreatedBy],
      sShortCode: [producerData.sShortCode, [Validators.required]],
      iProducerID: [producerData.iProducerID],
      sStatusName: [producerData.sStatusName],
      sCountryName: [producerData.sCountryName],
      sCreatedDate: [producerData.sCreatedDate],
      sProducerName: [producerData.sProducerName, [Validators.required]]
    });
    return this.producerForm;
  }



  dropDownValidityCheck()
  {
    if(this.selectedCountry.iLocationID=='')
    {
      return true;
    }
    else if(this.selectedstatus.iKVID=='')
    {
      return true
    }
    else{
      return false
    }
  }


  
}
