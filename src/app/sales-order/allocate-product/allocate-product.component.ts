import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allocate-product',
  templateUrl: './allocate-product.component.html',
  styleUrls: ['./allocate-product.component.css']
})
export class AllocateProductComponent implements OnInit {

  batch: any[];
  quantity;
  qty_data: any[];
  data: any[] = [];
  showmeAdd;
  constructor() { }

  ngOnInit(): void {
    this.batch = [
      { batch: 'B1', expiryDate: '01-06-2021', inStock: '100' },
      { batch: 'B2', expiryDate: '01-06-2021', inStock: '50' }
    ];

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

}