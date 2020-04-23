import { Component, OnInit } from '@angular/core';
// import {DynamicDialogConfig} from ''

import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  constructor(public config: DynamicDialogConfig) { }

  ngOnInit(): void {

    alert(this.config.data.roleId)
  }

}
