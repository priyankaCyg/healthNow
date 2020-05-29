
/**
Template Name: HealthNow
Author: Priyanka Sahu
Created Date: 
File: new-brand.component
**/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import {APIService} from '../../services/apieservice';
import {DynamicDialogConfig,DynamicDialogRef} from 'primeng/dynamicdialog';
import {BrandMaster} from '../../model/brand.model'

@Component({
  selector: 'app-new-brand',
  templateUrl: './new-brand.component.html',
  styleUrls: ['./new-brand.component.css']
})
export class NewBrandComponent implements OnInit {
  isEdit :boolean = false

  selectedProducer;
  selectedstatus;

  statusData;
  producerData;
  brandId


  public brandForm: FormGroup;
  brandData : BrandMaster;

  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef,
    private apiService:APIService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {


this.defaultDropDwnValue()
    this.brandData = new BrandMaster();
    this.brandForm = this.createControl(this.brandData);

    this.brandId = this.config.data.brandId
  if(this.brandId!=null)
  {
    this.isEdit = true

   var dataToSendEdit =  {
      "iRequestID": 2135,
      "iBrandID":this.brandId
  }

  this.apiService.getDetails(dataToSendEdit).then(response => {

    console.log("Response of Edit Brand ",response)

    this.brandData = new BrandMaster(response[0]);
    this.brandForm = this.createControl(this.brandData);

    Promise.all([this.getProducerDrpDwn(), this.getStatusDrpDwn()]).then(values=> {
      console.log(values);
      this.setDropDownVal()
    });

  });

  }
  else{
    this.isEdit = false

    Promise.all([this.getProducerDrpDwn(), this.getStatusDrpDwn()]).then(values=> {
      console.log(values);
    });
  }
  }



  setDropDownVal()
  {
      // Producer Dropdown Select
      let selectedProducerObj = this.producerData.find(x => x.iProducerID == this.brandData.iProducerID);

      if (selectedProducerObj !== undefined) {
          this.selectedProducer = selectedProducerObj;
        }

      // alert(JSON.stringify(this.selectedProducer))
     // Status Dropdown Select
     let selectedStatusObj = this.statusData.find(x => x.iKVID==this.brandData.iStatusID);

     if (selectedStatusObj !== undefined) {
         this.selectedstatus = selectedStatusObj;
       }


  }


  defaultDropDwnValue()
  {
    this.selectedProducer={iProducerID: "", sProducerName: "Select Producer"}
    this.selectedstatus={iKVID: "", sKVValue: "Select Status"}
  }

  getProducerDrpDwn()
  {
  return new Promise((resolve, reject) =>{
    var dataToSend5 = {
      "iRequestID": 2126
    }

    this.apiService.getDetails(dataToSend5).then(response => {
      console.log("Response for Producer ",response)
      this.producerData = response
      this.producerData.splice(0, 0, {iProducerID: "", sProducerName: "Select Producer"})
      this.selectedProducer={iProducerID: "", sProducerName: "Select Producer"}
    resolve(this.producerData )

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



  addBrand()
  {
    console.log(this.brandForm.getRawValue())

    var formData = this.brandForm.getRawValue();

    var dataToSendAdd ={
      "iRequestID": 2131,
    "iProducerID": formData.sProducerName.iProducerID,
    "sBrandName":formData.sBrandName
    }

    // alert(JSON.stringify(dataToSendAdd))
    this.apiService.getApiDetails(dataToSendAdd).then(response => {
      console.log("Response for Producer Add ",response)

    this.ref.close(true);

    });
  }


 updateBrand()
  {
    console.log(this.brandForm.getRawValue())

    var formData = this.brandForm.getRawValue();

    var dataToSendEdit ={
      "iRequestID": 2132,
    "iProducerID": formData.sProducerName.iProducerID,
    "sBrandName":formData.sBrandName,
    "iStatusID":formData.iStatusID.iKVID,
    "iBrandID":this.brandId
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

  
  createControl(brandData?: BrandMaster): FormGroup {

    this.brandForm = this._formBuilder.group({
      iBrandID: [brandData.iStatusID],
      iCreatedBy: [brandData.iCreatedBy],
      iProducerID: [brandData.iProducerID],
      iStatusID: [brandData.iStatusID],
      sBrandName: [brandData.sBrandName, [Validators.required]],
      sCreatedDate: [brandData.sCreatedDate],
      sProducerName: [brandData.sProducerName],
      sStatusName: [brandData.sStatusName]
    });
    return this.brandForm;
  }


  dropDownValidityCheck()
  {
    if(this.selectedProducer.iProducerID=='')
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
