import { Component, OnInit } from '@angular/core';
import { DialogService, ConfirmationService } from 'primeng';
import { AllocateProductComponent } from '../allocate-product/allocate-product.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-invoice-creation',
  templateUrl: './product-invoice-creation.component.html',
  styleUrls: ['./product-invoice-creation.component.css']
})
export class ProductInvoiceCreationComponent implements OnInit {

  prdOrderDetail: any[];
  productDetail: any[];
  ordersDetail: any[];
  orderDetail: any[];
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
  constructor(private dialogService: DialogService, private httpService: ApiService, private toastService: ToastService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('productAllocDetails'));
    this.prdOrderDetail = Object.values(this.data);
    console.log(this.prdOrderDetail)
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
    // this.ordersDetail = [
    //   { orderNo:'1120-3739', custmName:'Amit Shah', qty:'2',batchNo:'B1',expiryDate:'01-06-2021',allocatedQty:'2'},
    //   { orderNo:'1121-1234', custmName:'Nilesh Sable', qty:'3',batchNo:'B1',expiryDate:'01-06-2021',allocatedQty:'4'},
    //   { orderNo:'1122-3697', custmName:'Supriya Jadhav', qty:'5',batchNo:'B1',expiryDate:'01-06-2021',allocatedQty:'5'},
    //   { orderNo:'1123-2587', custmName:'Kiran Kumar', qty:'4',batchNo:'B2',expiryDate:'01-06-2021',allocatedQty:'4'},
    //   { orderNo:'1122-7412', custmName:'Ravi Yadhav', qty:'1',batchNo:'B2',expiryDate:'01-06-2021',allocatedQty:'1'}
    // ];
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
  rejectAllocProduct(orderDetail) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to cancel this Record ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const dataToSendReject = {
          // "iRequestID": 2034,
          // "iEmpID": orderDetail,
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

  openDialogForOrderProductAllocate(prdDetails) {
    const ref = this.dialogService.open(AllocateProductComponent, {
      data: prdDetails,
      header: 'Product Order Allocate',
      width: '90%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
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
    this.temDataLength = this.orderDetail.slice(event.first, event.first + 10).length;
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
}
