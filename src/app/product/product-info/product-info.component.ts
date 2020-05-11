import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductInfoMaster } from 'src/app/model/product-info.model';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from '../../services/toast.service';
import { ProductInfoData } from 'src/app/model/productInfo';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  //public infoForm: FormGroup;
 // infoData: ProductInfoMaster;
  infoArray: ProductInfoData[];
  prd_Id : number;
  constructor(public config: DynamicDialogConfig,
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastService: ToastService,
    public ref: DynamicDialogRef,) { }

  ngOnInit(): void {
    this.prd_Id = +localStorage.getItem('iProductID');
    // this.infoData = new ProductInfoMaster();
    // this.infoForm = this.createControl(this.infoData);
    var infoDataApi = {
      "iRequestID": 2161,
    // "iProductID":prd_by_id
    "iProductID":1
    }

      this.apiService.callPostApi(infoDataApi).subscribe(
      //   data => {console.log(data)
      //   for(let i=0;i<data[0].length;i++){
      //     console.log(i);
      //     this.infoData = new ProductInfoMaster(data[0][i]);
      //     const temp =  this.infoData;
      //     console.log(temp);
      //    // console.log(this.infoArray,"test")
      //   }
       
      //  }
      data => { console.log(data);

        this.infoArray = data[0];
        console.log(this.infoArray[0]['sInfo'],"test")
        this.setValue();
      },
      error => {console.log(error)}
    
       );
       
  }
  
  infoForm = this.fb.group({
    iSeq: [""],
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

    setValue(){
      this.infoForm.patchValue({
        // desig_name: this.config.data.sDesigName,
     
        // iSeq: [this.infoArray.iSeq],
        sInfo1: this.infoArray[0].sInfo,
        sInfo2: this.infoArray[1].sInfo,
        sInfo3: this.infoArray[2].sInfo,
        sInfo4: this.infoArray[3].sInfo,
        sInfo5: this.infoArray[4].sInfo,
        sInfo6: this.infoArray[5].sInfo,
        sInfo7: this.infoArray[6].sInfo,
        sInfo8: this.infoArray[7].sInfo,
        sInfo9: this.infoArray[8].sInfo,
        sInfo10: this.infoArray[9].sInfo,
        sInfo11: this.infoArray[10].sInfo,
        sInfo12: this.infoArray[11].sInfo,
       
      });
    }
//   createControl(infoData? : ProductInfoMaster) : FormGroup {
//   this.infoForm = this.fb.group({
//     sInfo: [infoData.sInfo],
//     iSeq: [infoData.iSeq],
    
//   })

//   return this.infoForm;
// }

}
