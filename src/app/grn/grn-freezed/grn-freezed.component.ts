import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { ApiService } from 'src/app/services/api.service';
import { grnData } from 'src/app/model/grn.model';

@Component({
  selector: 'app-grn-freezed',
  templateUrl: './grn-freezed.component.html',
  styleUrls: ['./grn-freezed.component.css']
})
export class GrnFreezedComponent implements OnInit {

  grnListData: grnData[];
  batch: any[];
  public isExpanded: boolean = false;
  public expandedRows = {};
  public temDataLength: number = 0;
  constructor(private breadcrumbService: BreadcrumbService, private httpService: ApiService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'GRN Freezed', routerLink: ['/grn'] }
    ]);
  }

  ngOnInit(): void {
    this.getGRNList();
    this.batch = [];
  }

  //Function to get all PO list
  getGRNList() {
    const listAPI = {
      "iRequestID": 23410,
    }
    this.httpService.callPostApi(listAPI).subscribe(
      data => {
        this.grnListData = data.body;
      },
      error => { console.log(error) }
    )
  }

  //code for get child data table
  getChildList(iPOPrdID: Number) {
    const ListAPI = {
      "iRequestID": 23412,
      "iPOPrdID": iPOPrdID
    }
    this.httpService.callPostApi(ListAPI).subscribe(
      data => {
        this.batch = data.body;
        console.log(this.batch);
      },
      error => { console.log(error) }
    )
  }

  expandAll() {
    if (!this.isExpanded) {
      this.grnListData.forEach(data => {
        this.expandedRows[data.iPOPrdID] = 1;
      })
    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  onRowExpand() {
    console.log("row expanded", Object.keys(this.expandedRows).length);
    if (Object.keys(this.expandedRows).length === 1) {
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
