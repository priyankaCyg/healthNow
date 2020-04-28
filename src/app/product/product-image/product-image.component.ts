import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit {

  uploadedFiles: any[] = [];


  constructor() { }

  ngOnInit(): void {
  }

  onUpload(event) {
    for (const file of event.files) {
        this.uploadedFiles.push(file);
    }

    // this.msgs = [];
    // this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Upload Completed' });
}

}
