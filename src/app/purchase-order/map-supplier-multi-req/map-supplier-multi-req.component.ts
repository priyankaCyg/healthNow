import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-map-supplier-multi-req',
  templateUrl: './map-supplier-multi-req.component.html',
  styleUrls: ['./map-supplier-multi-req.component.css']
})
export class MapSupplierMultiReqComponent implements OnInit {
  
  requisitionDatails: any[];
  requisitionData: any[];
  supplierRate: any[];
  data;
  productCategory:string;
  productName : string;
  totalquantity : number;
  productId:number;
  selectedValues : string[] = [];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService,
    private httpService: ApiService, private commonService: CommonService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
}

  ngOnInit(): void {
    this.commonService.captureData$.subscribe(data => this.data = data);
    console.log(this.data)
    this.requisitionData = Object.values(this.data)
    console.log(this.requisitionData);
    sessionStorage.setItem('Product Category', this.data.sPCName);
    sessionStorage.setItem('Product Name', this.data.sPrdName);
    sessionStorage.setItem('Product id', this.data.iPrdID);
    this.productCategory = sessionStorage.getItem('Product Category');
    this.productName = sessionStorage.getItem('Product Name');
    this.productId = +sessionStorage.getItem('Product id');
    this.getProductReq();
    this.getSupplierRate();

  }

  //get requisition detail data 
  getProductReq() {
    const productReqAPI = {
      "iRequestID": 2338,
      "iPrdID":this.productId
    }
    this.httpService.callPostApi(productReqAPI).subscribe(
      data => {
        this.requisitionDatails = data.body;
        this.getTotalCount();
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
      },
      error => { console.log(error) }
    )
  }

  // select single checkbox
  checkBoxValidation(){
    const latestSupplier= this.selectedValues[this.selectedValues.length - 1];
    this.selectedValues.length = 0;
    this.selectedValues.push(latestSupplier);
  }

}
