import { Component, OnInit } from '@angular/core';
import {APIService} from '../../services/apieservice';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit {

  uploadedFiles: any[] = [];


  constructor(private _apiService:APIService) { }

  ngOnInit(): void {
  }

  onUpload(event) {
    // alert("hi")
    for (const file of event.files) {
        this.uploadedFiles.push(file);
        alert(JSON.stringify(this.uploadedFiles))
        // this._apiService.postFile(this.uploadedFiles).subscribe(data => {
        //   alert('Success');
        // }, error => {
        //   console.log(error);
        // });
      }

    // this.msgs = [];
    // this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Upload Completed' });
}

}
