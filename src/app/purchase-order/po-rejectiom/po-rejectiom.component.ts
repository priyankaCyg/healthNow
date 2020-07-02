import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng';

@Component({
  selector: 'app-po-rejectiom',
  templateUrl: './po-rejectiom.component.html',
  styleUrls: ['./po-rejectiom.component.css']
})
export class PoRejectiomComponent implements OnInit {

  submitFlag: number =0;
  po_id: number;
  po_no: string;
  remarks: string;

  constructor(private httpService: ApiService, private toastService: ToastService,public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.po_id = this.config.data.iPOID;
    this.po_no = this.config.data.sPONo;
    console.log(this.po_no)
  }

  //Function to Reject PO 
  rejectPO() {
    if(this.submitFlag==0){
      this.submitFlag=1;
      console.log(this.remarks)
      if(this.remarks == "" || this.remarks == undefined || this.remarks == null){
        this.toastService.displayApiMessage("Pleas enter remarks", 300);
        this.submitFlag=0;
      }
      else{
      let reject_data_api = {
        "iRequestID": 2357,
        "iPOID": this.po_id,
        "sStatusRemark": this.remarks
      };
      console.log(reject_data_api)
      this.httpService.callPostApi(reject_data_api).subscribe(
        (data) => {
          if(data.headers.get('StatusCode')==200){
            this.ref.close(true);
          }
          this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          this.submitFlag=0;
        },
        (error) => console.log(error)
      );
      }
    }
  }

  closeDialog() {
    this.ref.close();
  }

}
