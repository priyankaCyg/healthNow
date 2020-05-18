import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { BreadcrumbService } from '../breadcrumb.service';
import { NewBrandComponent } from './new-brand/new-brand.component';
import {APIService} from '../services/apieservice';
import { ToastService } from "../services/toast.service";
import {ConfirmationService} from 'primeng/api';
import {LoginService} from '../../app/services/login.service'

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {


  brand: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService,private _apiService:APIService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,private loginService:LoginService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Brand', routerLink: ['/app/brand'] }
    ]);
}
ngOnInit() {

  this.loginService.checkBrowserClosed();

  
  this.showBrand();


}

showBrand()
{
  var dataToSend ={
    "iRequestID": 2134
}
  this._apiService.getDetails(dataToSend).then(response => {
    console.log("Response for Brand ",response)
    this.brand = response
  });
}

openDialogFornewBrand() {
  const ref = this.dialogService.open( NewBrandComponent , {
    data: {
    },
    header: 'Add New Brand',
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
    this.showBrand()
  });
}


editBrand(brandId) {
  const ref = this.dialogService.open( NewBrandComponent , {
    data: {
      brandId:brandId
    },
    header: 'Edit Brand',
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
    this.showBrand()
  });
  }

  deleteBrand(brandId)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID":2133,
          "iBrandID":brandId
        }

        this._apiService.getDetails(dataToSendDelete).then(response => {
          console.log("Response for Brand Delete ",response)
          this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
          this.showBrand();
        });
      },
      reject: () => {
  this.toastService.addSingle("info", "Rejected", "Rejected");

      }
  });
  }

}