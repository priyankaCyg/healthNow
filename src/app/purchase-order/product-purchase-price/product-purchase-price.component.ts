import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { AddProductPurchasePriceComponent } from '../add-product-purchase-price/add-product-purchase-price.component';
import { ApiService } from 'src/app/services/api.service';
import { config } from 'src/config';

@Component({
  selector: 'app-product-purchase-price',
  templateUrl: './product-purchase-price.component.html',
  styleUrls: ['./product-purchase-price.component.css']
})

export class ProductPurchasePriceComponent implements OnInit {

  items: MenuItem[];
  supplierlist;
  selectedSupplier;
  supplierProduct: any[] = [];
  noRecordFound: string;

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private apiService: ApiService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
  }

  ngOnInit(): void {
    this.producerDropdown();
    this.noRecordFound = config.noRecordFound;
    // this.supplierProduct = [
    //   { prdCategory: 'Food', product: 'Gluten Free Wheat 5kg Pack', amount: '200', startDate: '01-06-2019', endDate: '31-12-2019' },
    //   { prdCategory: 'Food', product: 'Horlicks 750 gm Refill Pack', amount: '430', startDate: '01-01-2020', endDate: '31-03-2019' },
    //   { prdCategory: 'Food', product: 'Horlicks Refill Pack, 500 gm', amount: '230', startDate: '01-01-2020', endDate: '31-03-2019' }
    // ];
  }

  //code forproducer dropdown data
  producerDropdown() {
    return new Promise((resolve, reject) => {
      const supplier_dropdown_data = {
        "iRequestID": 2174,
      }
      this.apiService.getDropDownData(supplier_dropdown_data).then(
        (data) => {
          this.supplierlist = data;
          this.supplierlist.splice(0, 0, { iSupID: "", sSupName: "Select supplier" })
          this.selectedSupplier = { iSupID: "", sSupName: "Select supplier" }
          resolve(this.supplierlist)
        });
    })
  }
  //code for show all list of product
  getProduct() {
    const product_list_data = {
      "iRequestID": 2412,
      "iSupID": this.selectedSupplier.iSupID
    }
    this.apiService.callPostApi(product_list_data).subscribe(
      (data) => {
        this.supplierProduct = data.body;
      },
      (error) => console.log(error)
    );
  }

  openDialogForaddDetails(supplierProduct) {
    const ref = this.dialogService.open(AddProductPurchasePriceComponent, {
      data:
        supplierProduct
      ,
      header: 'Add Details',
      width: '90%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
        this.getProduct();
      }
    });
  }

  openDialogForeditDetails(supplierProduct) {
    const ref = this.dialogService.open(AddProductPurchasePriceComponent, {
      data:
        supplierProduct
      ,
      header: 'Edit Details',
      width: '90%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
}
