import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { poDetailMaster } from 'src/app/model/poDetail.model';
import { ApiService } from 'src/app/services/api.service';
import { supplierReqListData } from 'src/app/model/supplier-requisitionList';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-po-detail',
  templateUrl: './create-po-detail.component.html',
  styleUrls: ['./create-po-detail.component.css']
})

export class CreatePoDetailComponent implements OnInit {

  poDetail: poDetailMaster[];
  data: [];
  poData: supplierReqListData[];
  supplierName: string;
  partnerName: string;
  location: string;
  selectedValues = [];
  myDate = new Date();
  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService, private httpService: ApiService,
    private router: Router, private toastService: ToastService, private datePipe: DatePipe, private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
  }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('supplierReqData'));
    this.poData = Object.values(this.data);
    this.supplierName = this.poData[0].sSupName;
    this.partnerName = this.poData[0].sPartnerName;
    this.location = this.poData[0].sLocName;
    this.getPoDetailList();
  }

  //Function to fetch po details list
  getPoDetailList() {
    const getDetails = {
      "iRequestID": 23311,
      "iSupID": this.poData[0].iSupID,
      "iPartnerID": this.poData[0].iPartnerID,
      "iPartLocID": this.poData[0].iPartLocID
    }
    this.httpService.callPostApi(getDetails).subscribe(
      data => {
        this.poDetail = data.body;
      },
      error => { console.log(error) }
    )
  }

  //Function to create PO
  createPO() {
    let todayDate = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
    if (this.selectedValues.length >= 1) {
      let reqId = this.selectedValues.map(({ iPReqID }) => iPReqID);
      let reqIds = reqId.toString();
      const sendPoDetails = {
        "iRequestID": 2351,
        "iSupID": this.poData[0].iSupID,
        "iPartnerID": this.poData[0].iPartnerID,
        "iPartLocID": this.poData[0].iPartLocID,
        "sPODate": todayDate
      }
      this.httpService.callPostApi(sendPoDetails).subscribe(
        data => {
          let resData = data.body;
          const sendProductDetails = {
            "iRequestID": 2361,
            "iPOID": resData[0].iPOID,
            "sPrdReqIds": reqIds
          }
          this.httpService.callPostApi(sendProductDetails).subscribe(
            data => {
              let responseData = data.body[0];
              localStorage.setItem('isPoEdit', 'false');
              localStorage.setItem('poDetails', JSON.stringify({ responseData }));
              this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
              this.router.navigate(['/purchase-order/po-general-details'])
            },
            error => { console.log(error) }
          )
        },
        error => { console.log(error) }
      )
    }
    else {
      this.toastService.addSingle("warn", "Please select at least one Product", " ")
    }
  }

  // Dialog box to delete product list
  deletePoDetail(iPReqID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete this Record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var deleteAddressAPI = {
          "iRequestID": 23313,
          "iPReqID": iPReqID
        }
        this.httpService.callPostApi(deleteAddressAPI).subscribe(
          data => {
            this.getPoDetailList();
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          },
          error => { console.log(error) }
        );
      }
    });
  }
}
