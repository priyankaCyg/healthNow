import { Component, OnInit } from '@angular/core';
import { poListMaster } from 'src/app/model/poList.model';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { DialogService, ConfirmationService } from 'primeng';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { PoRejectiomComponent } from '../po-rejectiom/po-rejectiom.component';

@Component({
  selector: 'app-purchase-order-approval',
  templateUrl: './purchase-order-approval.component.html',
  styleUrls: ['./purchase-order-approval.component.css']
})
export class PurchaseOrderApprovalComponent implements OnInit {
  poList: poListMaster[];
  checked: boolean = true;
  batch: any[];
  public isExpanded: boolean = false;
  public rows: number = 10;
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
    //this.batch = [];
  }

  //code for get list of po approval data 
  getPOList() {
    const poListAPI = {
      "iRequestID": 2355,
    }
    this.httpService.callPostApi(poListAPI).subscribe(
      data => {
        this.poList = data.body;
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
        let approve_data_api = {
          "iRequestID": 2356,
          "iPOID": iPOID
        };
        console.log(approve_data_api)
        this.httpService.callPostApi(approve_data_api).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.getPOList();
          },
          (error) => console.log(error)
        );
      }
    });
  }

   //Dialog box to reject PO
   rejectDialoBox(poDetails) {
    const ref = this.dialogService.open(PoRejectiomComponent, {
      data: poDetails,
      header: 'Reason For Rejection',
      width: '28%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getPOList();
      }
    });
  }

  expandAll() {
    if (!this.isExpanded) {
      this.poList.forEach(data => {
        this.expandedRows[data.iPOID] = true;
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
