import { Component, OnInit } from '@angular/core';
import { DialogService, MenuItem, DynamicDialogConfig, DynamicDialogRef } from 'primeng';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { poDetailMaster } from 'src/app/model/poDetail.model';

@Component({
  selector: 'app-create-po-detail-edit',
  templateUrl: './create-po-detail-edit.component.html',
  styleUrls: ['./create-po-detail-edit.component.css']
})
export class CreatePoDetailEditComponent implements OnInit {

  items: MenuItem[];
  poDetail: poDetailMaster;
  public editPOForm: FormGroup;
  qty:number;
  rate: number;
  disper:number;

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService, private httpService: ApiService,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private toastService: ToastService, ) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
  }

  ngOnInit(): void {
    console.log(this.config.data)
    this.poDetail = new poDetailMaster(this.config.data);
    this.editPOForm = this.createControl(this.poDetail);
  }

  createControl(productData?: poDetailMaster): FormGroup {
    this.editPOForm = this.fb.group({
      sPCName: [productData.sPCName],
      sPrdName: [productData.sPrdName],
      iQty: [productData.iQty, [Validators.required, Validators.pattern('^[0-9]*$')]],
      iSupRate: [productData.iSupRate],
      iDisPer: [productData.iDisPer, [Validators.required, Validators.pattern('^[0-9]*$')]],
      iDisAmt: [productData.iDisAmt],
      iTotalAmount: [productData.iTotalAmount],
    });
    return this.editPOForm;
  }

  qtyChange() {
    this.qty = this.editPOForm.controls['iQty'].value;
    this.rate = this.editPOForm.controls['iSupRate'].value;
    this.disper = this.editPOForm.controls['iDisPer'].value;
 
    if(this.disper){
      let temp = parseFloat((this.disper/100).toFixed(2));
      let dis_amnt = parseFloat((temp * this.rate).toFixed(2));
      let temp1 = parseFloat((this.rate-dis_amnt).toFixed(2));
      let total_amnt = parseFloat((temp1*this.qty).toFixed(2))
      this.editPOForm.patchValue({
        iDisAmt: [dis_amnt],
        iTotalAmount: [total_amnt]
      });
    }
    else{
      this.toastService.addSingle("warn", "Please enter discount ", " ")
    }
  }
  disPerChange(){
    this.qty = this.editPOForm.controls['iQty'].value;
    this.rate = this.editPOForm.controls['iSupRate'].value;
    this.disper = this.editPOForm.controls['iDisPer'].value;
 
    if(this.qty){
      let temp = parseFloat((this.disper/100).toFixed(2));
      let dis_amnt = parseFloat((temp * this.rate).toFixed(2));
      let temp1 = parseFloat((this.rate-dis_amnt).toFixed(2));
      let total_amnt = parseFloat((temp1*this.qty).toFixed(2))
      this.editPOForm.patchValue({
        iDisAmt: [dis_amnt],
        iTotalAmount: [total_amnt]
      });
    }
    else{
      this.toastService.addSingle("warn", "Please enter Quantity ", " ")
    }
  }


  // update PO product details
  updatePOdetail() {
    var formData = this.editPOForm.getRawValue();
    var editAPI = {
      "iRequestID": 23314,
      "iPReqID":this.config.data.iPReqID,
      "iDisPer": +formData.iDisPer,
      "iQty":+formData.iQty
    }
    console.log(editAPI)
    this.httpService.callPostApi(editAPI).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      }
    );
  }

  // Close  Popup
  closeDialog() {
    this.ref.close();
    this.editPOForm.reset();
  }
}
