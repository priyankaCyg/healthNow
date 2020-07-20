import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { ToastService } from "../services/toast.service";
import { ConfirmationService } from 'primeng/api';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { ApiService } from '../services/api.service';
import { UnitMaster } from '../model/unit.model';
import { config } from 'src/config';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})

export class UnitComponent implements OnInit {

  items: MenuItem[];
  unit: UnitMaster[] = [];
  noRecordFound: string;

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService, private httpService: ApiService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Unit', routerLink: ['/unit'] }
    ]);
  }

  ngOnInit(): void {
    this.showUnit();
    this.noRecordFound = config.noRecordFound;
  }

  // code for list of unit data
  showUnit() {
    var dataToSend = {
      "iRequestID": 2144
    }
    this.httpService.callPostApi(dataToSend).subscribe(
      data => {
        this.unit = data.body;
      },
      error => console.log(error)
    );
  }

  //code for open dialog box of unit
  openDialogForaddUnit() {
    const ref = this.dialogService.open(AddUnitComponent, {
      data: {
      },
      header: 'Add New Unit',
      width: '28%'
    });
    ref.onClose.subscribe((success: any) => {
      if (success) {
        this.showUnit();
      }
    });
  }

  //code for edit dialog box of unit  
  editUnit(unitId) {
    const ref = this.dialogService.open(AddUnitComponent, {
      data: {
        unitId: unitId
      },
      header: 'Edit Unit',
      width: '28%'
    });
    ref.onClose.subscribe((success: any) => {
      if (success) {
        this.showUnit();
      }
    });
  }

  //code for delete data of unit 
  deleteUnit(unitId) {
    this.confirmationService.confirm({
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID": 2143,
          "iUnitID": unitId
        }
        this.httpService.callPostApi(dataToSendDelete).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.showUnit();
          },
          (error) => console.log(error)
        );
      },
    });
  }

}