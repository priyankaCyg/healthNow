import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import {MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { ProductCategory } from '../models/product-category.model';
import { ApiService } from '../services/api.service';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from "../services/toast.service";
import {LoginService} from '../../app/services/login.service'


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  items: MenuItem[];

  productCategoryData: ProductCategory;
  
    constructor(
       private breadcrumbService: BreadcrumbService,
       private dialogService:DialogService,
       private apiService : ApiService,
       private toastService: ToastService,
       private confirmationService: ConfirmationService,private loginService:LoginService
      )
        {
      this.breadcrumbService.setItems([
          { label: 'Dashboard' },
          { label: 'Product Category', routerLink: ['/app/product-category'] }
      ]);
  }

  ngOnInit(): void {
    
    var isBrowserClosed = localStorage.getItem('isBrowserClosed')
    if(isBrowserClosed || isBrowserClosed==null)
    {
      this.loginService.getAccess().then(response1 => {

        console.log("Response of Access ",response1)
    
    
      }).catch(error=>{
        // console.log(JSON.stringify(error))
      })
    }
    this.showProdCatList();
  }

  // To add new category starts
  openDialogForProductCategory() {
    const ref = this.dialogService.open( AddProductCategoryComponent  , {
      data: {
      },
      header: 'Add Product Category',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.showProdCatList();
      }
    });
  }
  // To add new category ends

    //Open Dialog To Edit category
    editProductCategory(categoryID) {
      const ref = this.dialogService.open(AddProductCategoryComponent, {
        data: {
          "iPCID": categoryID
        },
        header: 'Edit Product Category',
        width: '28%'
      });
  
      ref.onClose.subscribe((success: any) => {
        if(success)
        {
          this.showProdCatList();
        }
      });
    }
    
// To Edit category ends

  showProdCatList(){
    const prodCatListApi = {
      "iRequestID": 2114
    }
    this.apiService.callPostApi(prodCatListApi).subscribe(
      data => { this.productCategoryData = data.body,
      console.log(this.apiService.headerMessage);
      console.log(this.apiService.headerCode);
      } ,
      error => { console.log(error)}
    )

  }

 // Open Dialog To Delete category
  deleteCategory(categoryID) {
    console.log(categoryID);
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete this Record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var deleteCategoryAPI = {
          "iRequestID": 2113,
          "iPCID":categoryID
        }

        this.apiService.callPostApi(deleteCategoryAPI).subscribe(
          data => {
            this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
            this.showProdCatList();
          },
          error => { console.log(error)}
        );
      }
    });
  }
  
}