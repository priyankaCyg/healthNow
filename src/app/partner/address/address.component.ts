import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addressType;
  selectedaddressType;
  sate;
  selectedstate;
  city;
  selectedcity;
  
  constructor() { }

  ngOnInit(): void {
  }

}
