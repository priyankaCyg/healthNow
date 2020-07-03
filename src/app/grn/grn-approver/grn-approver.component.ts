import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmationService, DialogService } from 'primeng';
import { ToastService } from 'src/app/services/toast.service';
import { GrnRejectionComponent } from '../grn-rejection/grn-rejection.component';

@Component({
  selector: 'app-grn-approver',
  templateUrl: './grn-approver.component.html',
  styleUrls: ['./grn-approver.component.css']
})
export class GrnApproverComponent implements OnInit {

  batch: any[];
  public cars: any[];
  public cols: any[];
  public isExpanded: boolean = false;
  public rows: number = 10;
  public expandedRows = {};
  public temDataLength: number = 0;
  po_prdid: number;
  grnList;
  constructor(private httpService: ApiService, private confirmationService: ConfirmationService, private toastService: ToastService,
    private dialogService: DialogService) { }

  ngOnInit() {

    // this.batch = [
    //   {  batchNo:'B1', recvQty:'50', podNo:'00123',podDate:'19-05-2020',manfactDate:'01-01-2020',expDate:'31-12-2020'},
    //   { batchNo:'B2', recvQty:'50', podNo:'00124',podDate:'19-05-2020',manfactDate:'01-01-2020',expDate:'31-12-2020'}
    // ] ;

    this.cols = [
      { field: 'sSupName', header: 'Supplier Name' },
      { field: 'sRequisionNo', header: 'Requisition No' },
      { field: 'sPONo', header: 'PO No' },
      { field: 'sPrdName', header: 'Product' },
      { field: 'iOrderQty', header: 'Ordered Quantity' },
      // { field: 'sPODate', header: 'Scheduled Date' },
    ];
    this.cars = CARS;
    this.getgrnList();
    this.cars.length < this.rows ? this.temDataLength = this.cars.length : this.temDataLength = this.rows;
  }

  //code for get list of grn list data 
  getgrnList() {
    const grnListAPI = {
      "iRequestID": 2349,
    }
    this.httpService.callPostApi(grnListAPI).subscribe(
      data => {
        this.grnList = data.body;
      },
      error => { console.log(error) }
    )
  }

  //code for get child data table
  getPOChildList(iPOPrdID: number) {
    this.po_prdid = iPOPrdID
    const poListAPI = {
      "iRequestID": 23411,
      "iPOPrdID": iPOPrdID
    }
    this.httpService.callPostApi(poListAPI).subscribe(
      data => {
        this.batch = data.body;
      },
      error => { console.log(error) }
    )
  }

  //Function to Approve PO
  approvedGRN(iGRNID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to approval this record?',
      header: 'Confirmation',
      icon: 'pi pi-check',
      accept: () => {
        let approve_data_api = {
          "iRequestID": 2348,
          "iGRNID": iGRNID
        };
        console.log(approve_data_api)
        this.httpService.callPostApi(approve_data_api).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            //this.getgrnList();
            this.getPOChildList(this.po_prdid);
          },
          (error) => console.log(error)
        );
      }
    });
  }

  //Dialog box to reject PO
  rejectDialoBox(poDetails) {
    const ref = this.dialogService.open(GrnRejectionComponent, {
      data: poDetails,
      header: 'Reason For Rejection',
      width: '28%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        //this.getgrnList();
        this.getPOChildList(this.po_prdid);
      }
    });
  }

  expandAll() {
    if (!this.isExpanded) {
      this.cars.forEach(data => {
        this.expandedRows[data.vin] = 1;
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
    this.temDataLength = this.cars.slice(event.first, event.first + 10).length;
    console.log(this.temDataLength);
    this.isExpanded = false;
    this.expandedRows = {};
  }
}
const CARS = [
  { "supName": "SKK Suppliers", "reqNo": "ALPHA/234/11-05", "PoNo": "PO/SS/20200514/4", "product": "Groundnut Oil", "qty": "100", "scldDate": "19-05-2020" }
];
