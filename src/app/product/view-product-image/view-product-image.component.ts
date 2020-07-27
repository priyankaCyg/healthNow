import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng';

@Component({
  selector: 'app-view-product-image',
  templateUrl: './view-product-image.component.html',
  styleUrls: ['./view-product-image.component.css']
})
export class ViewProductImageComponent implements OnInit {

  imagePath;

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef,) { }

  ngOnInit(): void {
    this.imagePath = this.config.data;
  }
  
}
