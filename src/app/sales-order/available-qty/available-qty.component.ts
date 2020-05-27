import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-qty',
  templateUrl: './available-qty.component.html',
  styleUrls: ['./available-qty.component.css']
})
export class AvailableQtyComponent implements OnInit {

  avblQty: any[];

  constructor() { }

  ngOnInit(): void {

    this.avblQty = [
      { batchNo:'B1', expiryDate:'01-06-2021', qty:'100'},
      { batchNo:'B2', expiryDate:'01-06-2021', qty:'50'}
    ];
  }

}
