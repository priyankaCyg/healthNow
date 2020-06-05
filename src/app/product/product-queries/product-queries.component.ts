import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from '../../services/toast.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { productQuerData } from 'src/app/model/productQueries';

@Component({
  selector: 'app-product-queries',
  templateUrl: './product-queries.component.html',
  styleUrls: ['./product-queries.component.css']
})
export class ProductQueriesComponent implements OnInit {
  queriesArray: productQuerData[];
  queriesSubmitArray = [];
  prd_Id: number;
  constructor(private fb: FormBuilder, private httpService: ApiService,
    private toastService: ToastService, public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.prd_Id = +localStorage.getItem('iPrdID');
    var productQueAPI = {
      "iRequestID": 2164,
      "iProductID": this.prd_Id
    }
    this.httpService.callPostApi(productQueAPI).subscribe(
      data => {
        this.queriesArray = data.body[0];
        if (this.queriesArray != null) {
          this.setValue();
        }
      },
      error => { console.log(error) }
    );
  }

  //code for implements form builder
  queriesForm = this.fb.group({
    sQue1: [""],
    sAns1: [""],
    sQue2: [""],
    sAns2: [""],
    sQue3: [""],
    sAns3: [""],
    sQue4: [""],
    sAns4: [""],
    sQue5: [""],
    sAns5: [""],
    sQue6: [""],
    sAns6: [""],
    sQue7: [""],
    sAns7: [""],
    sQue8: [""],
    sAns8: [""],
  })

  //code for set value when i click on edit data
  setValue() {
    for (var i = 0; i < this.queriesArray.length; i++) {
      var sQueVarName = "sQue" + (i + 1);
      var sAnsVarName = "sAns" + (i + 1);
      this.queriesForm.patchValue({ [sQueVarName]: this.queriesArray[i].sQue, [sAnsVarName]: this.queriesArray[i].sAns })
    }
  }

  //code for add product Queries data 
  onSubmit() {
    for (let i = 0; i < 8; i++) {
      var sQueVarName = "sQue" + (i + 1);
      var sAnsVarName = "sAns" + (i + 1);
      let sQue_data = this.queriesForm.controls[sQueVarName].value.toString();
      let sAns_data = this.queriesForm.controls[sAnsVarName].value.toString();
      if (sQue_data != "" && sQue_data != undefined) {
        const info_obj = {
          sQue: sQue_data,
          sAns: sAns_data
        }
        this.queriesSubmitArray.push(info_obj);
      }
    }
    const addQuer_data = {
      "iRequestID": 2163,
      "iProductID": this.prd_Id,
      "sJson": this.queriesSubmitArray
    };
    this.httpService.callPostApi(addQuer_data).subscribe(
      (data) => {
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
        this.ref.close(true);
        this.queriesForm.reset();
      },
      (error) => console.log(error)
    );
  }

  //code for close dialog box
  onClose() {
    this.ref.close();
    this.queriesForm.reset();
  }
}
