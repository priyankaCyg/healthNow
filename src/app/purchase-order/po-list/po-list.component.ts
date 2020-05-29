import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';

@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.css']
})
export class PoListComponent implements OnInit {

  selectedValues: string[] = ['val1'];

  poList: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
}

  ngOnInit(): void {
    this.poList = [
      { supplierPo:'PO/SS/20200514/4', poDate:'1-05-2020', supName:'SKK Suppliers', currency:'Rupee', createdDate:'1-05-2020'},
      { supplierPo:'PO/SS/20200513/5', poDate:'2-05-2020', supName:'KKB Suppliers', currency:'Rupee', createdDate:'2-05-2020'},
      { supplierPo:'PO/SS/20200512/6', poDate:'3-05-2020', supName:'NOM Suppliers', currency:'Rupee', createdDate:'3-05-2020'},
      { supplierPo:'PO/SS/20200511/7', poDate:'5-05-2020', supName:'SRK Suppliers', currency:'Rupee', createdDate:'4-05-2020'}
    ];

  }

}
