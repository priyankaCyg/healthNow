import { Component, OnInit } from '@angular/core';
import { poListMaster } from 'src/app/model/poList.model';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { DialogService, ConfirmationService } from 'primeng';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-purchase-order-approval',
  templateUrl: './purchase-order-approval.component.html',
  styleUrls: ['./purchase-order-approval.component.css']
})
export class PurchaseOrderApprovalComponent implements OnInit {
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
    this.batch = [
      { batchNo: 'B1', recvQty: '50', podNo: '00123', podDate: '19-05-2020', manfactDate: '01-01-2020', expDate: '31-12-2020' },
      { batchNo: 'B2', recvQty: '50', podNo: '00124', podDate: '19-05-2020', manfactDate: '01-01-2020', expDate: '31-12-2020' }
    ];

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

  //Function to Approve PO
  approvePO(iPOID: Number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to approval this record?',
      header: 'Confirmation',
      icon: 'pi pi-check',
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

  //Function to Reject PO 
  rejectPO(iPOID: Number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to reject this record ?',
      header: 'Confirmation',
      icon: 'pi pi-times',
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

  expandAll() {
    if (!this.isExpanded) {
      this.poList.forEach(data => {
        this.expandedRows[data.sPONo] = 1;
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

  onPage(event: any) {
    this.temDataLength = this.poList.slice(event.first, event.first + 10).length;
    console.log(this.temDataLength);
    this.isExpanded = false;
    this.expandedRows = {};
  }



}