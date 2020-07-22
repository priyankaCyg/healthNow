import { Component, OnInit, Input } from '@angular/core';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng';
import { UpdatePodComponent } from '../update-pod/update-pod.component';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  deliveryList: any[] = [];
  deliveryChildList: any[];
  Delivery = [];

  public cols: any[];
  public isExpanded: boolean = false;
  public rows: number = 10;
  public expandedRows = {};
  public temDataLength: number = 0;

  constructor(private dialogService: DialogService, private httpService: ApiService) { }

  ngOnInit() {

    this.cols = [
      { field: 'sSONo', header: 'Order No' },
      { field: 'sCustomerName', header: 'Customer Name' },
      { field: 'sAddress', header: 'Location' }];

    this.getDeliveryList();
    this.deliveryList = this.Delivery;
    this.deliveryList.length < this.rows ? this.temDataLength = this.deliveryList.length : this.temDataLength = this.rows;
  }

  //Function to get Delivery list
  getDeliveryList() {
    const DeliveryListAPI = {
      "iRequestID": 24313,
    }
    this.httpService.callPostApi(DeliveryListAPI).subscribe(
      data => {
        this.deliveryList = data.body;
      },
      error => { console.log(error) }
    )
  }

  //code for get Delivery List child data table
  getDeliveryChildList(iSOID: Number) {
    const deliveryChildAPI = {
      "iRequestID": 24314,
      "iSOID": iSOID
    }
    this.httpService.callPostApi(deliveryChildAPI).subscribe(
      data => {
        this.deliveryChildList = data.body;
      },
      error => { console.log(error) }
    )
  }

  openDialogForUpdatePOD() {
    const ref = this.dialogService.open(UpdatePodComponent, {
      data: {
      },
      header: 'Update POD',
      width: '30%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }

  expandAll() {
    if (!this.isExpanded) {
      this.deliveryList.forEach(data => {
        this.expandedRows[data.iSOID] = 1;
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
    this.temDataLength = this.deliveryList.slice(event.first, event.first + 10).length;
    console.log(this.temDataLength);
    this.isExpanded = false;
    this.expandedRows = {};
  }

}

