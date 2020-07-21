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
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-order-allocation',
  templateUrl: './customer-order-allocation.component.html',
  styleUrls: ['./customer-order-allocation.component.css']
})

export class CustomerOrderAllocationComponent implements OnInit {

  orderDetail: customerAllocChildData[];
  data: object;
  responseData: object;
  customer_name: string;
  address: string;
  order_no: string;
  iSOID: number;
  orderAllocation = [];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private httpService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('orderAllocDetails'));
    this.responseData = Object.values(this.data);
    this.customer_name = this.responseData[0].sCustomerName;
    this.address = this.responseData[0].sAddress;
    this.order_no = this.responseData[0].sSONo;
    this.iSOID = this.responseData[0].iSOID;
    this.getOrderrAllocChildList();
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
        if (this.orderDetail == null) {
          this.router.navigate(['/sales-order/order-allocation']);
        }
      },
      error => { console.log(error) }
    )
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

}
