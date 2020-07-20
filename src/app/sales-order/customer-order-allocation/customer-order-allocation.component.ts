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

@Component({
  selector: 'app-customer-order-allocation',
  templateUrl: './customer-order-allocation.component.html',
  styleUrls: ['./customer-order-allocation.component.css']
})
export class CustomerOrderAllocationComponent implements OnInit {

  orderDetail: any[];
  data: object;
  responseData: object;
  customer_name: string;
  address: string;
  order_no: string;
  iSOID: number;
  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private httpService: ApiService, private toastService: ToastService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('orderAllocDetails'));
    this.responseData = Object.values(this.data);
    this.customer_name = this.responseData[0].sCustomerName;
    this.address = this.responseData[0].sAddress;
    this.order_no = this.responseData[0].sSONo;
    this.iSOID = this.responseData[0].iSOID;

    this.getOrderrAllocChildList();
    // this.orderDetail = [
    //   { prdName: 'Groundnut Oil', qty: '2', batchNo: 'B2', expiryDate: '01-06-2021', allocatedQty: '2' },
    //   { prdName: 'Horlicks', qty: '2', batchNo: '', expiryDate: '', allocatedQty: '' }
    // ];
  }

  //code for get Order Alocation child data table
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

  //Open Dialog for reject alocated product
  rejectAllocProduct(orderDetail) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to reject this Record ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const dataToSendReject = {
          "iRequestID": 2034,
          "iEmpID": orderDetail,
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
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
}
