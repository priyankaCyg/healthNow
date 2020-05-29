import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-good-expected',
  templateUrl: './good-expected.component.html',
  styleUrls: ['./good-expected.component.css']
})
export class GoodExpectedComponent implements OnInit {

  goodExp: any[];

  constructor() {}

  ngOnInit(): void {
    this.goodExp = [
      { supName:'SKK Suppliers', reqNo:'ALPHA/234/11-05', PoNo:'PO/SS/20200514/4', product:'Groundnut Oil', qty:'100'},
      { supName:'KKB Suppliers', reqNo:'ALPHA/234/1', PoNo:'PO/SS/20200513/5', product:'Mustard Oil', qty:'150'},
      { supName:'NOM Suppliers', reqNo:'ALPHA/234/1', PoNo:'PO/SS/20200512/6', product:'Gluten Free Wheat', qty:'100'},
      { supName:'SRK Suppliers', reqNo:'ALPHA/234/1', PoNo:'PO/SS/20200511/7', product:'Horlicks', qty:'200'}
    ];

  }

}