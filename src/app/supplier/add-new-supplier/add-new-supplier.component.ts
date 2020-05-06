import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { AddressComponent } from '../address/address.component';
import { ContactComponent } from '../contact/contact.component';
import { BankComponent } from '../bank/bank.component';
import { GstComponent } from '../gst/gst.component';

import {APIService} from '../../services/apieservice';
import { ToastService } from "../../services/toast.service";
import {ConfirmationService} from 'primeng/api';

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


  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService,private _apiService:APIService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Supplier', routerLink: ['/app/supplier'] }
    ]);
}

  ngOnInit(): void {

    this.address = [
      { addresstype: 'Registered', address1: '13, Gandhi Bhuvan Chunam Lane', address2: 'Db Road, Lamington Road, Grant Road, East, Mumabi.', state: 'Maharashtra', city: 'Mumbai', landmark: 'Db Road', status:'Active'}
    ];

    // this.contact = [
    //   {fullName: 'Pankaj Bhatt', designation: 'Sales', emailId:'pankaj@test.com', supplierAdd: '41, Sarvodaya Ind. Est. Off Mahakali Caves Road, Andheri East', mobileNo: '987456123', contactNo:'789456123', directNo:'025647896', fax:'45645656', status: 'Active'},
    //   {fullName: 'Santosh Yadav', designation: 'Sales', emailId:'santosh@demo.com', supplierAdd: '41, Sarvodaya Ind. Est. Off Mahakali Caves Road, Andheri East', mobileNo: '998877445', contactNo:'989898987', directNo:'066554422', fax:'78787878', status: 'Active'}
    // ];

    // this.bank = [
    //   {bankName: 'GS MAHANAGAR CO-OP BANK LTD.', accounttype: 'GSMHA/Current account', accountNo: '007011200003797', IFSC: 'MCBL0960007', bankBranch: 'LALBAUG',  status: 'Active'},
    //   {bankName: 'KOTAK MAHINDRA BANK', accounttype: 'KMBL/ CA', accountNo: '06402000000484', IFSC: 'KKBK0000640', bankBranch: 'PAREL',  status: 'Active'}
    // ];

    this.gst = [
      {state: 'Maharashtra', gst1: '27AACCC1130A1ZL', status: 'Active'},
      {state: 'Haryana', gst1: '4243453STt06', status: 'Active'}
    ];


    this.showContact();
    this.showBank();

  }


  showContact()
  {
    var dataToSend ={
      "iRequestID": 2194
  }
    this._apiService.getDetails(dataToSend).then(response => {
      console.log("Response for Contact ",response)
      this.contact = response
    });
  }


  editContact(iSupContactID) {
    const ref = this.dialogService.open( ContactComponent , {
      data: {
        iSupContactID:iSupContactID
      },
      header: 'Edit Contact',
      width: '70%'
    });
  
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.toastService.addSingle("success", "Updated successfully", "");
      this.showContact();
  
      }
    });
    }
  
    deleteContact(iSupContactID)
    {
      alert("hi")
      // return false;
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          var dataToSendDelete = {
            "iRequestID":2193,
            "iSupContactID":iSupContactID
          }
  
          this._apiService.getDetails(dataToSendDelete).then(response => {
            console.log("Response for Brand Delete ",response)
            this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
            this.showContact();
          });
        },
        reject: () => {
    this.toastService.addSingle("info", "Rejected", "Rejected");
  
        }
    });
    }


    showBank()
  {
    var dataToSend ={
      "iRequestID": 2214,
      "iSupID" :1
  }
    this._apiService.getDetails(dataToSend).then(response => {
      console.log("Response for Bank ",response)
      this.bank = response
    });
  }


  editBank(iBankID) {
    const ref = this.dialogService.open( BankComponent , {
      data: {
        iBankID:iBankID
      },
      header: 'Edit Contact',
      width: '50%'
    });
  
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.toastService.addSingle("success", "Updated successfully", "");
        this.showBank();
  
      }
    });
    }
  
    deleteBank(iBankID)
    {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          var dataToSendDelete = {
            "iRequestID": 2213,
    "iSupID" :1,
    "iBankID":iBankID
          }
  
          this._apiService.getDetails(dataToSendDelete).then(response => {
            console.log("Response for Brand Delete ",response)
            this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
            this.showBank();
          });
        },
        reject: () => {
    this.toastService.addSingle("info", "Rejected", "Rejected");
  
        }
    });
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
        width: '70%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          this.toastService.addSingle("success", "Record added successfully", "");
          this.showContact();

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
          this.toastService.addSingle("success", "RecordAdded Successfully", "");
          this.showBank();
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


