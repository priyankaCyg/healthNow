import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  items: MenuItem[];

  partner: any[];


  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Partner', routerLink: ['/app/partner'] }
    ]);
}


  ngOnInit(): void {
    this.partner = [
      { partnerName:'Krishna Biyani', shortCode:'PRT1',legalEntity:'1',	website:'www.productNew.com',	telNo1:'7778899778',telNo2:'252525252',fax:'010101010', pan:'PKJP12312' },
      { partnerName:'Rajanish Gaurav',shortCode:'PRT2',legalEntity:'3',	website:'www.newproduct.com',	telNo1:'9988779987',telNo2:'656565665',fax:'4141414141', pan:'BKSKM45456' },
      { partnerName:'Shibin KP',shortCode:'PRT3',legalEntity:'7',	website:'www.allinone.com',	telNo1:'8877998787',telNo2:'4447744454',fax:'323232323', pan:'RTBG454545' },
      { partnerName:'Neelam Majhgavkar',shortCode:'PRT4',legalEntity:'8',	website:'www.productbyHelth.com',	telNo1:'7474747474',telNo2:'2323223223',fax:'6565656556', pan:'MJKLF4455' },
      { partnerName:'Priyanka Sahu',shortCode:'PRT5',legalEntity:'6',	website:'www.productwow.com',	telNo1:'9696969699',telNo2:'2125212512',fax:'2828288252', pan:'SKBK55698' }
    ];
  }

}
