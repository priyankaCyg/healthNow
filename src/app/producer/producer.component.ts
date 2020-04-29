import { Component, OnInit } from '@angular/core';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { AddProducerComponent } from './add-producer/add-producer.component';
import {APIService} from '../services/apieservice';
import { ToastService } from "../services/toast.service";


@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {

  items: MenuItem[];

    // producer: any[];
    producer;


  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService,private _apiService:APIService,
    private toastService: ToastService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Producer', routerLink: ['/app/producer'] }
    ]);
}


ngOnInit() {
  
  // this.producer =[
  //   {producerName: 'Nordic Naturals', country: 'US', shortCode: 'NOR', status: 'Active'},
  //   {producerName: 'HealthyHey', country: 'India',  shortCode: 'HHY', status: 'Active'},
  //   {producerName: 'Abbott ', country: 'US', shortCode: 'ABOT',  status: 'Active'},
  //   {producerName: 'Nestle ', country: 'Switzerland', shortCode: 'NST', status: 'Active'},
  //   {producerName: 'Danone', country: 'Spain', shortCode: 'DNN',  status: 'Active'}
  // ];

  this.showProducers();

}


  //List Employee Details
  showProducers()
  {
    var dataToSend ={
      "iRequestID": 2124
  }
    this._apiService.getDetails(dataToSend).then(response => {
      console.log("Response for Producers ",response)
      this.producer = response
    });
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
        this.toastService.addSingle("success", "Added successfully", "");
        this.showProducers();
      }
    });
    }


    editProducer(producerId) {
      const ref = this.dialogService.open( AddProducerComponent , {
        data: {
          producerId:producerId
        },
        header: 'Edit Producer',
        width: '28%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          this.toastService.addSingle("success", "Updated successfully", "");
        this.showProducers();

        }
      });
      }

}