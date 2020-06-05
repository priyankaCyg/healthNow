import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from '../../services/toast.service';
import { ProductInfoData } from 'src/app/model/productInfo';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  infoArray: ProductInfoData[];
  infoSubmitArray = [];
  prd_Id: number;

  constructor(public config: DynamicDialogConfig,
    private httpService: ApiService,
    private fb: FormBuilder,
    private toastService: ToastService,
    public ref: DynamicDialogRef, ) { }

  ngOnInit(): void {
    this.prd_Id = +localStorage.getItem('iPrdID');
    var infoDataApi = {
      "iRequestID": 2161,
      "iProductID": this.prd_Id
    }
    this.httpService.callPostApi(infoDataApi).subscribe(
      data => {
        this.infoArray = data.body[0];
        if (this.infoArray != null) {
          this.setValue();
        }
      },
      error => { console.log(error) }
    );
  }

  infoForm = this.fb.group({
    sInfo1: [""],
    sInfo2: [""],
    sInfo3: [""],
    sInfo4: [""],
    sInfo5: [""],
    sInfo6: [""],
    sInfo7: [""],
    sInfo8: [""],
    sInfo9: [""],
    sInfo10: [""],
    sInfo11: [""],
    sInfo12: [""],
  });

  //Function to Set values in info dialog box on Add/Edit 
  setValue() {
    for (var i = 0; i < this.infoArray.length; i++) {
      var infoVarName = "sInfo" + (i + 1);
      this.infoForm.patchValue({ [infoVarName]: this.infoArray[i].sInfo })
    }
  }

  //Function to close popup
  onClose() {
    this.ref.close();
    this.infoForm.reset();
  }

  //Function to save info data
  onSubmit() {
    let seq: number = 0;
    for (let i = 0; i < 12; i++) {
      var infoVarName = "sInfo" + (i + 1);
      let info_data = this.infoForm.controls[infoVarName].value.toString();
      if (info_data != "" && info_data != undefined) {
        const info_obj = {
          iSeq: seq + 1,
          sInfo: info_data
        }
        this.infoSubmitArray.push(info_obj);
        seq++;
      }
    }
    const addInfo_data = {
      "iRequestID": 2162,
      "iProductID": this.prd_Id,
      "sJson": this.infoSubmitArray
    };
    this.httpService.callPostApi(addInfo_data).subscribe(
      (data) => {
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
        this.ref.close(true);
        this.infoForm.reset();
      },
      (error) => console.log(error)
    );
  }
}
