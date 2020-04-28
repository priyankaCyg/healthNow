import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import {GenrelEditComponent} from './generalEdit/generalEdit.component'
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import {ToastService} from '../services/toast.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

    items: MenuItem[];
  

  constructor(private countryService: CountryService,private breadcrumbService: BreadcrumbService,
    private dialogService: DialogService,private toastService:ToastService) {
    this.breadcrumbService.setItems([
        { label: 'App' },
        { label: 'landingPage', routerLink: ['/app/landingPage'] }
    ]);
}

  ngOnInit(): void {
    // alert("Hi")

     this.items = [
            { label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io' },
            { label: 'Theming', icon: 'pi pi-file', routerLink: ['/theming'] }
        ];
  }


  openDialogForMail() {
    this.toastService.addSingle("info", "Info Message", "PrimeNG rocks");

    const ref = this.dialogService.open(GenrelEditComponent, {
      data: {
      },
      header: 'Send Mail',
      width: '80%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }


}
