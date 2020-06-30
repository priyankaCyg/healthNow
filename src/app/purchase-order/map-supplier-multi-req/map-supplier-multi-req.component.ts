import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { FormGroup, NgForm } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { orderReqData } from 'src/app/model/orderRequisition.model';
import { productReqData } from 'src/app/model/productRequisition.model';
import { supplierReqData } from 'src/app/model/supplierRequisition.model';

@Component({
  selector: 'app-map-supplier-multi-req',
  templateUrl: './map-supplier-multi-req.component.html',
  styleUrls: ['./map-supplier-multi-req.component.css']
})
export class MapSupplierMultiReqComponent implements OnInit {
  
  requisitionDatails: orderReqData[];
  requisitionData: productReqData[];
  supplierRate: supplierReqData[];
  data : [];
  productCategory:string;
  productName : string;
  productVariant : string;
  productUnit : string;
  totalquantity : number;
  productId:number;
  selectedValues : string[] = [];
  completeSupplierData : any;
  discountAmount:number;
  discountAmountEach:number;
  totalAmount:number;
  discountPer : number;
  isDisable: boolean = true;
  isDisableDiscount:boolean = true;

  

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService,
    private httpService: ApiService, private commonService: CommonService,private toastService: ToastService,
    private router: Router) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
}

  ngOnInit(): void {
    // this.commonService.captureData$.subscribe(data => this.data = data);
    // console.log(this.data);
    this.data = JSON.parse(localStorage.getItem('productData'));
    this.requisitionData = Object.values(this.data);
    console.log(this.requisitionData);
    this.productCategory = this.requisitionData[0].sPCName;
    this.productName = this.requisitionData[0].sPrdName;
    this.productVariant = this.requisitionData[0].sVariant;
    this.productUnit = this.requisitionData[0].sUnitSymbol;
    this.productId = +this.requisitionData[0].iPrdID;
    this.getProductReq();
    this.getSupplierRate();
  }

  //get requisition detail data 
  getProductReq() {
    const productReqAPI = {
      "iRequestID": 2338,
      "iPrdID":this.requisitionData[0].iPrdID
    }
    this.httpService.callPostApi(productReqAPI).subscribe(
      data => {
        this.requisitionDatails = data.body;
        this.getTotalCount();
        if(this.requisitionDatails.length){
          this.isDisable = false;
        }
        else{
          this.isDisable = true;
        }
      },
      error => { console.log(error) }
    )
  }

  //get total quantity count
  getTotalCount(){
    let temp_quantities = new Array();
    if(this.requisitionDatails.length){
      this.requisitionDatails.map((val => {
        temp_quantities.push(val.iQty);
      }))
      let total = temp_quantities.map(Number);
      let sum = total.reduce((a,b) => a + b );
      this.totalquantity = sum;
    }
  }

  // get supplier rate list 
  getSupplierRate(){
    const suppRateAPI = {
      "iRequestID": 23312,
      "iPrdID":this.productId
    }
    this.httpService.callPostApi(suppRateAPI).subscribe(
      data => {
        this.supplierRate = data.body;
        if(this.supplierRate.length){
          this.isDisable = false;
        }
        else{
          this.isDisable = true;
        }
      },
      error => { console.log(error) }
    )
  }

  // select single checkbox
  checkBoxValidation(suppRate){
    this.completeSupplierData = suppRate;
    const latestSupplier= this.selectedValues[this.selectedValues.length - 1];
    this.selectedValues.length = 0;
    this.selectedValues.push(latestSupplier);
    console.log(this.selectedValues)
    if(this.selectedValues[0]){
      this.isDisableDiscount = false;
      this.isDisable = false;
    }
    else if(this.selectedValues[0] == undefined){
      this.isDisableDiscount = true;
      this.isDisable = true;
    }
  }

  // calculate price
  calculateTotalPrice(){
    if(this.discountPer){
    let supplierRate = this.completeSupplierData.iPurchaseAmt;
    let discountAmount = parseFloat((supplierRate * this.discountPer).toFixed(2));
    let discountPerAmount = parseFloat((discountAmount / 100).toFixed(2));
    this.discountAmount = parseFloat((discountPerAmount * this.totalquantity).toFixed(2))
    let amountEach = parseFloat((supplierRate - discountPerAmount).toFixed(2)) ;
    this.discountAmountEach = amountEach ;
    let totalAmount = parseFloat((this.totalquantity * amountEach).toFixed(2)) ;
    this.totalAmount = totalAmount;
    console.log(totalAmount);
    }
    else{
      this.discountAmount = 0;
      this.discountAmountEach = 0;
      this.totalAmount=0
    }
  }

  // save form 
  saveProductRequisition(){
    let discountPercentage = +this.discountPer;
    const productReqAPI = {
      "iRequestID": 2339,
      "iPrdID":this.productId,
      "iSupID":this.completeSupplierData.iSupID,
      "iDisPer":discountPercentage
    }
    this.httpService.callPostApi(productReqAPI).subscribe(
      data => {
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
        this.router.navigate(['/purchase-order/product-requisition']);
      },
      error => { console.log(error) }
    )
  }

}
