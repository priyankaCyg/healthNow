import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';

@Component({
  selector: 'app-map-supplier-multi-req',
  templateUrl: './map-supplier-multi-req.component.html',
  styleUrls: ['./map-supplier-multi-req.component.css']
})
export class MapSupplierMultiReqComponent implements OnInit {
  
  requDetail: any[];

  suppRate: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
}

  ngOnInit(): void {
    this.requDetail = [
      { reuNo:'RE/SS/20200514/5', partner:'Beta',location:'Mumbai', qty:'50',	createdBy:'System',	createdDate:'1-05-2020' },
      { reuNo:'RE/SS/20200514/7', partner:'Alpha',location:'Mumbai', qty:'100',	createdBy:'System',	createdDate:'1-05-2020' }
    ];

    this.suppRate = [
      { supplier:'SKK Supplier',rate:'250' },
      { supplier:'KKB Supplier',rate:'275' }
    ];
  }

}
