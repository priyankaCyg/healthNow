import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

    items: MenuItem[];
  
    productPurchasePrice: any[];
  
  
    constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
      this.breadcrumbService.setItems([
          { label: 'Dashboard' },
          { label: 'Purchase Order', routerLink: ['/app/purchase-order'] }
      ]);
  }
  
  
    ngOnInit(): void {
      this.productPurchasePrice = [
        { product:'Gluten Free Wheat', supplier:'SKK Supplier',amount:'200',startDate:'10-04-2020',endDate:'10-10-2020' },
        { product:'Horlicks', supplier:'KB Supplier',amount:'400',startDate:'01-01-2020',endDate:'31-12-2020' },
        { product:'Omega 3 Oil with D3', supplier:'NAM Supplier',amount:'150',startDate:'12-02-2020',endDate:'31-12-2020' },
        { product:'Magnesuim', supplier:'RG Supplier',amount:'350',startDate:'30-01-2020',endDate:'30-06-2020' },
        { product:'Saffola', supplier:'SKP Suppiler',startDate:'01-01-2020',endDate:'31-12-2020' }
      ];
    }
  }