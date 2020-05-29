import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receive-product',
  templateUrl: './receive-product.component.html',
  styleUrls: ['./receive-product.component.css']
})
export class ReceiveProductComponent implements OnInit {

  batch: any[];
  constructor() { }

  ngOnInit(): void {
    this.batch = [
      { batch:'B1', qty:'50'},
      { batch:'B2', qty:'50'}
    ];

  }

}
