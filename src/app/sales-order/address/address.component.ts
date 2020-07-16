import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  address: string;
  constructor(private config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.address = this.config.data;
  }

}
