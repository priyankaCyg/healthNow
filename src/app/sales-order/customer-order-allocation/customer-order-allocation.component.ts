import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { SalesOrderRoutingModule } from '../sales-order-routing.module';
import { AddressComponent } from '../address/address.component';
import { AllocateComponent } from '../allocate/allocate.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { customerAllocChildData } from 'src/app/model/customer-order-alloc-child';

@Component({
  selector: 'app-customer-order-allocation',
  templateUrl: './customer-order-allocation.component.html',
  styleUrls: ['./customer-order-allocation.component.css']
})
export class CustomerOrderAllocationComponent implements OnInit {

  orderDetail: customerAllocChildData[];
  batch: any[]
  data: object;
  responseData: object;
  customer_name: string;
  address: string;
  order_no: string;
  iSOID: number;
  orderAllocation = [];

  public cols: any[];
  public cols1: any[];
  public isExpanded: boolean = false;
  public rows: number = 10;
  public expandedRows = {};
  public temDataLength: number = 0;

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private httpService: ApiService, private toastService: ToastService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('orderAllocDetails'));
    this.responseData = Object.values(this.data);
    this.customer_name = this.responseData[0].sCustomerName;
    this.address = this.responseData[0].sAddress;
    this.order_no = this.responseData[0].sSONo;
    this.iSOID = this.responseData[0].iSOID;

    this.cols = [{ field: 'iQty', header: 'Qty' }];

    this.getOrderrAllocChildList();
    this.orderDetail = this.orderAllocation;
    this.orderDetail.length < this.rows ? this.temDataLength = this.orderDetail.length : this.temDataLength = this.rows;

  }

  //code for get Customer Order Alocation data table
  getOrderrAllocChildList() {
    const ordrAllocChildAPI = {
      "iRequestID": 2432,
      "iSOID": this.iSOID
    }
    this.httpService.callPostApi(ordrAllocChildAPI).subscribe(
      data => {
        this.orderDetail = data.body;
      },
      error => { console.log(error) }
    )
  }

  //code for get Customer Order Alocation child data table
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

  //Open Dialog for reject alocated product
  rejectAllocProduct(orderDetail) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to reject this Record ?',
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
            this.getOrderrAllocChildList();
          },
          (error) => console.log(error)
        );
      },
      reject: () => { }
    });
  }

  saveConfirmAllocate() {
    const data = {
      // "iRequestID": 2435,
      // "iSOPrdID": 1,
      // "iPrdID": 1,
      // "sGINAllocation": ""
    }
    console.log(data, "data");
    this.httpService.callPostApi(data).subscribe(
      (data) => {
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      (error) => console.log(error)
    );
  }

  openDialogForAddress() {
    const ref = this.dialogService.open(AddressComponent, {
      data: this.address,
      header: 'Location',
      width: '30%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }

  openDialogForOrderAllocate(orderDetail) {
    const ref = this.dialogService.open(AllocateComponent, {
      data: orderDetail,
      header: 'Customer Order Allocate',
      width: '90%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getOrderrAllocChildList();
      }
    });
  }

  expandAll() {
    if (!this.isExpanded) {
      this.orderDetail.forEach(data => {
        this.expandedRows[data.iPrdID] = 1;
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

}
