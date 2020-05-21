import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grn-list',
  templateUrl: './grn-list.component.html',
  styleUrls: ['./grn-list.component.css']
})
export class GrnListComponent implements OnInit {

batch: any[];
public cars:any[];
public cols: any[];
public isExpanded:boolean = false;
public rows:number =10;
public expandedRows = {};
public temDataLength:number = 0;
constructor() { }

ngOnInit() {

  this.batch = [
    {  batchNo:'B1', recvQty:'50', podNo:'00123',podDate:'19-05-2020',manfactDate:'01-01-2020',expDate:'31-12-2020'},
    { batchNo:'B2', recvQty:'50', podNo:'00124',podDate:'19-05-2020',manfactDate:'01-01-2020',expDate:'31-12-2020'}
  ] ;

  this.cols = [
    { field: 'supName', header: 'Supplier Name' },
    { field: 'reqNo', header: 'Requisition No' },
    { field: 'PoNo', header: 'PO No' },
    { field: 'product', header: 'Product' },
    { field: 'qty', header: 'Ordered Quantity'},
    { field: 'scldDate', header: 'Scheduled Date'},
];
this.cars = CARS;

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
const CARS = [
    {"supName":"SKK Suppliers","reqNo":"ALPHA/234/11-05","PoNo": "PO/SS/20200514/4","product":"Groundnut Oil","qty":"100","scldDate":"19-05-2020"}
];
