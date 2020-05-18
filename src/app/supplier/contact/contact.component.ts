/**
Template Name: HealthNow
Author: Priyanka Sahu
Created Date: 
File: contact.component
**/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import {APIService} from '../../services/apieservice';
import {DynamicDialogConfig,DynamicDialogRef} from 'primeng/dynamicdialog';
import {SupplierContactMaster} from '../../model/supplierContact.model'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  isEdit :boolean = false

  selectedstatus;
  selectedAddress;

  statusData;
  addressData;
  iSupContactID;
  sup_Id;

  public supContactForm: FormGroup;
  contactData : SupplierContactMaster;

 
  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef,
    private apiService:APIService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.sup_Id = +localStorage.getItem('iSupID');
    this.defaultDropDwnValue()

    this.contactData = new SupplierContactMaster();
    this.supContactForm = this.createControl(this.contactData);

    this.iSupContactID = this.config.data.iSupContactID
  if(this.iSupContactID!=null)
  {
    this.isEdit = true

   var dataToSendEdit =  {
      "iRequestID": 2195,
      "iSupContactID":this.iSupContactID
  }

  this.apiService.getDetails(dataToSendEdit).then(response => {

    console.log("Response of Edit Supplier Contact ",response)

    this.contactData = new SupplierContactMaster(response[0]);
    this.supContactForm = this.createControl(this.contactData);

    Promise.all([ this.getStatusDrpDwn(),this.getAddressDrpDwn()]).then(values=> {
      console.log(values);
      this.setDropDownVal()
    });

  });

  }
  else{
    this.isEdit = false

    Promise.all([this.getStatusDrpDwn(),this.getAddressDrpDwn()]).then(values=> {
      console.log(values);
    });
  }


  }




  defaultDropDwnValue()
  {
    this.selectedstatus={iKVID: "", sKVValue: "Select Status"}
    this.selectedAddress={iSupAddID: "", sAddress: "Select Address"}
  }

  setDropDownVal()
  {
     // Status Dropdown Select
     let selectedStatusObj = this.statusData.find(x => x.iKVID==this.contactData.iStatusID);

     if (selectedStatusObj !== undefined) {
         this.selectedstatus = selectedStatusObj;
       }

        // Address Dropdown Select
     let selectedAddressObj = this.addressData.find(x => x.iSupAddID==this.contactData.iSupAddID);

     if (selectedAddressObj !== undefined) {
         this.selectedAddress = selectedAddressObj;
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



  getAddressDrpDwn()
  {
  return new Promise((resolve, reject) =>{
    var dataToSend4 = {
      "iRequestID":2186
    }

    this.apiService.getDetails(dataToSend4).then(response => {
      console.log("Response for Address ",response)
      this.addressData = response
      this.addressData.splice(0, 0, {iSupAddID: "", sAddress: "Select Address"})
      this.selectedAddress={iSupAddID: "", sAddress: "Select Address"}

    resolve(this.statusData)

    });
  })
  }



  addSupplierContact()
  {
    console.log(this.supContactForm.getRawValue())

    var formData = this.supContactForm.getRawValue();

    var dataToSendAdd ={
      "iRequestID": 2191,
      "iSupID" :this.sup_Id,
      "iSupAddID":formData.sAddress.iSupAddID,
      "sFullName": formData.sFullName,
      "sDesignation":formData.sDesignation,
      "sMobileNo": formData.sMobileNo,
      "sContactNo":formData.sContactNo,
      "sDirectNo" :formData.sDirectNo,
      "sFaxNo" : formData.sFaxNo,
      "sPOBox":"7418529636",
      "sEmailID":formData.sEmailID
    }

    // alert(JSON.stringify(dataToSendAdd))
    this.apiService.getApiDetails(dataToSendAdd).then(response => {
      console.log("Response for Producer Add ",response)

    this.ref.close(true);

    });
  }


 updateSupplierContact()
  {
    console.log("Form Data",this.supContactForm.getRawValue())

    var formData = this.supContactForm.getRawValue();


    // alert("Update Data "+formData.sAddress.iSupAddID)

    var dataToSendEdit ={
      "iRequestID": 2192,
      "iStatusID": formData.iStatusID.iKVID,
      "iSupAddID":formData.sAddress.iSupAddID,
      "iSupContactID": this.iSupContactID,
      "iSupID": this.sup_Id,
      "sContactNo": formData.sContactNo,
      "sDesignation": formData.sDesignation,
      "sDirectNo": formData.sDirectNo,
      "sEmailID": formData.sEmailID,
      "sFaxNo": formData.sFaxNo,
      "sFullName": formData.sFullName,
      "sMobileNo": formData.sMobileNo,
      "sPOBox": "1111111111"
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


  createControl(contactData?: SupplierContactMaster): FormGroup {

    this.supContactForm = this._formBuilder.group({
      iCreatedBy: [contactData.iCreatedBy],
      iStatusID: [contactData.iStatusID],
      iSupAddID: [contactData.iSupAddID],
      iSupContactID: [contactData.iSupContactID],
      iSupID: [contactData.iSupID],
      sAddress: [contactData.sAddress],
      sContactNo: [contactData.sContactNo],
      sCreatedDate: [contactData.sCreatedDate],
      sDesignation: [contactData.sDesignation],
      sDirectNo: [contactData.sDirectNo],
      sEmailID: [contactData.sEmailID],
      sFaxNo: [contactData.sFaxNo],
      sFullName: [contactData.sFullName],
      sMobileNo: [contactData.sMobileNo],
      sPOBox: [contactData.sPOBox],
      sStatusName: [contactData.sStatusName],
      sSupName: [contactData.sSupName]
    });
    return this.supContactForm;
  }


  dropDownValidityCheck()
  {
    if(this.selectedstatus.iKVID=='')
    {
      return true
    }
    else if(this.selectedAddress.iSupAddID=='')
    {
      return true
    }
    else{
      return false
    }
  }



}
