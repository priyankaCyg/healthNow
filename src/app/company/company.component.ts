import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneralEditComponent } from './general-edit/general-edit.component';
import { AddNewAddressComponent } from './add-new-address/add-new-address.component';

import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { from } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

    items: MenuItem[];

    address: any[];

    constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
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
        this.address = [
          { addresstype: 'Registered', address1: 'address01', address2: 'address001', state: 'Maharashtra', city: 'Thane', landmark: 'Hirandadni', tel1:'4564466456',tel2:'77887897899',fax:'25588525858', status:'Active'},
          { addresstype: 'Wearhouse', address1: 'address02', address2: 'address002', state: 'Maharashtra', city: 'Bhiwandi', landmark: 'Hirandadni', tel1:'4564466456',tel2:'77887897899',fax:'25588525858', status:'Active' },
          { addresstype: 'Registered', address1: 'address03', address2: 'address003', state: 'Maharashtra', city: 'Mumbai', landmark: 'Hirandadni', tel1:'4564466456',tel2:'77887897899',fax:'25588525858', status:'Active' },
          { addresstype: 'Wearhouse', address1: 'address04', address2: 'address004', state: 'Maharashtra', city: 'Bhiwandi', landmark: 'Hirandadni', tel1:'4564466456',tel2:'77887897899',fax:'25588525858', status:'Active' },
          { addresstype: 'Wearhouse', address1: 'address05', address2: 'address005', state: 'Maharashtra', city: 'Mumbai', landmark: 'Hirandadni', tel1:'4564466456',tel2:'77887897899',fax:'25588525858', status:'Active' },
          { addresstype: 'Registered', address1: 'address06', address2: 'address006', state: 'Maharashtra', city: 'Thane', landmark: 'Hirandadni', tel1:'4564466456',tel2:'77887897899',fax:'25588525858', status:'Active' },
          { addresstype: 'Registered', address1: 'address07', address2: 'address007', state: 'Maharashtra', city: 'Bhiwandi', landmark: 'Hirandadni', tel1:'4564466456',tel2:'77887897899',fax:'25588525858', status:'Active' },
          { addresstype: 'Wearhouse', address1: 'address08', address2: 'address008', state: 'Maharashtra', city: 'Mumbai', landmark: 'Hirandadni', tel1:'4564466456',tel2:'77887897899',fax:'25588525858', status:'Active' },
          { addresstype: 'Registered', address1: 'address09', address2: 'address009', state: 'Maharashtra', city: 'Thane', landmark: 'Hirandadni', tel1:'4564466456',tel2:'77887897899',fax:'25588525858', status:'Active' },
          { addresstype: 'Wearhouse', address1: 'address010', address2: 'address0010', state: 'Maharashtra', city: 'Bhiwandi', landmark: 'Hirandadni', tel1:'4564466456',tel2:'77887897899',fax:'25588525858', status:'Active' }
          
      ];
      
    }

    openDialogForGeneraledit() {
      const ref = this.dialogService.open( GeneralEditComponent , {
        data: {
        },
        header: 'Edit Details',
        width: '80%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          // this.toastService.addSingle("success", "Mail send successfully", "");
        }
      });
    }
    openDialogForaddNewAddress() {
      const ref = this.dialogService.open( AddNewAddressComponent , {
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


}
