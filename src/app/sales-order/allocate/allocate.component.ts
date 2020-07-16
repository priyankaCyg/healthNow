import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng';

@Component({
  selector: 'app-allocate',
  templateUrl: './allocate.component.html',
  styleUrls: ['./allocate.component.css']
})
export class AllocateComponent implements OnInit {

  batch: any[];
  product_name: string;
  variant_name: string;
  quantity: number;
  qty_data: any[];
  data: any[] = [];
  showmeAdd: number;
  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.product_name = this.config.data.sPrdName;
    this.variant_name = this.config.data.sVariant;
    this.batch = [this.config.data];
  }

  changeAllocQty(qty, index: number) {
    this.qty_data = qty;
    if (this.data[index] != null) {
      this.data[index] = this.qty_data;
    }
    else {
      this.data.push(this.qty_data);
    }
    this.showmeAdd = this.data.reduce((a, b) => a + b, 0);
  }

  close() {
    this.ref.close();
  }

}
