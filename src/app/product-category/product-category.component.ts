import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  items: MenuItem[];

  productCategory: any[];
  
    constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
      this.breadcrumbService.setItems([
          { label: 'Dashboard' },
          { label: 'Product Category', routerLink: ['/app/product-category'] }
      ]);
  }

  ngOnInit(): void {
        
    this.productCategory = [
      {productCategoryName: 'Health & Personal Care ', status: 'Active'},
      {productCategoryName: 'Supplements', status: 'Active'},
      {productCategoryName: 'Oil', status: 'Active'},
      {productCategoryName: 'Grain', status: 'Active'},
      {productCategoryName: 'Diet & Nutrition', status: 'Active'},
      {productCategoryName: 'Immunity', status: 'Active'},
      {productCategoryName: 'Diabetes', status: 'Active'},
      {productCategoryName: 'Weight Management', status: 'Active'}
    ];
  }

  openDialogForProductCategory() {
    const ref = this.dialogService.open( AddProductCategoryComponent  , {
      data: {
      },
      header: 'Edit Details',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
}