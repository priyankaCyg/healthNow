import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { SalesOrderRoutingModule } from '../sales-order-routing.module';
import { AllocateComponent } from '../allocate/allocate.component';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-order-allocation',
  templateUrl: './order-allocation.component.html',
  styleUrls: ['./order-allocation.component.css']
})
export class OrderAllocationComponent implements OnInit {

  orderDetail: any[];
  productDetail: any[];
  public cars:any[];
  public products: any[];
  public cols: any[];
  public cols1: any[];

  public isExpanded:boolean = false;
  public rows:number =10;
  public expandedRows = {};
  public temDataLength:number = 0;

   CARS = [
    {"orderNo":"1120-3739","custrName": "Amit Shah"}
  ];


  PRODUCTS = [
    {"prdName":"Groundnut Oil","orders":"10","qty": "15"},
    {"prdName":"Horlicks","orders":"5","qty": "10"}
  ];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService) { }
  
  ngOnInit() {
   
    this.orderDetail = [
      {  prdName:'Groundnut Oil', qty:'2',batchNo:'B2',expiryDate:'01-06-2021',allocatedQty:'2'},
      {  prdName:'Horlicks', qty:'2',batchNo:'B1',expiryDate:'01-06-2021',allocatedQty:'2'}
    ] ;
    
    this.productDetail = [
      { orderNo:'1120-3739', custmName:'Amit Shah',  location:'Mumbai', qty:'2'},
      { orderNo:'1121-1234', custmName:'Nilesh Sable', location:'Mumbai', qty:'3'},
      { orderNo:'1122-3697', custmName:'Supriya Jadhav', location:'Mumbai', qty:'5'},
      { orderNo:'1123-2587', custmName:'Kiran Kumar', location:'Mumbai', qty:'4'},
      { orderNo:'1122-7412', custmName:'Ravi Yadhav', location:'Mumbai', qty:'1'}
    ];


    this.cols = [
      { field: 'orderNo', header: 'Order No' },
      { field: 'custrName', header: 'Customer Name' }
  ];

  this.cols1 = [
    { field: 'prdName', header: 'Products' },
    { field: 'orders', header: 'Orders' },
    { field: 'qty', header: 'Quantity' }
];
  this.cars = this.CARS;
  
  this.cars.length < this.rows ? this.temDataLength = this.cars.length : this.temDataLength = this.rows;


 
this.products = this.PRODUCTS;
  
  
  this.products.length < this.rows ? this.temDataLength = this.cars.length : this.temDataLength = this.rows;
  }

  openDialogForOrderAllocate() {
    const ref = this.dialogService.open(AllocateComponent, {
      data: {
      },
      header: 'Order Allocate',
      width: '90%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
  openDialogForAddress() {
    const ref = this.dialogService.open(AddressComponent, {
      data: {
      },
      header: 'Location',
      width: '30%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
  expandAll() {
    if(!this.isExpanded){
      this.cars.forEach(data =>{
        this.expandedRows[data.vin] = 1;
      })
    } else {
      this.expandedRows={};
    }
    this.isExpanded = !this.isExpanded;
  }
  onRowExpand() {
    console.log("row expanded", Object.keys(this.expandedRows).length);
    if(Object.keys(this.expandedRows).length === this.temDataLength){
      this.isExpanded = true;
    }
  }
  onRowCollapse() {
    console.log("row collapsed",Object.keys(this.expandedRows).length);
    if(Object.keys(this.expandedRows).length === 0){
      this.isExpanded = false;
    }
  }
  onPage(event: any) {
    this.temDataLength = this.cars.slice(event.first, event.first + 10).length;
    console.log(this.temDataLength);
    this.isExpanded = false;
    this.expandedRows={};
  }
  }
 
 
