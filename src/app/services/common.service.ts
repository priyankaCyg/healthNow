import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  statusData;
  selectedstatus;
  public isAdmin = new BehaviorSubject<boolean>(false);
  cast = this.isAdmin.asObservable();

  constructor(private apiService: ApiService, private confirmationService: ConfirmationService,
    private toastService: ToastService) { }



  stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
  }

  convertDateForInput(_date, _format, _delimiter) {
    let formatLowerCase = _format.toLowerCase();
    let formatItems = formatLowerCase.split(_delimiter);
    let dateItems = _date.split(_delimiter);
    let monthIndex = formatItems.indexOf("mm");
    let dayIndex = formatItems.indexOf("dd");
    let yearIndex = formatItems.indexOf("yyyy");
    let month = parseInt(dateItems[monthIndex]);
    let formatedDate = dateItems[yearIndex] + "-" + month + "-" + dateItems[dayIndex];
    return formatedDate;
  }

  convertDateForOutput(_date, _format, _delimiter) {
    let formatLowerCase = _format.toLowerCase();
    let formatItems = formatLowerCase.split(_delimiter);
    let dateItems = _date.split(_delimiter);
    let monthIndex = formatItems.indexOf("mm");
    let dayIndex = formatItems.indexOf("dd");
    let yearIndex = formatItems.indexOf("yyyy");
    let month = parseInt(dateItems[monthIndex]);
    let formatedDate = dateItems[dayIndex] + "-" + month + "-" + dateItems[yearIndex];
    return formatedDate;
  }

  convertDateForCalculation(_date, _format, _delimiter) {
    let formatLowerCase = _format.toLowerCase();
    let formatItems = formatLowerCase.split(_delimiter);
    let dateItems = _date.split(_delimiter);
    let monthIndex = formatItems.indexOf("mm");
    let dayIndex = formatItems.indexOf("dd");
    let yearIndex = formatItems.indexOf("yyyy");
    let month = parseInt(dateItems[monthIndex]);
    let formatedDate = month + "/" + dateItems[dayIndex] + "/" + dateItems[yearIndex];
    return formatedDate;
  }


  // common delete function
  // deleteData(delete_data_api): any {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to proceed?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.apiService.callPostApi(delete_data_api).subscribe(
  //         (data) => {
  //           this.isAdmin.next(true);
  //           this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
  //         },
  //         (error) => console.log(error)
  //       );
  //     }
  //   });
  // }

  // getDrpDwn() {
  //   var dataToSend4 = {
  //     "iRequestID": 2071,
  //     "sKVName": "Status"
  //   }
  //   return new Promise((resolve, reject) => {
  //     this.apiService.getDropDownData(dataToSend4).then(response => {
  //       this.statusData = response
  //       this.statusData.splice(0, 0, { iKVID: "", sKVValue: "Select Status" })
  //       this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
  //       resolve(this.statusData)
  //       return this.statusData;
  //     });
  //   })
  // }

}
