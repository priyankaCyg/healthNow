import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { Message } from 'primeng/api';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  items: MenuItem[];
  partner: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private httpService: ApiService, private toastService: ToastService, private confirmationService: ConfirmationService,
    private router: Router) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Partner', routerLink: ['/partner'] }
    ]);
  }

  ngOnInit(): void {
    this.getAllPartner();
  }

  // get list of partner
  getAllPartner() {
    const Partner_list_api =
    {
      "iRequestID": 2287,
    }
    this.httpService.callPostApi(Partner_list_api).subscribe(
      data => {
        this.partner = data.body;
      },
      error => console.log(error)
    );
  }

  //delete partner
  deletePartner(iPartnerID: Number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let partner_id = iPartnerID;
        console.log(partner_id);
        let delete_data_api = {
          "iRequestID": 2283,
          "iPartnerID": partner_id
        };
        this.httpService.callPostApi(delete_data_api).subscribe(
          (data) => {
            this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
            this.getAllPartner();
          },
          (error) => console.log(error)
        );
      }
    });
  }

  //edit partner
  editPartner(iPartnerID: Number) {
    this.router.navigate(['/partner/edit-partner', iPartnerID]);
  }
}
