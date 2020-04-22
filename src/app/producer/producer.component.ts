import { Component, OnInit } from '@angular/core';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { AddProducerComponent } from './add-producer/add-producer.component';
import { BrandComponent } from './brand/brand.component';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {

  items: MenuItem[];

    producer: any[];

    brand: any[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Company', routerLink: ['/app/producer'] }
    ]);
}


ngOnInit() {
  this.producer =[
    {producerName: 'Nordic Naturals', cuntry: 'US', status: 'Active'},
    {producerName: 'HealthyHey', cuntry: 'India',  status: 'Active'},
    {producerName: 'Abbott ', cuntry: 'US',  status: 'Active'},
    {producerName: 'Nestle ', cuntry: 'Switzerland',  status: 'Active'},
    {producerName: 'Danone', cuntry: 'Spain',  status: 'Active'}
  ];

  this.brand = [
    {brandName: 'HealthyHey', shortCode: 'HHY', status: 'Active'},
    {brandName: 'Protinex', shortCode: 'PTX', status: 'Active'},
    {brandName: 'Ensure', shortCode: 'ENR', status: 'Active'},
    {brandName: 'Horlicks', shortCode: 'HRL', status: 'Active'},
    {brandName: 'PediaSure', shortCode: 'PDS', status: 'Active'},
    {brandName: 'Bournvita ', shortCode: 'BRV', status: 'Active'}
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
    openDialogForBrand() {
    const ref = this.dialogService.open( BrandComponent , {
      data: {
      },
      header: 'Add New GST',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });

}

}