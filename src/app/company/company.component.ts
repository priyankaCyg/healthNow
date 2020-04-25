import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneralEditComponent } from './general-edit/general-edit.component';
import { AddNewAddressComponent } from './add-new-address/add-new-address.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeComponent } from './employee/employee.component';
import { BankComponent } from './bank/bank.component';
import { GstComponent } from './gst/gst.component';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { CompanyAddress } from '../models/company-address.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

    items: MenuItem[];

    addressDataArray: CompanyAddress[];
    addressData : CompanyAddress;

    constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService, private httpService :ApiService) {
        this.breadcrumbService.setItems([
            { label: 'Dashboard' },
            { label: 'Company', routerLink: ['/app/company'] }
        ]);
    }

   ngOnInit() {

        this.items = [
            { label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io' },
            { label: 'Theming', icon: 'pi pi-file', routerLink: ['/theming'] }
        ];

        this.getAllAddressesList();
      

      
    }
// Get address list start
    getAllAddressesList(){
      const all_address_api =
      {
        "iRequestID":2015,
        "iCID" :1
    }
    this.httpService.callPostApi(all_address_api).subscribe(
     data => { 
     console.log(data);
     this.addressDataArray = data;
     }, 
     error => console.log(error)
     );
    }
// Get address list end

// open modal for new address start
    openDialogForaddNewAddress() {
      const ref = this.dialogService.open( AddNewAddressComponent , {
        data: {
        },
        header: 'Add New Address',
        width: '80%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        this.getAllAddressesList();
        if (success) {
          // this.toastService.addSingle("success", "Mail send successfully", "");
        }
      });
    }
    // open modal for new address end

    // open modal for edit address start
    openDialogForeditAddress(address : CompanyAddress) {
      const ref = this.dialogService.open(AddNewAddressComponent, {
        data:address,
        header: 'Edit Addrees',
        width: '80%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        this.getAllAddressesList();
        if (success) {
          // this.toastService.addSingle("success", "Mail send successfully", "");
        }
      });
    }


     // open modal for delete address start
    onDeleteAddress(addressId : number){
      const deleteAddressApi = {
        "iRequestID":2014,
        "iCID" :1,
        "iAddID":addressId
      }
      if(confirm("Are you sure to delete this record?")){
        this.httpService.callPostApi(deleteAddressApi).subscribe(
          data => {
            this.getAllAddressesList();
        },
        error => {
          console.log(error)
        }
          ) 
      }
    }
     // open modal for delete address end
}
