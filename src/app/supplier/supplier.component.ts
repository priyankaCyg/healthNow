import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { Message } from 'primeng/api';
import { ApiService } from '../services/api.service';
import { supplierList } from '../model/supplierlist';
import { ToastService } from '../services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  items: MenuItem[];

  supplier: supplierList[];
  editdata: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private apiService: ApiService, private toastService: ToastService,
    private confirmationService: ConfirmationService, private router: Router
  ) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Supplier', routerLink: ['/app/supplier'] }
    ]);
  }


  ngOnInit(): void {
    this.getAllSupplier();

  }
  // get list of supplier
  getAllSupplier() {
    const supplier_list_api =
    {
      "iRequestID": 2174,
    }
    this.apiService.callPostApi(supplier_list_api).subscribe(
      data => {
        console.log(data);
        this.supplier = data.body;
      },
      error => console.log(error)
    );
  }

  //delete supplier
  deleteSupplier(supplier: supplierList) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let sup_id = supplier.iSupID;
        let delete_data_api = {
          "iRequestID": 2173,
          "iSupID": sup_id
        };
        this.apiService.callPostApi(delete_data_api).subscribe(
          (data) => {
            console.log(data);
            this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
            this.getAllSupplier();
          },
          (error) => console.log(error)
        );
      }

    });

  }

  // edit supplier
  editSupplier(iSupID: Number) {

    this.router.navigate(['/app/supplier/edit-supplier', iSupID]);

  }
  prdmapSupplier(iSupID: Number) {
    this.router.navigate(['/app/supplier/product-mapping', iSupID]);

  }

}
