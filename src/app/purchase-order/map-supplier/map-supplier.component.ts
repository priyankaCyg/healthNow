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
  discount: number;
  discount_amnt: number;
  purchase_amnt: number;
  disc: number;
  req_no_display: string;

  totalquantity: number;
  selectedValues: string[] = [];
  completeSupplierData: any;
  discountAmount: number;
  discountAmountEach: number;
  totalAmount: number;
  discountPer: number;
  isDisable: boolean = true;
  isDisableDiscount: boolean = true;
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
    this.totalquantity = this.requisitionData[0].iQty;
    this.req_no_display = this.requisitionData[0]['sRequisionNo'];
    this.getSupplierList();
  }

  //Function to get Supplier list
  getSupplierList() {
    const supplierAPI = {
      "iRequestID": 2336,
      "iPrdID": this.requisitionData[0].iPrdID
    }
    this.httpService.callPostApi(supplierAPI).subscribe(
      data => {
        this.supplierData = data.body;
        console.log(this.supplierData);
      },
      error => { console.log(error) }
    )
  }


  // select single checkbox
  checkBoxValidation(suppRate) {
    this.completeSupplierData = suppRate;
    const latestSupplier = this.selectedValues[this.selectedValues.length - 1];
    this.selectedValues.length = 0;
    this.selectedValues.push(latestSupplier);
    console.log(this.selectedValues)
    if (this.selectedValues[0]) {
      this.isDisableDiscount = false;
      this.isDisable = false;
    }
    else if (this.selectedValues[0] == undefined) {
      this.isDisableDiscount = true;
      this.isDisable = true;
    }
  }

  // calculate price
  calculateTotalPrice() {

    if (this.discountPer) {
      let supplierRate = this.completeSupplierData.iPurchaseAmt;
      let discountAmount = parseFloat((supplierRate * this.discountPer).toFixed(2));
      let discountPerAmount = parseFloat((discountAmount / 100).toFixed(2));
      this.discountAmount = parseFloat((discountPerAmount * this.totalquantity).toFixed(2))
      let amountEach = parseFloat((supplierRate - discountPerAmount).toFixed(2));
      this.discountAmountEach = amountEach;
      let totalAmount = parseFloat((this.totalquantity * amountEach).toFixed(2));
      this.totalAmount = totalAmount;
      console.log(totalAmount);
    }
    else {
      this.discountAmount = 0;
      this.discountAmountEach = 0;
      this.totalAmount = 0
    }
  }

  saveOrderRequisition() {
    let discountPercentage = +this.discountPer;
    const orderReqAPI = {
      "iRequestID": 2337,
      "iPReqID": this.requisitionData[0].iPReqID,
      "iSupID": this.completeSupplierData.iSupID,
      "iDisPer": discountPercentage
    }
    this.httpService.callPostApi(orderReqAPI).subscribe(
      data => {
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
        this.router.navigate(['/purchase-order/product-requisition']);
      },
      error => { console.log(error) }
    )
  }

}


