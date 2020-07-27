import { Component, OnInit } from '@angular/core';
import {APIService} from '../../services/apieservice';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit {

  uploadedFiles: any[] = [];
  prd_Id:number;
  sequence;

  constructor(private _apiService:APIService,   private config: DynamicDialogConfig,private toastService: ToastService,
    private ref: DynamicDialogRef,) { }

  ngOnInit(): void {
    this.prd_Id = +localStorage.getItem('iPrdID');
    this.sequence = this.config.data;
  }

  onUpload(event) {
    // alert("hi")
    for (const file of event.files) {
        this.uploadedFiles.push(file);
        console.log(event)
        //alert(JSON.stringify(this.uploadedFiles))
        // this._apiService.postFile(this.uploadedFiles).subscribe(data => {
        //   alert('Success');
        // }, error => {
        //   console.log(error);
        // });
      }
      this.uploadFile()
    // this.msgs = [];
    // this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Upload Completed' });
}

uploadFile() {
  // alert(JSON.stringify(this.uploadedFiles))
  const dataToSend = {
    "iRequestID": 1111,
    "iPrdID": this.prd_Id,
    "sPrdCode":"NNO3125",
    "iSequence": this.sequence,
    "iDocTypeID": 4
    // "iRequestID": 1111,
    // "iProcessTranID": this.prd_Id,
    // "iProcessID": 2,
    // "iDocTypeID": 4
  }
  this._apiService.postImage(this.uploadedFiles, dataToSend).subscribe(data => {
    this.ref.close(true);
    this.toastService.addSingle("success","Image Uploaded Successfully","")
    // this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
  }, error => {
    console.log(error);
  });
}



}
