import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
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
  
  isAdmin: boolean;
  items: MenuItem[];
  supplier: supplierList[];
  disableButtonsData : any ;
  prdMapBtn : boolean = true;
  editBtn : boolean = true;
  deleteBtn : boolean = true;
  sendForApprovalBtn : boolean = true;
  constructor(private breadcrumbService: BreadcrumbService,
    private httpService: ApiService, private toastService: ToastService,
    private confirmationService: ConfirmationService, private router: Router,
  ) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Supplier', routerLink: ['/supplier'] }
    ]);
  }


  ngOnInit(): void {
    localStorage.removeItem("iSupID");
    this.getAllSupplier();
    this.setButtonsVisibility();
  }
  //code for  get list of supplier
  getAllSupplier() {
    const supplier_list_api =
    {
      "iRequestID": 2174,
    }
    this.httpService.callPostApi(supplier_list_api).subscribe(
      data => {
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
        this.httpService.callPostApi(delete_data_api).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.getAllSupplier();
          },
          (error) => console.log(error)
        );
      }
    });
  }

  // code for naviagte to edit supplier by id 
  editSupplier(iSupID: Number) {
    this.router.navigate(['/supplier/edit-supplier', iSupID]);
  }

  //code for navigate to product mapping page by id
  prdmapSupplier(iSupID: Number) {
    this.router.navigate(['/supplier/product-mapping', iSupID]);
  }

  setButtonsVisibility(){
    const  disableButtonsApi = {
      "iRequestID":1121,
      "iRoleID":2,
      "sComponentName":"SupplierList"
    }
    this.httpService.callPostApi(disableButtonsApi).subscribe(
      (data) => {console.log(data.body),
       this.disableButtonsData = data.body,
      console.log(this.disableButtonsData),
      this.disableButtonsData.map(
        // (val) => {temp_btns_arr.push(val.sActionName)}
        (val) => {
          let actionname = val.sActionName;
          let btnState = val.state;
          if(actionname == "sSupplier_product_mapping_btn" && btnState == 1){
            this.prdMapBtn = false;
          }
          else if(actionname == "sSupplier_edit_btn" && btnState == 1){
            this.editBtn = false;
          }
          else if(actionname == "sSupplier_delete_btn" && btnState == 1){
            this.deleteBtn = false;
          }
          else if(actionname == "sSupplier_send_for_approval_btn" && btnState == 1){
            this.sendForApprovalBtn = false;
          }
      }
      )},
      (error) => {console.log(error)})
    
       }
}
