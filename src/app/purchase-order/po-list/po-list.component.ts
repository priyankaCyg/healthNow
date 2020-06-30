import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { ApiService } from 'src/app/services/api.service';
import { poListMaster } from 'src/app/model/poList.model';
import { ToastService } from 'src/app/services/toast.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.css']
})

export class PoListComponent implements OnInit {

  selectedValues: any[] = [];
  poList: poListMaster[];
  checked: boolean = true;
  batch: any[];
  public isExpanded: boolean = false;
  public expandedRows = {};
  public temDataLength: number = 0;
  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private httpService: ApiService, private confirmationService: ConfirmationService, private toastService: ToastService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
  }

  ngOnInit(): void {
    this.getPOList();
    this.batch = [];
  }

  //Function to get all PO list
  getPOList() {
    const poListAPI = {
      "iRequestID": 2359,
    }
    this.httpService.callPostApi(poListAPI).subscribe(
      data => {
        this.poList = data.body;
        for (var i = 0; i < this.poList.length; i++) {
          if (this.poList[i].iIncludeTaxes == 1) {
            this.selectedValues.push(this.poList[i]);
          }
        }
      },
      error => { console.log(error) }
    )
  }

  //code for get child data table
  getPOChildList(iPOID: Number) {
    const poListAPI = {
      "iRequestID": 2362,
      "iPOID": iPOID
    }
    this.httpService.callPostApi(poListAPI).subscribe(
      data => {
        this.batch = data.body;
        console.log(this.batch);
      },
      error => { console.log(error) }
    )
  }

  //Function to delete PO
  deletePO(iPOID: Number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let delete_data_api = {
          "iRequestID": 2353,
          "iPOID": iPOID
        };
        this.httpService.callPostApi(delete_data_api).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.getPOList();
          },
          (error) => console.log(error)
        );
      }
    });
  }

  //Function to send PO for approval 
  sendForApprovalPO(iPOID: Number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to send this for approval ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let delete_data_api = {
          "iRequestID": 2354,
          "iPOID": iPOID
        };
        this.httpService.callPostApi(delete_data_api).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.getPOList();
          },
          (error) => console.log(error)
        );
      }
    });
  }

  //Function to edit PO
  editPO(poList) {
    localStorage.setItem('isPoEdit', 'true');
    localStorage.setItem('poDetails', JSON.stringify({ poList }));
  }

  expandAll() {
    if (!this.isExpanded) {
      this.poList.forEach(data => {
        this.expandedRows[data.iPOID] = 1;
      })
    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  onRowExpand() {
    console.log("row expanded", Object.keys(this.expandedRows).length);
    if (Object.keys(this.expandedRows).length === this.temDataLength) {
      this.isExpanded = true;
    }
  }

  onRowCollapse() {
    console.log("row collapsed", Object.keys(this.expandedRows).length);
    if (Object.keys(this.expandedRows).length === 0) {
      this.isExpanded = false;
    }
  }

}
