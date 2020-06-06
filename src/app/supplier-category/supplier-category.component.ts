import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { AddSupCategoryComponent } from './add-sup-category/add-sup-category.component';
import { ToastService } from "../services/toast.service";
import { ConfirmationService } from 'primeng/api';
import { SupplierCategoryMaster } from '../model/supplierCategory.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-supplier-category',
  templateUrl: './supplier-category.component.html',
  styleUrls: ['./supplier-category.component.css']
})
export class SupplierCategoryComponent implements OnInit {

  items: MenuItem[];
  supplierCategory: SupplierCategoryMaster[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private httpService: ApiService, private toastService: ToastService, private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Suplier Category', routerLink: ['/suplier-category'] }
    ]);
  }

  ngOnInit(): void {
    this.getSupplierCategoryList()
  }

  //Function to fetch supplier category list
  getSupplierCategoryList() {
    var dataToSend = {
      "iRequestID": 2154
    }
    this.httpService.callPostApi(dataToSend).subscribe(
      data => {
        this.supplierCategory = data.body;
      },
      error => console.log(error)
    );
  }

  //Open dialog box for supplier category
  openDialogForProductCategory() {
    const ref = this.dialogService.open(AddSupCategoryComponent, {
      data: {},
      header: 'Add Supplier Category',
      width: '28%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getSupplierCategoryList();
      }
    });
  }

  //Dialog box to edit Supplier category
  editSupplierCategory(iSupCatID: number) {
    const ref = this.dialogService.open(AddSupCategoryComponent, {
      data: {
        iSupCatID: iSupCatID
      },
      header: 'Edit Supplier Category',
      width: '28%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getSupplierCategoryList();
      }
    });
  }

  //Function to delete Supplier category
  deleteSupplierCategory(iSupCatID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID": 2153,
          "iSupCatID": iSupCatID
        }
        this.httpService.callPostApi(dataToSendDelete).subscribe(
          data => {
            this.getSupplierCategoryList();
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          },
          error => { console.log(error) }
        );
      },
      reject: () => {}
    });
  }

}

