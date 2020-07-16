import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { SalesOrderRoutingModule } from '../sales-order-routing.module';
import { AllocateComponent } from '../allocate/allocate.component';
import { AddressComponent } from '../address/address.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-allocation',
  templateUrl: './order-allocation.component.html',
  styleUrls: ['./order-allocation.component.css']
})
export class OrderAllocationComponent implements OnInit {

  orderDetail: any[];
  productDetail: any[];
  customerAllocData: any[];
  public products: any[];
  public cols: any[];
  public cols1: any[];

  public isExpanded: boolean = false;
  public rows: number = 10;
  public expandedRows = {};
  public temDataLength: number = 0;
  customer = [];

  PRODUCTS = [
    { "prdName": "Groundnut Oil", "orders": "10", "qty": "15" },
    { "prdName": "Horlicks", "orders": "5", "qty": "10" }
  ];

  constructor(private breadcrumbService: BreadcrumbService,
    private httpService: ApiService, private router: Router) { }

  ngOnInit() {

    this.productDetail = [
      { orderNo: '1120-3739', custmName: 'Amit Shah', location: 'Mumbai', qty: '2' },
      { orderNo: '1121-1234', custmName: 'Nilesh Sable', location: 'Mumbai', qty: '3' },
      { orderNo: '1122-3697', custmName: 'Supriya Jadhav', location: 'Mumbai', qty: '5' },
      { orderNo: '1123-2587', custmName: 'Kiran Kumar', location: 'Mumbai', qty: '4' },
      { orderNo: '1122-7412', custmName: 'Ravi Yadhav', location: 'Mumbai', qty: '1' }
    ];

    this.cols = [
      { field: 'sSONo', header: 'Order No' },
      { field: 'sCustomerName', header: 'Customer Name' }
    ];

    this.cols1 = [
      { field: 'prdName', header: 'Products' },
      { field: 'orders', header: 'Orders' },
      { field: 'qty', header: 'Quantity' }
    ];
    this.getOrderAllocList();
    this.customerAllocData = this.customer;
    this.customerAllocData.length < this.rows ? this.temDataLength = this.customerAllocData.length : this.temDataLength = this.rows;

    this.products = this.PRODUCTS;
    this.products.length < this.rows ? this.temDataLength = this.products.length : this.temDataLength = this.rows;
  }

  //Function to get Order Allocation list
  getOrderAllocList() {
    const orderAllocAPI = {
      "iRequestID": 2431,
    }
    this.httpService.callPostApi(orderAllocAPI).subscribe(
      data => {
        this.customerAllocData = data.body;
      },
      error => { console.log(error) }
    )
  }

  //code for get Order Alocation child data table
  getOrderrAllocChildList(iSOID: Number) {
    const ordrAllocChildAPI = {
      "iRequestID": 2432,
      "iSOID": iSOID
    }
    this.httpService.callPostApi(ordrAllocChildAPI).subscribe(
      data => {
        this.orderDetail = data.body;
      },
      error => { console.log(error) }
    )
  }

  //Order Allocation button click function
  orderAllocClick(customersData) {
    localStorage.setItem('orderAllocDetails', JSON.stringify({ customersData }));
    this.router.navigate(['/sales-order/customer-order-allocation']);
  }

  //Function to get Product Allocation list
  getProductAllocList() {
    const productAllocAPI = {
      "iRequestID": 2359,
    }
    this.httpService.callPostApi(productAllocAPI).subscribe(
      data => {
        this.products = data.body;
      },
      error => { console.log(error) }
    )
  }

  //code for get Product Allocation child data table
  getProductAllocChildList(iSOID: Number) {
    const productAllocChildAPI = {
      "iRequestID": 2362,
      "iSOID": iSOID
    }
    this.httpService.callPostApi(productAllocChildAPI).subscribe(
      data => {
        this.productDetail = data.body;
      },
      error => { console.log(error) }
    )
  }

  //Product Allocation button click function
  productAllocClick(productsData) {
    localStorage.setItem('productAllocDetails', JSON.stringify({ productsData }));
    this.router.navigate(['/sales-order/product-order-allocation']);
  }

  expandAll() {
    if (!this.isExpanded) {
      this.customerAllocData.forEach(data => {
        this.expandedRows[data.iSOID] = 1;
      })
    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  onRowExpand() {
    console.log("row expanded", Object.keys(this.expandedRows).length);
    if (Object.keys(this.expandedRows).length === this.temDataLength) {
      this.isExpanded = true;
    }
  }
  onRowCollapse() {
    console.log("row collapsed", Object.keys(this.expandedRows).length);
    if (Object.keys(this.expandedRows).length === 0) {
      this.isExpanded = false;
    }
  }

  onPage(event: any) {
    this.temDataLength = this.customerAllocData.slice(event.first, event.first + 10).length;
    console.log(this.temDataLength);
    this.isExpanded = false;
    this.expandedRows = {};
  }

}


