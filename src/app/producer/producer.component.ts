import { Component, OnInit } from '@angular/core';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { AddProducerComponent } from './add-producer/add-producer.component';
import { ToastService } from "../services/toast.service";
import { ConfirmationService } from 'primeng/api';
import { ApiService } from '../services/api.service';
import { ProducerMaster } from '../model/producer.model';
import { config } from 'src/config';


@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})

export class ProducerComponent implements OnInit {

  items: MenuItem[];
  producer: ProducerMaster[] = [];
  noRecordFound: string;

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private toastService: ToastService, private httpService: ApiService,
    private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Producer', routerLink: ['/producer'] }
    ]);
  }

  ngOnInit() {
    this.showProducers();
    this.noRecordFound = config.noRecordFound;
  }

  //code for List of Producer data
  showProducers() {
    var dataToSend = {
      "iRequestID": 2124
    }
    this.httpService.callPostApi(dataToSend).subscribe(
      data => {
        this.producer = data.body;
      },
      error => console.log(error)
    );
  }

  //code for add new producer dialog box
  openDialogForaddProducer() {
    const ref = this.dialogService.open(AddProducerComponent, {
      data: {
      },
      header: 'Add New Producer',
      width: '28%'
    });
    ref.onClose.subscribe((success: any) => {
      if (success) {
        this.showProducers()
      }
    });
  }

  //code for edit producer dialog box
  editProducer(producerId) {
    const ref = this.dialogService.open(AddProducerComponent, {
      data: {
        producerId: producerId
      },
      header: 'Edit Producer',
      width: '28%'
    });
    ref.onClose.subscribe((success: any) => {
      if (success) {
        this.showProducers()
      }
    });
  }

  //code for delete producer data
  deleteProducer(producerId) {
    this.confirmationService.confirm({
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID": 2123,
          "iProducerID": producerId
        }
        this.httpService.callPostApi(dataToSendDelete).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.showProducers();
          },
          (error) => console.log(error)
        );
      },
    });
  }

}