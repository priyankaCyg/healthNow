import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng';
import { BreadcrumbService } from '../breadcrumb.service';
import { NewBrandComponent } from './new-brand/new-brand.component';
import { ToastService } from "../services/toast.service";
import { ConfirmationService } from 'primeng/api';
import { ApiService } from '../services/api.service';
import { BrandMaster } from '../model/brand.model';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brand: BrandMaster[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService, private httpService: ApiService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Brand', routerLink: ['/brand'] }
    ]);
  }

  ngOnInit() {
    this.getBrandList();
  }

  //Function to get brand list
  getBrandList() {
    var dataToSend = {
      "iRequestID": 2134
    }
    this.httpService.callPostApi(dataToSend).subscribe(
      data => {
        this.brand = data.body;
      },
      error => console.log(error)
    );
  }

  //Dialog box to add brand
  openDialogFornewBrand() {
    const ref = this.dialogService.open(NewBrandComponent, {
      data: {},
      header: 'Add New Brand',
      width: '28%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getBrandList();
      }
    });
  }

  //Dialog box to edit brand
  editBrand(brandId: number) {
    const ref = this.dialogService.open(NewBrandComponent, {
      data: {
        brandId: brandId
      },
      header: 'Edit Brand',
      width: '28%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getBrandList();
      }
    });
  }

  //Function to delete brand
  deleteBrand(brandId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID": 2133,
          "iBrandID": brandId
        }
        this.httpService.callPostApi(dataToSendDelete).subscribe(
          data => {
            this.getBrandList();
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          },
          error => { console.log(error) }
        );
      },
      reject: () => { }
    });
  }

}