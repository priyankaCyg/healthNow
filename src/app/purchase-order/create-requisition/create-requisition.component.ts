import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-requisition',
  templateUrl: './create-requisition.component.html',
  styleUrls: ['./create-requisition.component.css']
})
export class CreateRequisitionComponent implements OnInit {
  products:any[];
  constructor() { }

  ngOnInit(): void {
    this.products = [
      { product:'Gluten Free Wheat 10kg Pack'},
      { product:'Gluten Free Wheat 5kg Pack' },
      { product:'Gluten Free Wheat 2kg Pack'},
      { product:'Horlicks 1kg Refill Pack' },
      { product:'Horlicks 750 gm Refill Pack'},
      { product:'Horlicks Refill Pack, 500 gm'}

    ];
  }

}
