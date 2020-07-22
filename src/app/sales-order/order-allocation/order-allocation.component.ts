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
import { config } from 'src/config';
import { customerAllocData } from 'src/app/model/customer-order-allocation';
import { customerAllocChildData } from 'src/app/model/customer-order-alloc-child';

@Component({
  selector: 'app-order-allocation',
  templateUrl: './order-allocation.component.html',
  styleUrls: ['./order-allocation.component.css']
})

export class OrderAllocationComponent implements OnInit {

  orderDetail: customerAllocChildData[];
  productDetail: any[];
  customerAlloc: customerAllocData[] = [];
  productsAllocData: any[];
  noRecordFound: string;
  index: number = 0;

  public cols: any[];
  public cols1: any[];
  public isExpanded: boolean = false;
  public rows: number = 10;
  public expandedRows = {};
  public temDataLength: number = 0;
  customer = [];
  PRODUCTS = [];

  constructor(private breadcrumbService: BreadcrumbService, private httpService: ApiService, private router: Router) { }

  ngOnInit() {
    this.index = +localStorage.getItem('tabIndex');
    localStorage.removeItem('tabIndex');
    this.noRecordFound = config.noRecordFound;
    this.cols = [
      { field: 'sSONo', header: 'Order No.' },
      { field: 'sCustomerName', header: 'Customer Name' }
    ];

    this.cols1 = [
      { field: 'sOrders', header: 'No. of Orders' },
      { field: 'iQty', header: 'Quantity' }
    ];
    this.getOrderAllocList();
    this.customerAlloc = this.customer;
    this.customerAlloc.length < this.rows ? this.temDataLength = this.customerAlloc.length : this.temDataLength = this.rows;
    this.getProductAllocList();
    this.productsAllocData = this.PRODUCTS;
    this.productsAllocData.length < this.rows ? this.temDataLength = this.productsAllocData.length : this.temDataLength = this.rows;
  }

  //Function to get Order Allocation list
  getOrderAllocList() {
    const orderAllocAPI = {
      "iRequestID": 2431,
    }
    this.httpService.callPostApi(orderAllocAPI).subscribe(
      data => {
        this.customerAlloc = data.body;
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
    localStorage.setItem('tabIndex', '0');
    localStorage.setItem('orderAllocDetails', JSON.stringify({ customersData }));
    this.router.navigate(['/sales-order/customer-order-allocation']);
  }

  //Function to get Product Allocation list
  getProductAllocList() {
    const productAllocAPI = {
      "iRequestID": 2433,
    }
    this.httpService.callPostApi(productAllocAPI).subscribe(
      data => {
        this.productsAllocData = data.body;
      },
      error => { console.log(error) }
    )
  }

  //code for get Product Allocation child data table
  getProductAllocChildList(iPrdID: Number) {
    const productAllocChildAPI = {
      "iRequestID": 2434,
      "iPrdID": iPrdID
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
    localStorage.setItem('tabIndex', '1');
    localStorage.setItem('productAllocDetails', JSON.stringify({ productsData }));
    this.router.navigate(['/sales-order/product-order-allocation']);
  }

  expandAll() {
    if (!this.isExpanded) {
      this.customerAlloc.forEach(data => {
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
    this.temDataLength = this.customerAlloc.slice(event.first, event.first + 10).length;
    console.log(this.temDataLength);
    this.isExpanded = false;
    this.expandedRows = {};
  }

}


