import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { receivedProductMaster } from 'src/app/model/receivedProduct.model';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { config } from 'src/config';
import { ToastService } from 'src/app/services/toast.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmationService } from 'primeng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receive-product',
  templateUrl: './receive-product.component.html',
  styleUrls: ['./receive-product.component.css']
})
export class ReceiveProductComponent implements OnInit {

  data: object;
  public productForm: FormGroup;
  responseData: object;
  product_name: string;
  ordered_qty: number;
  pending_qty: number;
  recievedPrddata: receivedProductMaster;
  receivedArray = [];
  submitFlag: number=0;

  constructor(private fb: FormBuilder,private datePipe: DatePipe, private httpService: ApiService,
    private toastService: ToastService, private confirmationService: ConfirmationService, private router: Router) { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('goodsDetails'));
    this.responseData = Object.values(this.data);
    this.product_name = this.responseData[0].sPrdName;
    this.ordered_qty = this.responseData[0].iQty;
    this.pending_qty = this.responseData[0].iPendingQty
    this.recievedPrddata = new receivedProductMaster();
    this.productForm = this.createControl(this.recievedPrddata);
  }

  // moment(poData.sPODate,'MM-DD-YYYY').format('DD-MM-YYYY')
  createControl(prdData?: receivedProductMaster): FormGroup {
    this.productForm = this.fb.group({
      sBatchNo: [prdData.sBatchNo, Validators.required],
      iReceivedQty: [prdData.iReceivedQty, Validators.required],
      sPODNo: [prdData.sPODNo, Validators.required],
      sPODDate: [prdData.sPODDate ? moment(prdData.sPODDate).toDate(): null, Validators.required],
      sManufacturingDate: [prdData.sManufacturingDate ? moment(prdData.sManufacturingDate).toDate(): null, Validators.required],
      sExpireDate: [prdData.sExpireDate ? moment(prdData.sExpireDate).toDate(): null, Validators.required],
    });
    return this.productForm;
  }

  //Function to add batch details in batch table
  addDetails(){
    var formData = this.productForm.getRawValue();
    let entered_qty = +formData.iReceivedQty;
    if(entered_qty > this.ordered_qty){
      this.toastService.displayApiMessage("Enter valid received quantiy", 300);
    }
    else{
      console.log(formData)
      let new_date_pod = formData.sPODDate;
     let pod_date = this.datePipe.transform(new_date_pod, config.dateFormat);
     let new_date_mfg = formData.sManufacturingDate;
     let mfg_date = this.datePipe.transform(new_date_mfg, config.dateFormat);
     let new_date_exp = formData.sExpireDate;
     let exp_date = this.datePipe.transform(new_date_exp, config.dateFormat);
    const prd_obj = {
      "sBatchNo":formData.sBatchNo,
      "sManufacturingDate":mfg_date,
      "sExpireDate":exp_date,
      "sPODNo":formData.sPODNo,
      "sPODDate":pod_date,
      "iReceivedQty":+formData.iReceivedQty,
      "iUserID":1
    }
    this.receivedArray.push(prd_obj);
    this.productForm.reset();
    console.log(this.receivedArray)
    }
  }

  // open modal for delete batch 
  deleteBatch(batchData, batchIndex: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Batch ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.receivedArray.splice(batchIndex, 1);
        let batch_no = "Batch " + batchData.sBatchNo + " has been deleted successfully" 
        this.toastService.displayApiMessage(batch_no,200);
      }
    });
  }

  saveGRN(){
    if (this.submitFlag == 0) {
      this.submitFlag = 1;
      const addbatchAPI = {
        "iRequestID": 2341,
        "iPrdID": this.responseData[0].iPrdID,
        "iPOPrdID": this.responseData[0].iPOPrdID,
        "sGRNData": this.receivedArray,
       
      }
      this.httpService.callPostApi(addbatchAPI).subscribe(
        data => {
          if (data.headers.get('StatusCode') == 200) {
            this.router.navigate(['/grn/grn-list'])
          }
          this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          this.submitFlag = 0;
        });
    }
  }
}
