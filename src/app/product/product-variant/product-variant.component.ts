import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-variant',
  templateUrl: './product-variant.component.html',
  styleUrls: ['./product-variant.component.css']
})
export class ProductVariantComponent implements OnInit {

  unit;
  selectedunit;
  
  constructor() { }

  ngOnInit(): void {
  }

}
