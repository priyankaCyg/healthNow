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
import { LoginService } from '../../app/services/login.service'


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  items: MenuItem[];

  product: any[];


  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private httpService: ApiService, private toastService: ToastService, private confirmationService: ConfirmationService
    , private router: Router, private loginService: LoginService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Product', routerLink: ['/product'] }
    ]);
  }

  ngOnInit(): void {
    //this.loginService.checkBrowserClosed();
    this.getAllProduct();
  }

  // code for get list of products
  getAllProduct() {
    const Product_list_api =
    {
      "iRequestID": 2254,
    }
    this.httpService.callPostApi(Product_list_api).subscribe(
      data => {
        this.product = data.body;
      },
      error => console.log(error)
    );
  }

  //code for delete product
  deleteProduct(iPrdID: Number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let prd_id = iPrdID;
        let delete_data_api = {
          "iRequestID": 2253,
          "iPrdID": prd_id
        };
        this.httpService.callPostApi(delete_data_api).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.getAllProduct();
          },
          (error) => console.log(error)
        );
      }
    });
  }

  //code for edit product
  editProduct(iPrdID: Number) {
    this.router.navigate(['/product/edit-product', iPrdID]);
  }
}
