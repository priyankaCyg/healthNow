import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { Message } from 'primeng/api';
import { SupplierRoutingModule } from '../supplier-routing.module';
import { AddressComponent } from '../address/address.component';
import { ContactComponent } from '../contact/contact.component';
import { BankComponent } from '../bank/bank.component';
import { GstComponent } from '../gst/gst.component';
import { SupplierAddress } from 'src/app/models/supplier-address.model';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-new-supplier',
  templateUrl: './add-new-supplier.component.html',
  styleUrls: ['./add-new-supplier.component.css']
})
export class AddNewSupplierComponent implements OnInit {

  items: MenuItem[];

  supplierAdressData : SupplierAddress;


  constructor(private breadcrumbService: BreadcrumbService,
              private dialogService:DialogService,
              private apiService:ApiService,
              private toastService: ToastService,
              private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Supplier', routerLink: ['/app/supplier'] }
    ]);
}

  ngOnInit(): void {
this.getSupplierAddressList();


  }
//Address list starts
  getSupplierAddressList(){
    const supplierAddressAPI = {
      "iRequestID": 2184
    }
    this.apiService.callPostApi(supplierAddressAPI).subscribe(
      data => { this.supplierAdressData = data},
      error => {console.log(error)}
    )
  }
  // address list ends

  // Daialogue to add address
    openDialogForaddAddress() {
      const ref = this.dialogService.open( AddressComponent , {
        data: {
        },
        header: 'Add New Address',
        width: '80%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          this.getSupplierAddressList();
          // this.toastService.addSingle("success", "Mail send successfully", "");
        }
      });
    }

    // Daialogue to edit address
    editSupplierAddress(supplierID) {
      const ref = this.dialogService.open(AddressComponent, {
        data: {
          "iSupAddID": supplierID
        },
        header: 'Edit Address',
        width: '80%'
      });
  
      ref.onClose.subscribe((success: any) => {
        // alert(success)
        if(success)
        {
          this.getSupplierAddressList();
          this.toastService.addSingle("success", "Updated Successfully", "");
        }
      });
    }

     // Open Dialog To Delete address
     deleteSupplierAddress(supplierID) {
    console.log(supplierID);
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete this Record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var deleteAddressAPI = {
          "iRequestID": 2183,
          "iSupAddID":supplierID
        }

        this.apiService.callPostApi(deleteAddressAPI).subscribe(
          data => {
            this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
            this.getSupplierAddressList();
          },
          error => { console.log(error)}
        );
      }
    });
  }
    
    
    openDialogForaddContact() {
      const ref = this.dialogService.open( ContactComponent , {
        data: {
        },
        header: 'Add New Contact',
        width: '80%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          // this.toastService.addSingle("success", "Mail send successfully", "");
        }
      });
    }
    
    openDialogForBank() {
      const ref = this.dialogService.open( BankComponent , {
        data: {
        },
        header: 'Add New Bank',
        width: '50%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          // this.toastService.addSingle("success", "Mail send successfully", "");
        }
      });
    }

    openDialogForGST() {
      const ref = this.dialogService.open( GstComponent , {
        data: {
        },
        header: 'Add New GST',
        width: '28%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          // this.toastService.addSingle("success", "Mail send successfully", "");
        }
      });
    }
}


