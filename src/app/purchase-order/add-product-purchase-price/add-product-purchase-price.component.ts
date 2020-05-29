import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';

@Component({
  selector: 'app-add-product-purchase-price',
  templateUrl: './add-product-purchase-price.component.html',
  styleUrls: ['./add-product-purchase-price.component.css']
})
export class AddProductPurchasePriceComponent implements OnInit {

  items: MenuItem[];

  addDetails: any[];

   constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Purchase Order', routerLink: ['/app/purchase-order'] }
    ]);
}

 
ngOnInit(): void {

   
  this.addDetails = [
    { srNo:'1', amount:'200',startDate:'01-06-2019',endDate:'31-12-2019' },
    { srNo:'2', amount:'230',startDate:'01-01-2020',endDate:'31-03-2019' },
  ];



}

}

