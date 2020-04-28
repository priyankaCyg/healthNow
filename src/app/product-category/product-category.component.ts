import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
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
      {productCategoryName: 'Product', parentCategory: '',  status: 'Active'},
      {productCategoryName: 'Health Concerns', parentCategory: '',  status: 'Active'},
      {productCategoryName: 'Supplements', parentCategory: 'Product', status: 'Active'},
      {productCategoryName: 'Oil', parentCategory: 'Product', status: 'Active'},
      {productCategoryName: 'Grain', parentCategory: 'Product', status: 'Active'},
      {productCategoryName: 'Nutrition', parentCategory: 'Health Concerns', status: 'Active'},
      {productCategoryName: 'Immunity', parentCategory: 'Health Concerns', status: 'Active'},
      {productCategoryName: 'Diabetes', parentCategory: 'Health Concerns', status: 'Active'}
    ];
  }

  openDialogForProductCategory() {
    const ref = this.dialogService.open( AddProductCategoryComponent  , {
      data: {
      },
      header: 'Add Product Category',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
}