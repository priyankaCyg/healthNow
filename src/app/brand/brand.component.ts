import { Component, OnInit } from '@angular/core';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { NewBrandComponent } from './new-brand/new-brand.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  items: MenuItem[];

  brand: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Brand', routerLink: ['/app/brand'] }
    ]);
}
ngOnInit() {
  
  this.brand =[
    {producer:'HealthyHey', brandName: 'HealthyHey', status: 'Active'},
    {producer:'Nestle', brandName: 'Nescafe Coffee', status: 'Active'},
    {producer:'Danone', brandName: 'ProtineX ', status: 'Active'},
    {producer:'Abbott', brandName: 'Ensure ',  status: 'Active'},
    {producer:'Hindustan Unilever', brandName: 'Horlicks ', status: 'Active'}
  ];

}

openDialogFornewBrand() {
  const ref = this.dialogService.open( NewBrandComponent , {
    data: {
    },
    header: 'Add New Brand',
    width: '28%'
  });

  ref.onClose.subscribe((success: boolean) => {
    if (success) {
      // this.toastService.addSingle("success", "Mail send successfully", "");
    }
  });
}
}