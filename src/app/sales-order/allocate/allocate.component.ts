import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allocate',
  templateUrl: './allocate.component.html',
  styleUrls: ['./allocate.component.css']
})
export class AllocateComponent implements OnInit {

  batch: any[];

  constructor() { }

  ngOnInit(): void {
    this.batch = [
      { batch:'B1', expiryDate:'01-06-2021', qty:'100'},
      { batch:'B2', expiryDate:'01-06-2021', qty:'50'}
    ];

  }

}
