import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
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
  infoSubmitArray =[];
  prd_Id : number;
  constructor(public config: DynamicDialogConfig,
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastService: ToastService,
    public ref: DynamicDialogRef,) { }

  ngOnInit(): void {
    this.prd_Id = +localStorage.getItem('iProductID');
    
    var infoDataApi = {
      "iRequestID": 2161,
    // "iProductID":prd_Id
    "iProductID":1
    }

      this.apiService.callPostApi(infoDataApi).subscribe(
     
      data => { console.log(data);

        this.infoArray = data[0];
        console.log(this.infoArray,"test")
        this.setValue();
      },
      error => {console.log(error)}
    
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

    setValue(){

      for(var i=0;i<this.infoArray.length;i++)
      {
        var infoVarName = "sInfo"+(i+1);
        this.infoForm.patchValue({[infoVarName]:this.infoArray[i].sInfo})
      }
    }

    onClose() {
      this.ref.close();
      this.infoForm.reset();
    }

    
  onSubmit() {

    // let desig_id = this.config.data.iDesigID;
    // let desig_name = this.desigForm.controls["desig_name"].value;
    // let desig_level = this.desigForm.controls["desig_level"].value;
    // let status = this.desigForm.controls["status"].value;
    // let status_id = status.iKVID;
    console.log(this.infoSubmitArray,"check")
    let seq: number=0;
    for(let i=0;i<12;i++){
      
      var infoVarName = "sInfo"+(i+1);
      let info_data = this.infoForm.controls[infoVarName].value.toString();
      if(info_data != "" && info_data != undefined){
       
       const info_obj = {
        iSeq: seq + 1,
        sInfo: info_data
       }
        
       console.log(info_obj)
       this.infoSubmitArray.push(info_obj);
       seq++;
      }
      
    }
    console.log(this.infoSubmitArray,"check")
    console.log(this.infoForm.value)
    const addInfo_data = {
      "iRequestID": 2162,
      // "iProductID":this.prd_Id,
      "iProductID":1,
      "sJson": this.infoSubmitArray
    };
    console.log(addInfo_data, "add");
          this.apiService.callPostApi(addInfo_data).subscribe(
            (data) => {
              console.log(data);
              this.ref.close(true);
              this.infoForm.reset();
            },
            (error) => console.log(error)
          );
      
       
      
  }

}
