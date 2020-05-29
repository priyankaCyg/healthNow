import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';

@Component({
  selector: 'app-create-po-list',
  templateUrl: './create-po-list.component.html',
  styleUrls: ['./create-po-list.component.css']
})
export class CreatePoListComponent implements OnInit {

  items: MenuItem[];
  poList:any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
}

  ngOnInit(): void {
    this.poList = [
      { srNo:'1', supplier:'SKK Supplier', partner:'Alpha',location:'Mumbai', requisitions:'5', createdBy:'System', createdDate:'1-05-2020' },
      { srNo:'2', supplier:'KKB Supplier', partner:'Beta',location:'Pune', requisitions:'7', createdBy:'Rohit',	createdDate:'3-05-2020'},
      { srNo:'3', supplier:'NOM Supplier', partner:'Gamma',location:'Thane', requisitions:'6', createdBy:'Rajesh', createdDate:'11-05-2020'}
    ];

  }

}
