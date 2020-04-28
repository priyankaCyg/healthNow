import { Component, OnInit } from '@angular/core';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { AddProducerComponent } from './add-producer/add-producer.component';


@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {

  items: MenuItem[];

    producer: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Producer', routerLink: ['/app/producer'] }
    ]);
}


ngOnInit() {
  
  this.producer =[
    {producerName: 'Nordic Naturals', country: 'US', shortCode: 'NOR', status: 'Active'},
    {producerName: 'HealthyHey', country: 'India',  shortCode: 'HHY', status: 'Active'},
    {producerName: 'Abbott ', country: 'US', shortCode: 'ABOT',  status: 'Active'},
    {producerName: 'Nestle ', country: 'Switzerland', shortCode: 'NST', status: 'Active'},
    {producerName: 'Danone', country: 'Spain', shortCode: 'DNN',  status: 'Active'}
  ];

}

    openDialogForaddProducer() {
    const ref = this.dialogService.open( AddProducerComponent , {
      data: {
      },
      header: 'Add New Producer',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
    }

}