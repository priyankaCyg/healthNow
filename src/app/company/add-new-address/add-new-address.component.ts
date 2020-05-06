import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder , FormGroup }  from '@angular/forms';
import { CompanyAddress } from 'src/app/models/company-address.model';
import { ApiService } from 'src/app/services/api.service';
import { DropdownData } from 'src/app/models/dropdown.model';
import { DynamicDialogConfig , DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.css']
})
export class AddNewAddressComponent implements OnInit {
 AddressForm: FormGroup;
 addressTypeData : DropdownData[];
 statusData : DropdownData[];
 StatesCityData ;
 tempStatusID;
 setStatusData : Object;
 tempAddressTypeID;
 setAddressTypeData : object;
  constructor(private fb:FormBuilder , private httpService: ApiService , public configData: DynamicDialogConfig, public ref:DynamicDialogRef) { }
  get AddressType(){
    return this.AddressForm.get('addressType');
   }
   get Address1(){
    return this.AddressForm.get('address1');
   }
   get Address2(){
    return this.AddressForm.get('address2');
   }
   get Pincode(){
    return this.AddressForm.get('pincode');
   }
   get State(){
    return this.AddressForm.get('state');
   }
   get City(){
    return this.AddressForm.get('city');
   }
   get Landmark(){
    return this.AddressForm.get('landmark');
   }
   get ShortName(){
    return this.AddressForm.get('shortName');
   }
   get TelNo1(){
    return this.AddressForm.get('telNo1');
   }
   get TelNo2(){
    return this.AddressForm.get('telNo2');
   }
   get FaxNo(){
    return this.AddressForm.get('faxNo');
   }
   get Status(){
    return this.AddressForm.get('Status');
   }
  async ngOnInit(): Promise<void> {
    this.resetAdressform();
    this.DisableFields();

    // get status dropdown data starts
    const statusApi = {
      "iRequestID": 2071,
      "sKVName" :"status"
    }
   await this.httpService.getDropDownData(statusApi).then(
      data => {
        this.statusData = data;
        this.statusData.unshift({"iKVID":0, "sKVValue": "Select"});
        console.log(this.statusData);
      },
      error => {
        console.log(error);
      }
    )
    this.tempStatusID = this.configData.data.iStatusID;
    let tempDataStatus =  this.statusData.filter(data=>data.iKVID == this.tempStatusID);
    this.setStatusData = tempDataStatus[0];

    // get status dropdown data ends

      // get address type dropdown data starts
     const addressTypeApi = {
      "iRequestID": 2071,
      "sKVName" :"addresstype"
    }
    await this.httpService.getDropDownData(addressTypeApi).then(
      data => {
        this.addressTypeData = data;
        this.addressTypeData.unshift({"iKVID":0, "sKVValue": "Select"});
      },
      error => {
        console.log(error);
      }
    )
    this.tempAddressTypeID = this.configData.data.iAddTypeID;
    let tempDataAddressType =  this.addressTypeData.filter(data=>data.iKVID == this.tempAddressTypeID);
    this.setAddressTypeData = tempDataAddressType[0];
       // get address type dropdown data ends

    // set values in form while editing start
     if(this.configData.data.iAddID != undefined) {
      this.AddressForm.patchValue({
        addressType: this.setAddressTypeData,
        address1: this.configData.data.sAdd1,
        address2 : this.configData.data.sAdd2,
        state: this.configData.data.sStateName,
        city: this.configData.data.sCityName,
        pincode : this.configData.data.sPostalCode,
        landmark: this.configData.data.sLandmark,
        shortName: this.configData.data.sShortName,
        telNo1 : this.configData.data.sTelNo1,
        telNo2: this.configData.data.sTelNo2,
        faxNo: this.configData.data.sFaxNo,
        Status : this.setStatusData
      });
    }
    

  }
  // set values in form while editing ends

  resetAdressform(form?: FormGroup){
    if(form != null)
    form.reset();
    this.resetFormData();
}


// get states ans city name start
  onChangePincode(){
    this.AddressForm.patchValue({
      state: '',
      city:''
    });
    let pincode_value = this.AddressForm.get('pincode').value;
      const pincodeChangesApi =  {
         "iRequestID": 2101,
         "sPostalCode" :pincode_value
     }
     this.httpService.callPostApi(pincodeChangesApi).subscribe(
       data => {
         console.log(data);
         if(data){
        this.StatesCityData = data; 
        console.log( this.StatesCityData);
         this.AddressForm.patchValue({
           state: this.StatesCityData[0].sStateName,
           city:this.StatesCityData[0].sCityName
         });
        }
        else{
          this.AddressForm.patchValue({
            state: '',
            city:''
          });
        }
     },
     error => {
       console.log(error)
     }
       )
  }
// get states and city name ends


// add and edit form start
  onSubmitAddressForm(){
    let address_type_id = this.AddressForm.get('addressType').value.iKVID;
   let status_id = this.AddressForm.get('Status').value.iKVID;
    if (this.configData.data.iAddID == undefined || this.configData.data.iAddID == null || this.configData.data.iAddID == ''){
    const addressAddApi = {
      "iRequestID": 2011,
      "iCID" :1,
      "iAddTypeID":address_type_id,
      "sAdd1": this.AddressForm.get('address1').value,
      "sAdd2":this.AddressForm.get('address2').value,
      "sLandmark" :this.AddressForm.get('landmark').value,
      "iStateCode": this.StatesCityData[0].iStateCode,
      "iCityCode":this.StatesCityData[0].iCityCode,
      "iLocationID" : this.StatesCityData[0].iLocationID,
      "sPostalCode":this.AddressForm.get('pincode').value,
      "sTelNo1":this.AddressForm.get('telNo1').value,
      "sTelNo2":this.AddressForm.get('telNo2').value,
      "sFaxNo":this.AddressForm.get('faxNo').value,
      "iStatusID":status_id,
      "sShortName":this.AddressForm.get('shortName').value 
}
this.httpService.callPostApi(addressAddApi).subscribe(
  data => {
    console.log(this.AddressForm.value);
    this.ref.close();
},
error => {
  console.log(error)
}
  )
  }
else{
  let address_id = this.configData.data.iAddID;
  let state_code = this.configData.data.iStateCode;
  let city_code = this.configData.data.iCityCode;
  let location_id = this.configData.data.iLocationID;
  let pincode_valid = this.AddressForm.controls['pincode'].valid;
  let pincode_dirty = this.AddressForm.controls['pincode'].dirty;
  if((pincode_valid && pincode_dirty)){
  const addressEditApi1 =
  {
    "iRequestID":2012,
    "iCID" :1,
    "iAddID":address_id,
    "iAddTypeID":address_type_id,
    "sAdd1": this.AddressForm.get('address1').value,
    "sAdd2":this.AddressForm.get('address2').value,
    "sLandmark" :this.AddressForm.get('landmark').value,
    "iStateCode": this.StatesCityData[0].iStateCode,
    "iCityCode":this.StatesCityData[0].iCityCode,
    "iLocationID" : this.StatesCityData[0].iLocationID,
    "sPostalCode":this.AddressForm.get('pincode').value,
    "sTelNo1":this.AddressForm.get('telNo1').value,
    "sTelNo2":this.AddressForm.get('telNo2').value,
    "sFaxNo":this.AddressForm.get('faxNo').value,
    "iStatusID":status_id,
    "sShortName":this.AddressForm.get('shortName').value
  }


  this.httpService.callPostApi(addressEditApi1).subscribe(
    data => {
    console.log(this.AddressForm.value);
    this.ref.close();
  },
  error => {
    console.log(error)
  }
    ) 
  }
  else{
      const addressEditApi2 =
      {
        "iRequestID":2012,
        "iCID" :1,
        "iAddID":address_id,
        "iAddTypeID":address_type_id,
        "sAdd1": this.AddressForm.get('address1').value,
        "sAdd2":this.AddressForm.get('address2').value,
        "sLandmark" :this.AddressForm.get('landmark').value,
        "iStateCode": state_code,
          "iCityCode":city_code,
          "iLocationID" : location_id,
        "sPostalCode":this.AddressForm.get('pincode').value,
        "sTelNo1":this.AddressForm.get('telNo1').value,
        "sTelNo2":this.AddressForm.get('telNo2').value,
        "sFaxNo":this.AddressForm.get('faxNo').value,
        "iStatusID":status_id,
        "sShortName":this.AddressForm.get('shortName').value
      }
    
    
      this.httpService.callPostApi(addressEditApi2).subscribe(
        data => {
        console.log(this.AddressForm.value);
        this.ref.close();
      },
      error => {
        console.log(error)
      }
        )
  }
}
}
 // add and edit form ends

// disable filed function start
DisableFields(){
  this.AddressForm.get('state').disable();
  this.AddressForm.get('city').disable();
}
// disable filed function ends
 
// reset form function start
resetFormData(){
  this.AddressForm = this.fb.group({
    addressType : ['',Validators.required],
    address1 : ['',Validators.required],
    address2 : ['',Validators.required],
    state : ['',Validators.required],
    city : ['',Validators.required],
    pincode : ['',Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(6)])],
    landmark : ['',Validators.required],
    shortName : ['',Validators.required],
    telNo1 : ['',Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(13)])],
    telNo2 : ['',Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(13)])],
    faxNo : ['',Validators.required],
    Status : ['',Validators.required]
  })
}

}
