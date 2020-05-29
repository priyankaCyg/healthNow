import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { CreateRequisitionComponent } from '../create-requisition/create-requisition.component';

@Component({
  selector: 'app-product-requisition',
  templateUrl: './product-requisition.component.html',
  styleUrls: ['./product-requisition.component.css']
})
export class ProductRequisitionComponent implements OnInit {

  items: MenuItem[];
  
  orderRequ: any[];
  productRequ :any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
}

  ngOnInit(): void {
    this.orderRequ = [
      { srNo:'1',requNo:'RE/SS/20200514/5', prdCategory:'Food',product:'Gluten Free Wheat 5kg Pack',partner:'Shibin KP',location:'Mumbai', qty:'50', createdBy:'System',	createdDate:'1-05-2020' },
      { srNo:'2',requNo:'RE/SS/20200514/7', prdCategory:'Food', product:'Horlicks 750 gm Refill Pack',partner:'Celina Nadar',location:'Pune',qty:'100', createdBy:'Rohit',	createdDate:'3-05-2020'},
      { srNo:'3',requNo:'RE/SS/20200514/9', prdCategory:'Food', product:'Horlicks Refill Pack, 500 gm',partner:'Shweta More',location:'Thane',qty:'150', createdBy:'Rajesh',	createdDate:'11-05-2020'}
    ];
   
      this.productRequ = [
        { srNo:'1', prdCategory:'Food',product:'Gluten Free Wheat 5kg Pack', RequCount:'5', qty:'100',	unit:'kg'},
        { srNo:'2', prdCategory:'Food', product:'Horlicks 750 gm Refill Pack', RequCount:'7', qty:'500',	unit:'gm'},
        { srNo:'3', prdCategory:'Food', product:'Horlicks Refill Pack, 500 gm', RequCount:'3', qty:'200',	unit:'gm'}
      ];

  }

  openDialogForCreateRequ() {
    const ref = this.dialogService.open( CreateRequisitionComponent , {
      data: {
      },
      header: 'Create Requisition',
      width: '90%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }

}
