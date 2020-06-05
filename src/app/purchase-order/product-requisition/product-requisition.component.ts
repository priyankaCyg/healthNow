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

@Component({
  selector: 'app-product-requisition',
  templateUrl: './product-requisition.component.html',
  styleUrls: ['./product-requisition.component.css']
})
export class ProductRequisitionComponent implements OnInit {

  items: MenuItem[];
  orderReq: orderReqData[];
  productReq: productReqData[];
  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService, private httpService: ApiService,
    private router: Router, private toastService: ToastService, private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
  }

  ngOnInit(): void {
    this.getOrderReq();
    this.getProductReq();
    // this.orderRequ = [
    //   { srNo:'1',requNo:'RE/SS/20200514/5', prdCategory:'Food',product:'Gluten Free Wheat 5kg Pack',partner:'Shibin KP',location:'Mumbai', qty:'50', createdBy:'System',	createdDate:'1-05-2020' },
    //   { srNo:'2',requNo:'RE/SS/20200514/7', prdCategory:'Food', product:'Horlicks 750 gm Refill Pack',partner:'Celina Nadar',location:'Pune',qty:'100', createdBy:'Rohit',	createdDate:'3-05-2020'},
    //   { srNo:'3',requNo:'RE/SS/20200514/9', prdCategory:'Food', product:'Horlicks Refill Pack, 500 gm',partner:'Shweta More',location:'Thane',qty:'150', createdBy:'Rajesh',	createdDate:'11-05-2020'}
    // ];

    //   this.productRequ = [
    //     { srNo:'1', prdCategory:'Food',product:'Gluten Free Wheat 5kg Pack', RequCount:'5', qty:'100',	unit:'kg'},
    //     { srNo:'2', prdCategory:'Food', product:'Horlicks 750 gm Refill Pack', RequCount:'7', qty:'500',	unit:'gm'},
    //     { srNo:'3', prdCategory:'Food', product:'Horlicks Refill Pack, 500 gm', RequCount:'3', qty:'200',	unit:'gm'}
    //   ];

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
      data: {
      },
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
            this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
            this.getOrderReq();
          },
          (error) => console.log(error)
        );
      }
    });
  }

  //Function to map Supplier
  mapSupplier(orderReq) {
    this.httpService.getComponentData(orderReq);
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
    this.httpService.getComponentData(productReq);
  }
}
