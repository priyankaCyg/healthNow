import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { orderReqData } from 'src/app/model/orderRequisition.model';
import { supplierReqData } from 'src/app/model/supplierRequisition.model';

@Component({
  selector: 'app-map-supplier',
  templateUrl: './map-supplier.component.html',
  styleUrls: ['./map-supplier.component.css']
})
export class MapSupplierComponent implements OnInit {

  items: MenuItem[];
  requisitionData: orderReqData[];
  data: object;
  supplierData: supplierReqData[];
  selectedValues: supplierReqData[] = [];
  discount: number;
  discount_amnt: number;
  purchase_amnt : number;
  disc: number;
  isDisable: boolean;

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService, private httpService: ApiService,
    private commonService: CommonService, private toastService: ToastService, private router: Router) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
  }

  ngOnInit(): void {
    // this.commonService.captureData$.subscribe(data => this.data = data);
    // this.requisitionData = Object.values(this.data)
    this.isDisable = true;
    this.data = JSON.parse(localStorage.getItem('orderData'));
    this.requisitionData = Object.values(this.data);
    this.getSupplierList();
  }

  //Function to get Supplier list
  getSupplierList() {
    const supplierAPI = {
      "iRequestID": 2336,
      "iPReqID": this.requisitionData[0].iPReqID
    }
    this.httpService.callPostApi(supplierAPI).subscribe(
      data => {
        this.supplierData = data.body;
      },
      error => { console.log(error) }
    )
  }

  //Function to check validation of Checkbox
  checkBoxValue() {
    if (this.selectedValues.length > 1) {
      this.isDisable = true;
      this.toastService.addSingle("warn", "Please Select only one Supplier", "");
    } else if (this.selectedValues.length == 1) {
      if (this.selectedValues[0].discount) {
        this.isDisable = false;
      }
      else {
        this.toastService.addSingle("warn", "Please Enter Discount", "");
        this.isDisable = true;
      }
    }
  }

  //Function to calculate Discount amount and purchase price 
  changeDiscount(disc: number, index: number) {
    let obj = this.supplierData[index];
    let discount_val:number = disc / 100;
    this.discount_amnt = parseInt((discount_val * obj.iPurchaseAmt).toFixed(2));
    this.purchase_amnt = parseInt((obj.iPurchaseAmt - this.discount_amnt).toFixed(2));
    obj.discount_amnt = this.discount_amnt;
    obj.purchase_amnt = this.purchase_amnt;
  }

  //Function to save requisition
  saveReq() {
    const supplierAPI = {
      "iRequestID": 2337,
      "iPReqID": this.requisitionData[0].iPReqID,
      "iSupID": this.selectedValues[0].iSupID,
      "iDisPer": this.selectedValues[0].discount
    }
    this.httpService.callPostApi(supplierAPI).subscribe(
      data => {
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
        this.router.navigate(['/purchase-order/product-requisition']);
      },
      error => { console.log(error) }
    )
  }
}


