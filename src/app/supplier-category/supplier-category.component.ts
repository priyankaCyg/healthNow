import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { AddSupCategoryComponent } from './add-sup-category/add-sup-category.component';
import { from } from 'rxjs';

import {APIService} from '../services/apieservice';
import { ToastService } from "../services/toast.service";
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-supplier-category',
  templateUrl: './supplier-category.component.html',
  styleUrls: ['./supplier-category.component.css']
})
export class SupplierCategoryComponent implements OnInit {

  items: MenuItem[];

  supplierCategory: any[];
  
    constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService,private _apiService:APIService,
      private toastService: ToastService,
      private confirmationService: ConfirmationService) {
      this.breadcrumbService.setItems([
          { label: 'Dashboard' },
          { label: 'Suplier Category', routerLink: ['/app/suplier-category'] }
      ]);
  }

  ngOnInit(): void {
        
    // this.supplierCategory = [
    //   {supCategoryName: 'Courier',  status: 'Active'},
    //   {supCategoryName: 'Supplier',  status: 'Active'}
    // ];
  this.showSupplierCategory()

  }


  
  showSupplierCategory()
  {
    var dataToSend ={
      "iRequestID": 2154
  }
    this._apiService.getDetails(dataToSend).then(response => {
      console.log("Response for supplierCategory ",response)
      this.supplierCategory = response
    });
  }



editSupplierCategory(iSupCatID) {
  const ref = this.dialogService.open( AddSupCategoryComponent , {
    data: {
      iSupCatID:iSupCatID
    },
    header: 'Edit Supplier Category',
    width: '28%'
  });

  ref.onClose.subscribe((success: boolean) => {
    if (success) {
      this.toastService.addSingle("success", "Updated successfully", "");
    this.showSupplierCategory();

    }
  });
  }

  deleteSupplierCategory(iSupCatID)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID":2153,
          "iSupCID":iSupCatID
        }

        this._apiService.getDetails(dataToSendDelete).then(response => {
          console.log("Response for Brand Delete ",response)
          this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
          this.showSupplierCategory();
        });
      },
      reject: () => {
  this.toastService.addSingle("info", "Rejected", "Rejected");

      }
  });
  }


  openDialogForProductCategory() {
    const ref = this.dialogService.open( AddSupCategoryComponent  , {
      data: {
      },
      header: 'Add Supplier Category',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.toastService.addSingle("success", "Record Added successfully", "");
        this.showSupplierCategory();
      }
    });
  }
}
