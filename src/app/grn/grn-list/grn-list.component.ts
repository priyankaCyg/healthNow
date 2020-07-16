import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmationService, DialogService } from 'primeng';
import { ToastService } from 'src/app/services/toast.service';
import { config } from 'src/config';

@Component({
  selector: 'app-grn-list',
  templateUrl: './grn-list.component.html',
  styleUrls: ['./grn-list.component.css']
})
export class GrnListComponent implements OnInit {

  batch: any[];
  cars: any[];
  public cols: any[];
  public isExpanded: boolean = false;
  public rows: number = 10;
  public expandedRows = {};
  public temDataLength: number = 0;
  po_prdid;
  grnList: any[];
  constructor(private httpService: ApiService, private confirmationService: ConfirmationService, private toastService: ToastService,
    private dialogService: DialogService) { }

  ngOnInit() {

    // this.batch = [
    //   { batchNo: 'B1', recvQty: '50', podNo: '00123', podDate: '19-05-2020', manfactDate: '01-01-2020', expDate: '31-12-2020' },
    //   { batchNo: 'B2', recvQty: '50', podNo: '00124', podDate: '19-05-2020', manfactDate: '01-01-2020', expDate: '31-12-2020' }
    // ];

    this.cols = [
      { field: 'sSupName', header: 'Supplier Name' },
      { field: 'sRequisionNo', header: 'Requisition No' },
      { field: 'sPONo', header: 'PO No' },
      { field: 'sPrdName', header: 'Product' },
      { field: 'iOrderQty', header: 'Ordered Quantity' },
      // { field: 'sPODate', header: 'Scheduled Date', type: 'customDate' },
    ];
    this.cars = grnList;
    this.getgrnList();
    this.cars.length < this.rows ? this.temDataLength = this.cars.length : this.temDataLength = this.rows;
  }

  //code for get list of grn list data 
  getgrnList() {
    const grnListAPI = {
      "iRequestID": 2343,
    }
    this.httpService.callPostApi(grnListAPI).subscribe(
      data => {
        this.grnList = data.body;
      },
      error => { console.log(error) }
    )
  }

  //code for get child data table
  getPOChildList(iPOPrdID: Number) {
    this.po_prdid = iPOPrdID
    const poListAPI = {
      "iRequestID": 2344,
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
  approveGRN(iGRNID: Number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to approval this record?',
      header: 'Confirmation',
      icon: 'pi pi-check',
      accept: () => {
        let approve_data_api = {
          "iRequestID": 2346,
          "iGRNID": iGRNID
        };
        console.log(approve_data_api)
        this.httpService.callPostApi(approve_data_api).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.getgrnList();
            this.getPOChildList(this.po_prdid);
          },
          (error) => console.log(error)
        );
      }
    });
  }

  //Function to Approve PO
  deleteGRN(iGRNID: Number) {
    this.confirmationService.confirm({
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-check',
      accept: () => {
        let delete_data_api = {
          "iRequestID": 2345,
          "iGRNID": iGRNID
        };
        console.log(delete_data_api)
        this.httpService.callPostApi(delete_data_api).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.getgrnList();
            this.getPOChildList(this.po_prdid);
          },
          (error) => console.log(error)
        );
      }
    });
  }

  expandAll() {
    if (!this.isExpanded) {
      this.grnList.forEach(data => {
        this.expandedRows[data.iPOPrdID] = 1;
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
const grnList = [
  //{ "supName": "SKK Suppliers", "reqNo": "ALPHA/234/11-05", "PoNo": "PO/SS/20200514/4", "product": "Groundnut Oil", "qty": "100", "scldDate": "19-05-2020" }
];
