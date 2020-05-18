import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PartnerRoutingModule } from '../partner-routing.module';
import { AddressComponent } from '../address/address.component';
import { ContactComponent } from '../contact/contact.component';
import { BankComponent } from '../bank/bank.component';
import { GstComponent } from '../gst/gst.component';

@Component({
  selector: 'app-new-partner',
  templateUrl: './new-partner.component.html',
  styleUrls: ['./new-partner.component.css']
})
export class NewPartnerComponent implements OnInit {
  items: MenuItem[];

  address: any[];

  contact: any[];

  bank: any[];

  gst: any[];

   constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
      this.breadcrumbService.setItems([
          { label: 'Dashboard' },
          { label: 'Partner', routerLink: ['/app/partner'] }
      ]);
  }

  ngOnInit(): void {
        
    this.address = [
      {addressType:'Registered',	address1:'13, Gandhi Bhuvan Chunam Lane',	address2:'Db Road, Lamington Road, Grant Road, East, Mumabi.',	state:'Maharashtra',	city:'Mumbai',	landmark:'Db Road'},
      {addressType:'Registered',	address1:'| 319, Hariom Plaza,',	address2:'M.g Road, Borivali East,',	state:'Maharashtra',	city:'Mumabi',	landmark:'M.g Road'},
      { addressType: 'Warehouse', address1: 'Trishul, 3rd Floor, Opposite Samartheshwar Temple,', address2: 'Near Law Garden, Ellisbridge,Opposite Samartheshwar Temple', state: 'Gujarat', city:'AHMEDABAD',	landmark:'Samartheshwar Temple'}
    
    ];

    this.contact = [
      {fullName: 'Santosh Kadam',designation: 'Sales Executive',emailId: 'santosh@demo.com',partnerAdd: 'Mumbai',mobileNo:'9898989898',contactNo:'123456121',	directNo:'022245454',fax:'242424424' },
      {fullName: 'Pankaj Dubey',designation: 'Sales Executive',emailId: 'pankaj@test.com',partnerAdd: 'Thane',mobileNo:'8585858585',contactNo:'74174174',	directNo:'0222656565',fax:'565655656' },
      {fullName: 'Sanket Patil',designation: 'Sales Executive',emailId: 'sanket@test.com',partnerAdd: 'Gujrat',mobileNo:'878787878',contactNo:'85285285',	directNo:'022454545',fax:'4454545566' },
      {fullName: 'Snehal Jadhav',designation: 'Sales Executive',emailId: 'snehal@test.com',partnerAdd: 'Delhi',mobileNo:'868686868',contactNo:'96396399',	directNo:'0223565656',fax:'3666366336' },
      {fullName: 'Ravi Varma',designation: 'Sales Executive',emailId: 'ravi@test.com',partnerAdd: 'Pune',mobileNo:'97979779797',contactNo:'9879879778',	directNo:'0226969696',fax:'855855855' }
    ];

    this.bank = [
      {bankName:'ICICI',	shortCode:'ICI',	accountNo:'12335568998',	ifsc:'ICICI00022', branch:'Borivali'},
      {bankName:'Kotak Mahindra',	shortCode:'KKM',	accountNo:'45671471474122',	ifsc:'KKM45454', branch:'Thane'},
      {bankName:'SBI',	shortCode:'SBI',	accountNo:'874411011477',	ifsc:'SBI000477', branch:'Pune'},
      {bankName:'HDFC',	shortCode:'HDFC',	accountNo:'41214122445',	ifsc:'HDF000078', branch:'Kandivali'},
      {bankName:'Axis',	shortCode:'AX',	accountNo:'658989878998',	ifsc:'AX7009987', branch:'Bhiwandi'}
    ];
    
    this.gst= [
      {state:'Maharashtra', GST:'27ADUPH3114M'},
      {state:'Goa', GST:'66ADUPH37411G'},
      {state:'Gujrat', GST:'45ADUPH5824G'}
    ];
    
  }

    openDialogForaddAddress() {
      const ref = this.dialogService.open( AddressComponent  , {
        data: {
        },
        header: 'Add Address',
        width: '80%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          // this.toastService.addSingle("success", "Mail send successfully", "");
        }
      });
    }
    openDialogForaddContact() {
      const ref = this.dialogService.open( ContactComponent  , {
        data: {
        },
        header: 'Add Contact',
        width: '80%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          // this.toastService.addSingle("success", "Mail send successfully", "");
        }
      });
    }
    openDialogForBank() {
      const ref = this.dialogService.open( BankComponent  , {
        data: {
        },
        header: 'Add Bank',
        width: '80%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          // this.toastService.addSingle("success", "Mail send successfully", "");
        }
      });
    }
    openDialogForGST() {
      const ref = this.dialogService.open( GstComponent  , {
        data: {
        },
        header: 'Add GST',
        width: '28%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          // this.toastService.addSingle("success", "Mail send successfully", "");
        }
      });
    }
  }


