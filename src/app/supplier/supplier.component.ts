import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  items: MenuItem[];

  supplier: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Supplier', routerLink: ['/app/supplier'] }
    ]);
}


  ngOnInit(): void {

    this.supplier = [
      { supplierName: 'Nordic Naturals', supplierCat: 'Supplier', shortCode: 'NON',status:'Active' },      
      { supplierName: 'Nestle', supplierCat: 'Supplier', shortCode: 'NES', status:'Active' }
    ];

}

}
