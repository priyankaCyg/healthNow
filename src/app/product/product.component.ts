import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { Message } from 'primeng/api';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  items: MenuItem[];

  product: any[];


  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private apiService: ApiService, private toastService: ToastService, private confirmationService: ConfirmationService
    , private router: Router) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Product', routerLink: ['/app/product'] }
    ]);
  }

  ngOnInit(): void {

    this.getAllProduct();

  }

  // get list of products
  getAllProduct() {
    const Product_list_api =
    {
      "iRequestID": 2254,
    }
    this.apiService.callPostApi(Product_list_api).subscribe(
      data => {
        console.log(data);
        this.product = data.body;
      },
      error => console.log(error)
    );
  }

  //delete product
  deleteProduct(iPrdID: Number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let prd_id = iPrdID;
        console.log(prd_id);
        let delete_data_api = {
          "iRequestID": 2253,
          "iPrdID": prd_id
        };
        this.apiService.callPostApi(delete_data_api).subscribe(
          (data) => {
            console.log(data);
            this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
            this.getAllProduct();
          },
          (error) => console.log(error)
        );
      }

    });

  }

  //edit product
  editProduct(iPrdID: Number) {
    this.router.navigate(['/app/product/edit-product', iPrdID]);
  }
}
