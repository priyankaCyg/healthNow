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

@Component({
  selector: 'app-add-new-supplier',
  templateUrl: './add-new-supplier.component.html',
  styleUrls: ['./add-new-supplier.component.css']
})
export class AddNewSupplierComponent implements OnInit {

  items: MenuItem[];

  address: any[];

  contact: any[];

  bank: any[];

  gst: any[];


  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Supplier', routerLink: ['/app/supplier'] }
    ]);
}

  ngOnInit(): void {

    this.address = [
      { addresstype: 'Registered', address1: '13, Gandhi Bhuvan Chunam Lane', address2: 'Db Road, Lamington Road, Grant Road, East, Mumabi.', state: 'Maharashtra', city: 'Mumbai', landmark: 'Db Road', status:'Active'}
    ];

    this.contact = [
      {fullName: 'Pankaj Bhatt', designation: 'Sales', emailId:'pankaj@test.com', supplierAdd: '41, Sarvodaya Ind. Est. Off Mahakali Caves Road, Andheri East', mobileNo: '987456123', contactNo:'789456123', directNo:'025647896', fax:'45645656', status: 'Active'},
      {fullName: 'Santosh Yadav', designation: 'Sales', emailId:'santosh@demo.com', supplierAdd: '41, Sarvodaya Ind. Est. Off Mahakali Caves Road, Andheri East', mobileNo: '998877445', contactNo:'989898987', directNo:'066554422', fax:'78787878', status: 'Active'}
    ];

    this.bank = [
      {bankName: 'GS MAHANAGAR CO-OP BANK LTD.', accounttype: 'GSMHA/Current account', accountNo: '007011200003797', IFSC: 'MCBL0960007', bankBranch: 'LALBAUG',  status: 'Active'},
      {bankName: 'KOTAK MAHINDRA BANK', accounttype: 'KMBL/ CA', accountNo: '06402000000484', IFSC: 'KKBK0000640', bankBranch: 'PAREL',  status: 'Active'}
    ];

    this.gst = [
      {state: 'Maharashtra', gst1: '27AACCC1130A1ZL', status: 'Active'},
      {state: 'Haryana', gst1: '4243453STt06', status: 'Active'}
    ];

  }
    openDialogForaddAddress() {
      const ref = this.dialogService.open( AddressComponent , {
        data: {
        },
        header: 'Add New Address',
        width: '80%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          // this.toastService.addSingle("success", "Mail send successfully", "");
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


