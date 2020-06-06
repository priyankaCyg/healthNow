import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SupplierCategoryMaster } from '../../model/supplierCategory.model'
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-sup-category',
  templateUrl: './add-sup-category.component.html',
  styleUrls: ['./add-sup-category.component.css']
})

export class AddSupCategoryComponent implements OnInit {

  isEdit: boolean = false
  selectedstatus;
  selectedParent;
  statusData;
  parentData;
  iSupCatID: number;
  public supplierCategoryForm: FormGroup;
  supplierCategoryData: SupplierCategoryMaster;

  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef, private httpService: ApiService,
    private fb: FormBuilder, private toastService: ToastService) { }

  ngOnInit(): void {

    this.defaultDropDwnValue()
    this.supplierCategoryData = new SupplierCategoryMaster();
    this.supplierCategoryForm = this.createControl(this.supplierCategoryData);
    this.iSupCatID = this.config.data.iSupCatID
    if (this.iSupCatID != null || this.iSupCatID != undefined) {
      this.isEdit = true
      var dataToSendEdit = {
        "iRequestID": 2155,
        "iSupCatID": this.iSupCatID
      }
      this.httpService.callPostApi(dataToSendEdit).subscribe(
        data => {
          this.supplierCategoryData = new SupplierCategoryMaster(data.body[0]);
          this.supplierCategoryForm = this.createControl(this.supplierCategoryData);
          Promise.all([this.getStatusData(), this.getParentDrpDwn()]).then(values => {
            console.log(values);
            this.setDropDownVal();
          });
        });
    }
    else {
      this.isEdit = false
      this.supplierCategoryData = new SupplierCategoryMaster();
      this.supplierCategoryForm = this.createControl(this.supplierCategoryData);
      Promise.all([this.getStatusData(), this.getParentDrpDwn()]).then(values => {
        console.log(values);
      });
    }
    this.supplierCategoryForm.valueChanges.subscribe((changedObj: any) => {
      this.dropDownValidityCheck()
    });
  }

  //Function to set default dropdown values
  defaultDropDwnValue() {
    this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
    this.selectedParent = { iSupCatID: 0, sSupCName: "Select Parent" }
  }

  //Function to set dropdown value on edit
  setDropDownVal() {
    // Status Dropdown Select
    let selectedStatusObj = this.statusData.find(x => x.iKVID == this.supplierCategoryData.iStatusID);
    if (selectedStatusObj !== undefined) {
      this.selectedstatus = selectedStatusObj;
    }

    // Parent Dropdown Select
    let selectedParentObj = this.parentData.find(x => x.iSupCatID == this.supplierCategoryData.iParentId);
    if (selectedParentObj !== undefined) {
      this.selectedParent = selectedParentObj;
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

  //parent dropdown function
  getParentDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2156
      }
      this.httpService.getDropDownData(dataToSend4).then(
        data => {
          this.parentData = data;
          this.parentData.splice(0, 0, { iSupCatID: 0, sSupCName: "Select Parent" })
          this.selectedParent = { iSupCatID: 0, sSupCName: "Select Parent" }
          resolve(this.parentData)
        },
        error => console.log(error)
      );
    })
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

  createControl(supplierCategoryData?: SupplierCategoryMaster): FormGroup {
    this.supplierCategoryForm = this.fb.group({
      iCreatedBy: [supplierCategoryData.iCreatedBy],
      iStatusID: [supplierCategoryData.iStatusID, Validators.required],
      iSupCatID: [supplierCategoryData.iSupCatID],
      sCreatedDate: [supplierCategoryData.sCreatedDate],
      iParentId: [supplierCategoryData.iParentId],
      sSupCName: [supplierCategoryData.sSupCName,Validators.required],
      sStatusName: [supplierCategoryData.sStatusName]
    });
    return this.supplierCategoryForm;
  }

  //Function to add Supplier category
  addSupplierCategory() {
    var formData = this.supplierCategoryForm.getRawValue();
    console.log(formData, "add")
    var dataToSendAdd = {
      "iRequestID": 2151,
      "sSupCName": formData.sSupCName,
      "iParentID": formData.iParentId.iSupCatID
    }
    this.httpService.callPostApi(dataToSendAdd).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      });
  }

  //Function to update supplier category
  updateSupplierCategory() {
    var formData = this.supplierCategoryForm.getRawValue();
    console.log(formData, "edit")
    var dataToSendEdit = {
      "iRequestID": 2152,
      "sSupCName": formData.sSupCName,
      "iStatusID": formData.iStatusID.iKVID,
      "iParentID": formData.iParentId.iSupCatID,
      "iSupCatID": this.iSupCatID
    }
    this.httpService.callPostApi(dataToSendEdit).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      });
  }

  // Close Supplier category Popup
  closeDialog() {
    this.ref.close();
    this.supplierCategoryForm.reset();
  }

}
