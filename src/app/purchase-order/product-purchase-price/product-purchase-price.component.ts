import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { AddProductPurchasePriceComponent } from '../add-product-purchase-price/add-product-purchase-price.component';

@Component({
  selector: 'app-product-purchase-price',
  templateUrl: './product-purchase-price.component.html',
  styleUrls: ['./product-purchase-price.component.css']
})

export class ProductPurchasePriceComponent implements OnInit {

  items: MenuItem[];
  
  supplierProduct: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
}

ngOnInit(): void {

   
  this.supplierProduct = [
    { prdCategory:'Food',product:'Gluten Free Wheat 5kg Pack',amount:'200',startDate:'01-06-2019',endDate:'31-12-2019'  },
    { prdCategory:'Food', product:'Horlicks 750 gm Refill Pack',amount:'430',startDate:'01-01-2020',endDate:'31-03-2019'},
    { prdCategory:'Food', product:'Horlicks Refill Pack, 500 gm',amount:'230',startDate:'01-01-2020',endDate:'31-03-2019'}
  ];
}
  openDialogForaddDetails() {
    const ref = this.dialogService.open( AddProductPurchasePriceComponent , {
      data: {
      },
      header: 'Add Details',
      width: '90%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
}
