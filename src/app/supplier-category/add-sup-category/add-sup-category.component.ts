import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import {APIService} from '../../services/apieservice';
import {DynamicDialogConfig,DynamicDialogRef} from 'primeng/dynamicdialog';
import {SupplierCategoryMaster} from '../../model/supplierCategory.model'

@Component({
  selector: 'app-add-sup-category',
  templateUrl: './add-sup-category.component.html',
  styleUrls: ['./add-sup-category.component.css']
})
export class AddSupCategoryComponent implements OnInit {


  isEdit :boolean = false

  selectedstatus;
  selectedParent;

  statusData;
  parentData;
  
  iSupCatID;

  public supplierCategoryForm: FormGroup;
  supplierCategoryData : SupplierCategoryMaster;

  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef,
    private apiService:APIService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {


    this.defaultDropDwnValue()

    this.supplierCategoryData = new SupplierCategoryMaster();
    this.supplierCategoryForm = this.createControl(this.supplierCategoryData);

    this.iSupCatID = this.config.data.iSupCatID
  if(this.iSupCatID!=null)
  {
    this.isEdit = true

   var dataToSendEdit =  {
      "iRequestID": 2155,
      "iSupCatID":this.iSupCatID
  }

  this.apiService.getDetails(dataToSendEdit).then(response => {

    console.log("Response of Edit Supplier Category ",response)

    this.supplierCategoryData = new SupplierCategoryMaster(response[0]);
    this.supplierCategoryForm = this.createControl(this.supplierCategoryData);

    Promise.all([ this.getStatusDrpDwn(),this.getParentDrpDwn()]).then(values=> {
      console.log(values);
      this.setDropDownVal()
    });

  });

  }
  else{
    this.isEdit = false

    Promise.all([this.getStatusDrpDwn(),this.getParentDrpDwn()]).then(values=> {
      console.log(values);
    });
  }

  }


  defaultDropDwnValue()
  {
    this.selectedstatus={iKVID: "", sKVValue: "Select Status"}
    this.selectedParent={iSupCatID: 0, sSupCName: "Select Parent"}

  }

  setDropDownVal()
  {
     // Status Dropdown Select
     let selectedStatusObj = this.statusData.find(x => x.iKVID==this.supplierCategoryData.iStatusID);

     if (selectedStatusObj !== undefined) {
         this.selectedstatus = selectedStatusObj;
       }


       // Status Dropdown Select
     let selectedParentObj = this.parentData.find(x => x.iSupCatID==this.supplierCategoryData.iParentId);

     if (selectedParentObj !== undefined) {
         this.selectedParent = selectedParentObj;
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
      this.statusData.splice(0, 0, {iKVID: 0, sKVValue: "Select Status"})
      this.selectedstatus={iKVID: 0, sKVValue: "Select Status"}

    resolve(this.statusData)

    });
  })
  }


  getParentDrpDwn()
  {
  return new Promise((resolve, reject) =>{
    var dataToSend4 = {
      "iRequestID":2156
    }

    this.apiService.getDetails(dataToSend4).then(response => {
      console.log("Response for Parent ",response)
      this.parentData = response
      this.parentData.splice(0, 0, {iSupCatID: 0, sSupCName: "Select Parent"})
      this.selectedParent={iSupCatID: 0, sSupCName: "Select Parent"}

    resolve(this.parentData)

    });
  })
  }



  addSupplierCategory()
  {
    console.log(this.supplierCategoryForm.getRawValue())

    var formData = this.supplierCategoryForm.getRawValue();
    // alert(JSON.stringify(formData))


    var dataToSendAdd ={
      "iRequestID": 2151,
      "sSupCName":formData.sSupCName,
      "iParentID":formData.iParentId.iSupCatID
    }

    alert(JSON.stringify(dataToSendAdd))
    this.apiService.getApiDetails(dataToSendAdd).then(response => {
      console.log("Response for Producer Add ",response)

    this.ref.close(true);

    });
  }


  updateSupplierCategory()
  {
    console.log(this.supplierCategoryForm.getRawValue())

    var formData = this.supplierCategoryForm.getRawValue();

    var dataToSendEdit ={
      "iRequestID": 2152,
      "sSupCName":formData.sSupCName,
      "iStatusID":formData.iStatusID.iKVID,
      "iParentID":formData.iParentId.iSupCatID,
      "iSupCatID":this.iSupCatID
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


  createControl(supplierCategoryData?: SupplierCategoryMaster): FormGroup {

    this.supplierCategoryForm = this._formBuilder.group({
      iCreatedBy: [supplierCategoryData.iCreatedBy],
      iStatusID: [supplierCategoryData.iStatusID],
      iSupCatID: [supplierCategoryData.iSupCatID],
      sCreatedDate: [supplierCategoryData.sCreatedDate],
      iParentId : [supplierCategoryData.iParentId],
      sSupCName: [supplierCategoryData.sSupCName, [Validators.required]],
      sStatusName: [supplierCategoryData.sStatusName]
    });
    return this.supplierCategoryForm;
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
