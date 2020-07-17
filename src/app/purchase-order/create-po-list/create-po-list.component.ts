import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { ApiService } from 'src/app/services/api.service';
import { supplierReqListData } from 'src/app/model/supplier-requisitionList';
import { config } from 'src/config';

@Component({
  selector: 'app-create-po-list',
  templateUrl: './create-po-list.component.html',
  styleUrls: ['./create-po-list.component.css']
})
export class CreatePoListComponent implements OnInit {

  items: MenuItem[];
  poList: supplierReqListData[] = [];
  noRecordFound: string;

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private httpService: ApiService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
  }

  ngOnInit(): void {
    this.getAllSuppplierReqList();
    this.noRecordFound = config.noRecordFound;

  }

  getAllSuppplierReqList() {
    const supplierReq_list_api =
    {
      "iRequestID": 23310,
    }
    this.httpService.callPostApi(supplierReq_list_api).subscribe(
      data => {
        this.poList = data.body;
        console.log(this.poList)
      },
      error => console.log(error)
    );
  }

  createPO(poList) {
    localStorage.setItem('supplierReqData', JSON.stringify({ poList }));
  }
}
