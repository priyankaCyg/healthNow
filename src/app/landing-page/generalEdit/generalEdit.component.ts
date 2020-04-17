import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng';

@Component({
  selector: 'generalEdit',
  templateUrl: 'generalEdit.component.html',
  styleUrls: ['generalEdit.component.css']
})
export class GenrelEditComponent implements OnInit {

  constructor(public ref: DynamicDialogRef) { }

  ngOnInit() {
  }

  closeDialog(){
    this.ref.close(true);
  }
}
