import { Component, OnInit } from '@angular/core';
import { DialogService, ConfirmationService } from 'primeng';
import { AllocateProductComponent } from '../allocate-product/allocate-product.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-invoice-creation',
  templateUrl: './product-invoice-creation.component.html',
  styleUrls: ['./product-invoice-creation.component.css']
})
export class ProductInvoiceCreationComponent implements OnInit {

  prdOrderDetail: any[];
  productDetail: any[];
  data: object;
  responseData: object;
  batch: any[];
  productAllocation = [];
  allocateBtn: boolean = false;
  public products: any[];
  public cols: any[];
  public cols1: any[];
  public isExpanded: boolean = false;
  public rows: number = 10;
  public expandedRows = {};
  public temDataLength: number = 0;
  cusInvoice = [];

  constructor(private dialogService: DialogService, private httpService: ApiService, private toastService: ToastService,
    private confirmationService: ConfirmationService, private router: Router) { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('productAllocDetails'));
    this.prdOrderDetail = Object.values(this.data);
    this.getProductAllocChildList();
    // if(this.prdOrderDetail[0].iQty <= 5){
    //   this.allocateBtn = false; 
    // }
    // else{
    //   this.allocateBtn = true;
    // }
    // this.prdOrderDetail = [
    //   {  prdName:'Groundnut Oil',order:'5', qty:'15',inStock:'50',pending:'5'}
    // ] ;
    this.cols = [
      { field: 'sSONo', header: 'Order No.' },
      { field: 'sCustomerName', header: 'Customer Name' },
      { field: 'iQty', header: 'Quantity' }
    ];
    this.productDetail = this.productAllocation;
    this.productDetail.length < this.rows ? this.temDataLength = this.productDetail.length : this.temDataLength = this.rows;
  }


  getProductAllocChildList() {
    const productAllocChildAPI = {
      "iRequestID": 24310,
      "iPrdID": this.prdOrderDetail[0].iPrdID
    }
    this.httpService.callPostApi(productAllocChildAPI).subscribe(
      data => {
        this.productDetail = data.body;
      },
      error => { console.log(error) }
    )
  }

  //Open Dialog for reject alocated product
  rejectAllocProduct(prdDetail) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to cancel this Record ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const dataToSendReject = {
          "iRequestID": 24311,
          "iSOPrdID": prdDetail.iSOPrdID,
        }
        this.httpService.callPostApi(dataToSendReject).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.getProductAllocChildList();
          },
          (error) => console.log(error)
        );
      },
      reject: () => { }
    });
  }


  expandAll() {
    if (!this.isExpanded) {
      this.productDetail.forEach(data => {
        this.expandedRows[data.iSOPrdID] = 1;
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
    this.temDataLength = this.productDetail.slice(event.first, event.first + 10).length;
    console.log(this.temDataLength);
    this.isExpanded = false;
    this.expandedRows = {};
  }

  getBatchAllocChildList(iSOPrdID: Number) {
    const ordrAllocChildAPI = {
      "iRequestID": 2436,
      "iSOPrdID": iSOPrdID
    }
    this.httpService.callPostApi(ordrAllocChildAPI).subscribe(
      data => {
        this.batch = data.body;
      },
      error => { console.log(error) }
    )
  }

  saveConfirmAllocate() {
    this.productDetail.forEach((key, index) => {
      let iPrdID = this.productDetail[index].iPrdID;
      let iSOPrdID = this.productDetail[index].iSOPrdID;
      if (iSOPrdID != null || iSOPrdID != undefined) {
        let tempArray = {
          "iPrdID": iPrdID,
          "iSOPrdID": iSOPrdID
        }
        this.cusInvoice.push(tempArray);
      }
    });
    const data = {
      "iRequestID": 2435,
      "sGINAllocation": this.cusInvoice
    }
    console.log(data, "data");
    // this.httpService.callPostApi(data).subscribe(
    //   (data) => {
    //     this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
    //     this.router.navigate(['/sales-order/delivery-list']);
    //   },
    //   (error) => console.log(error)
    // );
  }

}
