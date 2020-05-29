/**
Template Name: HealthNow
Author: Priyanka Sahu
Created Date: 
File: unit.component
**/

import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { from } from 'rxjs';

import { APIService } from '../services/apieservice';
import { ToastService } from "../services/toast.service";
import { ConfirmationService } from 'primeng/api';

import { AddUnitComponent } from './add-unit/add-unit.component';
import { LoginService } from '../../app/services/login.service'

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  items: MenuItem[];

  unit: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService, private _apiService: APIService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService, private loginService: LoginService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Unit', routerLink: ['/unit'] }
    ]);
  }

  ngOnInit(): void {
    // this.loginService.checkBrowserClosed();

    this.showUnit();

  }



  showUnit() {
    var dataToSend = {
      "iRequestID": 2144
    }
    this._apiService.getDetails(dataToSend).then(response => {
      console.log("Response for Unit ", response)
      this.unit = response
    });
  }


  openDialogForaddUnit() {
    const ref = this.dialogService.open(AddUnitComponent, {
      data: {
      },
      header: 'Add New Unit',
      width: '28%'
    });
    ref.onClose.subscribe((message: any) => {
      if (message.StatusCode == "200") {
        this.toastService.addSingle("success", message.StatusMessage, "");
      }
      else {
        this.toastService.addSingle("error", message.StatusMessage, "");
      }
      this.showUnit();
    });
  }




  editUnit(unitId) {
    const ref = this.dialogService.open(AddUnitComponent, {
      data: {
        unitId: unitId
      },
      header: 'Edit Unit',
      width: '28%'
    });

    ref.onClose.subscribe((message: any) => {
      if (message.StatusCode == "200") {
        this.toastService.addSingle("success", message.StatusMessage, "");
      }
      else {
        this.toastService.addSingle("error", message.StatusMessage, "");
      }
      this.showUnit();
    });
  }

  deleteUnit(unitId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID": 2143,
          "iBrandID": unitId
        }

        this._apiService.getDetails(dataToSendDelete).then(response => {
          console.log("Response for Brand Delete ", response)
          this.toastService.addSingle("info", response.headers.get('StatusMessage'), "");
          this.showUnit();
        });
      },
      reject: () => {
        this.toastService.addSingle("info", "Rejected", "Rejected");

      }
    });
  }

}