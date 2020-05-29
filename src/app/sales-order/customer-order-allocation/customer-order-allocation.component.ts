import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { SalesOrderRoutingModule } from '../sales-order-routing.module';
import { AddressComponent } from '../address/address.component';
import { AllocateComponent } from '../allocate/allocate.component';

@Component({
  selector: 'app-customer-order-allocation',
  templateUrl: './customer-order-allocation.component.html',
  styleUrls: ['./customer-order-allocation.component.css']
})
export class CustomerOrderAllocationComponent implements OnInit {

  orderDetail: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.orderDetail = [
      {  prdName:'Groundnut Oil', qty:'2',batchNo:'B2',expiryDate:'01-06-2021',allocatedQty:'2'},
      {  prdName:'Horlicks', qty:'2',batchNo:'',expiryDate:'',allocatedQty:''}
    ] ;
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
}
