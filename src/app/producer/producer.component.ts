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
import {ConfirmationService} from 'primeng/api';
import {LoginService} from '../../app/services/login.service'


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
    private toastService: ToastService,
    private confirmationService: ConfirmationService,private loginService:LoginService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Producer', routerLink: ['/app/producer'] }
    ]);
}


ngOnInit() {


  var isBrowserClosed = localStorage.getItem('isBrowserClosed')
  if(isBrowserClosed || isBrowserClosed==null)
  {
    this.loginService.getAccess().then(response1 => {

      console.log("Response of Access ",response1)
  
  
    }).catch(error=>{
      // console.log(JSON.stringify(error))
    })
  }
  this.showProducers();

}


  //List Producer Details
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

      deleteProducer(producerId)
      {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            var dataToSendDelete = {
              "iRequestID":2123,
              "iProducerID":producerId
            }
    
            this._apiService.getDetails(dataToSendDelete).then(response => {
              console.log("Response for Producer Delete ",response)
              this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
              this.showProducers();
            });
          },
          reject: () => {
      this.toastService.addSingle("info", "Rejected", "Rejected");
    
          }
      });
      }

}