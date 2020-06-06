import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { CreateRequisitionComponent } from '../create-requisition/create-requisition.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { orderReqData } from 'src/app/model/orderRequisition.model';
import { productReqData } from 'src/app/model/productRequisition.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-product-requisition',
  templateUrl: './product-requisition.component.html',
  styleUrls: ['./product-requisition.component.css']
})
export class ProductRequisitionComponent implements OnInit {

  items: MenuItem[];
  orderReq: orderReqData[];
  productReq: productReqData[];
  index: number = 0;
  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService, private httpService: ApiService, private commonService: CommonService,
    private router: Router, private toastService: ToastService, private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
  }

  ngOnInit(): void {
    this.index = +localStorage.getItem('tabIndex')
    localStorage.removeItem('tabIndex');
    this.getOrderReq();
    this.getProductReq();
  }

  //Function to list all Order Requisition
  getOrderReq() {
    const orderReqAPI = {
      "iRequestID": 2334,
    }
    this.httpService.callPostApi(orderReqAPI).subscribe(
      data => {
        this.orderReq = data.body;
      },
      error => { console.log(error) }
    )
  }

  //Open dialog box to create order requisition 
  openDialogForCreateReq() {
    const ref = this.dialogService.open(CreateRequisitionComponent, {
      data: {},
      header: 'Create Requisition',
      width: '90%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getOrderReq();
      }
    });
  }

  //Function to edit order requisition
  openDialogForEditReq(orderReq) {
    const ref = this.dialogService.open(CreateRequisitionComponent, {
      data: orderReq,
      header: 'Edit Requisition',
      width: '90%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getOrderReq();
      }
    });
  }

  //Function to delete Order Requisition
  deleteOrderReq(iPReqID: Number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let delete_data_api = {
          "iRequestID": 2333,
          "iPReqID": iPReqID
        };
        this.httpService.callPostApi(delete_data_api).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.getOrderReq();
          },
          (error) => console.log(error)
        );
      }
    });
  }

  //Function to map Supplier
  mapSupplier(orderReq) {
    localStorage.setItem('orderData', JSON.stringify({ orderReq }))
    localStorage.setItem('tabIndex', '0')
    //this.commonService.getComponentData({orderData:orderReq});
  }

  //Function to list all Product Requisition
  getProductReq() {
    const productReqAPI = {
      "iRequestID": 2335,
    }
    this.httpService.callPostApi(productReqAPI).subscribe(
      data => {
        this.productReq = data.body;
      },
      error => { console.log(error) }
    )
  }

  //Function to map Product
  mapProduct(productReq) {
    this.commonService.getComponentData(productReq);
    localStorage.setItem('tabIndex', '1')
    // localStorage.setItem('productData',JSON.stringify({ productReq }));
  }
}
