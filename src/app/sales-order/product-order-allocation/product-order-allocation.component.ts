import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { SalesOrderRoutingModule } from '../sales-order-routing.module';
import { AllocateProductComponent } from '../allocate-product/allocate-product.component';

@Component({
  selector: 'app-product-order-allocation',
  templateUrl: './product-order-allocation.component.html',
  styleUrls: ['./product-order-allocation.component.css']
})
export class ProductOrderAllocationComponent implements OnInit {

  
  prdOrderDetail: any[];
  ordersDetail: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.prdOrderDetail = [
      {  prdName:'Groundnut Oil',order:'5', qty:'15',inStock:'50',pending:'5'}
    ] ;

    this.ordersDetail = [
      { orderNo:'1120-3739', custmName:'Amit Shah', qty:'2',batchNo:'B1',expiryDate:'01-06-2021',allocatedQty:'2'},
      { orderNo:'1121-1234', custmName:'Nilesh Sable', qty:'3',batchNo:'B1',expiryDate:'01-06-2021',allocatedQty:'4'},
      { orderNo:'1122-3697', custmName:'Supriya Jadhav', qty:'5',batchNo:'B1',expiryDate:'01-06-2021',allocatedQty:'5'},
      { orderNo:'1123-2587', custmName:'Kiran Kumar', qty:'4',batchNo:'B2',expiryDate:'01-06-2021',allocatedQty:'4'},
      { orderNo:'1122-7412', custmName:'Ravi Yadhav', qty:'1',batchNo:'B2',expiryDate:'01-06-2021',allocatedQty:'1'}
    ];

  }


  openDialogForOrderProductAllocate() {
    const ref = this.dialogService.open(AllocateProductComponent, {
      data: {
      },
      header: 'Product Order Allocate',
      width: '90%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
}