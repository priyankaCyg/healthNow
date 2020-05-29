import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allocate-product',
  templateUrl: './allocate-product.component.html',
  styleUrls: ['./allocate-product.component.css']
})
export class AllocateProductComponent implements OnInit {

  batch: any[];

  constructor() { }

  ngOnInit(): void {
    this.batch = [
      { batch:'B1', expiryDate:'01-06-2021', inStock:'100'},
      { batch:'B2', expiryDate:'01-06-2021', inStock:'50'}
    ];

  }

}