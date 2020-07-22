import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { SalesOrderRoutingModule } from '../sales-order-routing.module';
import { AllocateProductComponent } from '../allocate-product/allocate-product.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-order-allocation',
  templateUrl: './product-order-allocation.component.html',
  styleUrls: ['./product-order-allocation.component.css']
})

export class ProductOrderAllocationComponent implements OnInit {

  prdOrderDetail: any[];
  productDetail: any[];
  data: object;
  responseData: object;
  batch: any[];
  productAllocation = [];
  allocateBtn: boolean = false;
  public products: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private httpService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('productAllocDetails'));
    this.prdOrderDetail = Object.values(this.data);
    this.getProductAllocChildList();
    // if(this.prdOrderDetail[0].iQty <= 5){
    //   this.allocateBtn = false; 
    // }
    // else{
    //   this.allocateBtn = true;
    // }
    // this.prdOrderDetail = [
    //   {  prdName:'Groundnut Oil',order:'5', qty:'15',inStock:'50',pending:'5'}
    // ] ;

  }

  getProductAllocChildList() {
    const productAllocChildAPI = {
      "iRequestID": 2434,
      "iPrdID": this.prdOrderDetail[0].iPrdID
    }
    this.httpService.callPostApi(productAllocChildAPI).subscribe(
      data => {
        this.productDetail = data.body;
        if (this.productDetail.length==0) {
          this.router.navigate(['/sales-order/order-allocation']);
        }
      },
      error => { console.log(error) }
    )
  }

  openDialogForOrderProductAllocate(prdDetails) {
    const ref = this.dialogService.open(AllocateProductComponent, {
      data: prdDetails,
      header: 'Product Order Allocate',
      width: '90%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getProductAllocChildList();
      }
    });
  }

}