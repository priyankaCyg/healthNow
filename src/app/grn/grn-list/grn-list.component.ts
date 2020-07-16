import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmationService, DialogService } from 'primeng';
import { ToastService } from 'src/app/services/toast.service';
import { config } from 'src/config';
import { grnData } from 'src/app/model/grn.model';

@Component({
  selector: 'app-grn-list',
  templateUrl: './grn-list.component.html',
  styleUrls: ['./grn-list.component.css']
})
export class GrnListComponent implements OnInit {

  public cols: any[];
  public isExpanded: boolean = false;
  public rows: number = 10;
  public expandedRows = {};
  public temDataLength: number = 0;
  po_prdid: number;
  grnList: grnData[];
  grnListChilddata: any[];
  GRN = [];

  constructor(private httpService: ApiService, private confirmationService: ConfirmationService, private toastService: ToastService) { }

  ngOnInit() {

    this.cols = [
      { field: 'sSupName', header: 'Supplier Name' },
      { field: 'sRequisionNo', header: 'Requisition No' },
      { field: 'sPONo', header: 'PO No' },
      { field: 'sPrdName', header: 'Product' },
      { field: 'iOrderQty', header: 'Ordered Quantity' },
      // { field: 'sPODate', header: 'Scheduled Date', type: 'customDate' },
    ];

    this.getgrnList();
    this.grnList = this.GRN;
    this.grnList.length < this.rows ? this.temDataLength = this.grnList.length : this.temDataLength = this.rows;
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
  getPOChildList(iPOPrdID: number) {
    this.po_prdid = iPOPrdID
    const poListAPI = {
      "iRequestID": 2344,
      "iPOPrdID": iPOPrdID
    }
    this.httpService.callPostApi(poListAPI).subscribe(
      data => {
        this.grnListChilddata = data.body;
      },
      error => { console.log(error) }
    )
  }

  //Function to Approve PO
  approveGRN(iGRNID: number) {
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
  deleteGRN(iGRNID: number) {
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
    this.temDataLength = this.grnList.slice(event.first, event.first + 10).length;
    console.log(this.temDataLength);
    this.isExpanded = false;
    this.expandedRows = {};
  }
}
