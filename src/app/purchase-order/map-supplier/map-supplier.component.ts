import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';

@Component({
  selector: 'app-map-supplier',
  templateUrl: './map-supplier.component.html',
  styleUrls: ['./map-supplier.component.css']
})
export class MapSupplierComponent implements OnInit {

  items: MenuItem[];

  requisition: any[];

  addRequValue: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
}

  ngOnInit(): void {
    
    this.requisition = [
      { reqNo:'RE/SS/20200514/5', prdCategory:'Food',product:'Gluten Free Wheat 5kg Pack',partner:'Shibin KP',location:'Mumbai', qty:'100',unit:'kg',	createdBy:'System',	createdDate:'1-05-2020' }
    ];

    this.addRequValue = [
      { supplier:'SKK Supplier',rate:'250',default:'Yes',discount:'5%',discAmt:'15', purcPrice:'235' },
      { supplier:'KKB Supplier',rate:'275',default:'No',discount:'0%',discAmt:'0', purcPrice:'275' }
    ];

  }

}

