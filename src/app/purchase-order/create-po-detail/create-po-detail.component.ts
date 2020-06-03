import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';

@Component({
  selector: 'app-create-po-detail',
  templateUrl: './create-po-detail.component.html',
  styleUrls: ['./create-po-detail.component.css']
})
export class CreatePoDetailComponent implements OnInit {

  poDetail: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
}

  ngOnInit(): void {
    this.poDetail = [
      { supplier:'SKK Supplier', prdCategory:'Food',product:'Gluten Free Wheat 5kg Pack',qty:'100',	unit:'kg',rate:'250',discount:'5%',discAmt:'15', totalAmt:'23,500', createdBy:'System', createdDate:'1-05-2020' },
      { supplier:'KKB Supplier', prdCategory:'Food', product:'Horlicks 750 gm Refill Pack',qty:'50',	unit:'gm',rate:'150',discount:'5%',discAmt:'15', totalAmt:'20,250', createdBy:'Rohit',	createdDate:'3-05-2020'},
      { supplier:'NOM Supplier', prdCategory:'Food', product:'Horlicks Refill Pack, 500 gm',qty:'200',	unit:'gm', rate:'120',discount:'5%',discAmt:'15', totalAmt:'21,000',createdBy:'Rajesh', createdDate:'11-05-2020'}
    ];
  }

}