import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { SalesOrderRoutingModule } from '../sales-order-routing.module';

@Component({
  selector: 'app-delivered',
  templateUrl: './delivered.component.html',
  styleUrls: ['./delivered.component.css']
})
export class DeliveredComponent implements OnInit {

  deliverd: any[];

  public cars:any[];
  public cols: any[];
  public isExpanded:boolean = false;
  public rows:number =10;
  public expandedRows = {};
  public temDataLength:number = 0;

   CARS = [
    {"orderNo":"1120-3739","custrName": "Amit Shah","location":"Mumbai"}
  ];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService) { }
  
  ngOnInit() {
   
    this.deliverd = [
      {  prdName:'Groundnut Oil',"invoiceNo":"INV/2020/122", qty:'2', rate:'500',amount:'1000',discAmt:'15',totalAmt:'970'},
      {  prdName:'Horlicks',"invoiceNo":"INV/2020/124", qty:'3', rate:'200',amount:'600',discAmt:'15',totalAmt:'555'}
    ] ;
  

    this.cols = [
      { field: 'orderNo', header: 'Order No' },
      { field: 'custrName', header: 'Customer Name' },
      { field: 'location', header: 'Location' }
  ];
  this.cars = this.CARS;
  
  this.cars.length < this.rows ? this.temDataLength = this.cars.length : this.temDataLength = this.rows;

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
