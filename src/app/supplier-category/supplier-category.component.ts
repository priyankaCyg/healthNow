import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { AddSupCategoryComponent } from './add-sup-category/add-sup-category.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-supplier-category',
  templateUrl: './supplier-category.component.html',
  styleUrls: ['./supplier-category.component.css']
})
export class SupplierCategoryComponent implements OnInit {

  items: MenuItem[];

  supplierCategory: any[];
  
    constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
      this.breadcrumbService.setItems([
          { label: 'Dashboard' },
          { label: 'Suplier Category', routerLink: ['/app/suplier-category'] }
      ]);
  }

  ngOnInit(): void {
        
    this.supplierCategory = [
      {supCategoryName: 'Courier',  status: 'Active'},
      {supCategoryName: 'Supplier',  status: 'Active'}
    ];
  }

  openDialogForProductCategory() {
    const ref = this.dialogService.open( AddSupCategoryComponent  , {
      data: {
      },
      header: 'Add Supplier Category',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
}
