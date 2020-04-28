import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { from } from 'rxjs';

import { AddUnitComponent } from './add-unit/add-unit.component';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  items: MenuItem[];

  unit: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Unit', routerLink: ['/app/unit'] }
  ]);
   }

  ngOnInit(): void {
    
    this.unit = [
      {srNo: '1', unitName: 'Gram'},
      {srNo: '2', unitName: 'Kg'},
      {srNo: '3', unitName: 'Nos'},
      {srNo: '4', unitName: 'Liter'}
    ];
  }
    openDialogForaddUnit() {
      const ref = this.dialogService.open( AddUnitComponent , {
    data: {
    },
    header: 'Add New Unit',
    width: '28%'
  });
  ref.onClose.subscribe((success: boolean) => {
    if (success) {
      // this.toastService.addSingle("success", "Mail send successfully", "");
    }
  });
}
}