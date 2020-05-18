import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { AddSupCategoryComponent } from './add-sup-category/add-sup-category.component';
import { from } from 'rxjs';

import {APIService} from '../services/apieservice';
import { ToastService } from "../services/toast.service";
import {ConfirmationService} from 'primeng/api';
import {LoginService} from '../../app/services/login.service'

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
      private confirmationService: ConfirmationService,private loginService:LoginService) {
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
    this.loginService.checkBrowserClosed();


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

  ref.onClose.subscribe((message: any) => {
    if (message.StatusCode=="200") {
      this.toastService.addSingle("success", message.StatusMessage, "");
    }
    else
    {
      this.toastService.addSingle("error", message.StatusMessage, "");
    }
    this.showSupplierCategory();
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
          this.toastService.addSingle("info", response.headers.get('StatusMessage'), "");
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

    ref.onClose.subscribe((message: any) => {
      if (message.StatusCode=="200") {
        this.toastService.addSingle("success", message.StatusMessage, "");
      }
      else
      {
        this.toastService.addSingle("error", message.StatusMessage, "");
      }
      this.showSupplierCategory()
    });
  }
}
