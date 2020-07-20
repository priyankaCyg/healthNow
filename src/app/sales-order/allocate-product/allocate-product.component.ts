import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-allocate-product',
  templateUrl: './allocate-product.component.html',
  styleUrls: ['./allocate-product.component.css']
})
export class AllocateProductComponent implements OnInit {

  batch: any[];
  product_name: string;
  variant_name: string;
  quantity: number;
  alocQuantity: number
  qty_data: any[];
  data: any[] = [];
  showmeAdd: number;
  isdisabled: boolean = true;
  orderAlloc: any[];

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef,
    private httpService: ApiService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.product_name = this.config.data.sPrdName;
    this.variant_name = this.config.data.sVariant;
    this.quantity = this.config.data.iQty;
    //this.batch = [this.config.data];
    this.getCusOrderAllocData();
  }

  getCusOrderAllocData() {
    const productAllocChildAPI = {
      "iRequestID": 2441,
      "iWHAddID": this.config.data.iWHAddID,
      "iPrdID": this.config.data.iPrdID
    }
    this.httpService.callPostApi(productAllocChildAPI).subscribe(
      data => {
        this.batch = data.body;
      },
      error => { console.log(error) }
    )
  }

  
  changeAllocQty(qty, index: number) {
    if (qty == null) {
      qty = 0;
    }
    this.qty_data = qty;
    if (this.data[index] != null) {
      this.data[index] = this.qty_data;
    }
    else {
      this.data.push(this.qty_data);
    }
    this.showmeAdd = this.data.reduce((a, b) => a + b, 0);
    if (this.showmeAdd > this.quantity) {
      this.toastService.displayApiMessage("Pleas enter valid quantity", 300);
      this.isdisabled = true;
    } else {
      this.isdisabled = false;
    }
    if (this.showmeAdd == this.quantity) {
      this.isdisabled = false;
    } else {
      this.isdisabled = true;
    }

  }

  saveAllocate() {
    this.batch.forEach((key, index) => {
      let sBatchNo = this.batch[index].sBatchNo;
      let alocQuantity = this.batch[index].alocQuantity;
      if (alocQuantity != null || alocQuantity != undefined) {
        let tempArray = {
          "sBatchNo": sBatchNo,
          "iAllocatedQty": alocQuantity
        }
        this.orderAlloc.push(tempArray)
        console.log(tempArray, "testarray")
      }
    });
    const data = {
      "iRequestID": 2435,
      "iSOPrdID": this.config.data.iSOPrdID,
      "iPrdID": this.config.data.iPrdID,
      "sGINAllocation": this.orderAlloc
    }
    console.log(data, "data");
    this.httpService.callPostApi(data).subscribe(
      (data) => {
        this.ref.close(true);
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      (error) => console.log(error)
    );
  }

  close() {
    this.ref.close();
  }
}