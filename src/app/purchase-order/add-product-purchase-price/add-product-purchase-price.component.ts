import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { purchaseProductMaster } from 'src/app/model/add-purchase-product-price.model';
import { config } from 'src/config';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-product-purchase-price',
  templateUrl: './add-product-purchase-price.component.html',
  styleUrls: ['./add-product-purchase-price.component.css']
})
export class AddProductPurchasePriceComponent implements OnInit {

  items: MenuItem[];
  public productForm: FormGroup;
  addDetails: any[];
  sup_id: number;
  prd_id: number;
  productName: string;
  prdData: purchaseProductMaster;
  price_id: number;
  flag = 0;
  end_date;
  dateflag = 0;
  minDate: Date;
  today: Date;
  today_con_date;
  maxDate: Date;

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private httpService: ApiService, private toastService: ToastService, private datePipe: DatePipe, private config: DynamicDialogConfig,
    private fb: FormBuilder, private confirmationService: ConfirmationService, private ref: DynamicDialogRef, ) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
  }

  ngOnInit(): void {
    this.today = new Date();
    this.today_con_date = this.datePipe.transform(this.today, config.edit_dateFormat);
    // let month = this.today.getMonth();
    // let prevMonth = (month === 0) ? 11 : month;
    // this.minDate = new Date();
    // this.minDate.setMonth(prevMonth);
    this.prdData = new purchaseProductMaster();
    this.productForm = this.createControl(this.prdData);
    this.productName = this.config.data.sPrdName;
    this.sup_id = this.config.data.iSupID;
    this.prd_id = this.config.data.iPrdID;
    this.product_details();
  }

  product_details() {
    const product_details = {
      "iRequestID": 2413,
      "iSupID": this.sup_id,
      "iPrdID": this.prd_id
    }
    this.httpService.callPostApi(product_details).subscribe(
      data => {
        this.addDetails = data.body;
        if (this.addDetails.length) {
          // let final_date;
          // let index_val;
          // this.addDetails.forEach((key, index) => {
          //   let loop_date = this.addDetails[index].sEndDate;
          //   let new_date = this.datePipe.transform(loop_date, "MM-dd-yyyy");
          //   let start_new_date = this.datePipe.transform(new_date, config.edit_dateFormat);
          //   if (index > 0) {
          //     if (start_new_date > final_date) {
          //       final_date = start_new_date;
          //       index_val = index;
          //     }
          //   }
          //   else {
          //     final_date = start_new_date;
          //     index_val = index;
          //   }
          // });
          let enddate = this.addDetails[this.addDetails.length - 1].sEndDate;
          let start_new_date = this.datePipe.transform(enddate, "MM-dd-yyyy");
          this.minDate = new Date(start_new_date);
          let date = this.minDate.getDate();
          let mnth = this.minDate.getMonth();
          let year = this.minDate.getFullYear();
          this.minDate.setDate(date + 1);
          this.minDate.setMonth((date == 31) ? mnth + 1 : mnth);
          this.minDate.setFullYear((mnth == 11 && date == 31 ? year + 1 : year));
        }
        // if (this.addDetails.length) {
        //   let enddate = this.addDetails[this.addDetails.length - 1].sEndDate;
        //   console.log(enddate, "end")
        //   let start_new_date = this.datePipe.transform(enddate, config.edit_dateFormat);
        //   console.log(start_new_date, "new")
        //   //this.minDate = start_new_date.
        //   //this.minDate.setMonth(prevMonth);
        // }
      });
  }

  editOne(rowIndex) {
    this.flag = 1;
    this.dateflag = 0;
    this.productForm.controls['sStartDate'].disable();
    this.price_id = this.addDetails[rowIndex].iPPriceID;
    let purchase = this.addDetails[rowIndex].iPurchaseAmt;
    let enddate = this.addDetails[rowIndex].sEndDate;
    let new_date = this.datePipe.transform(enddate, "MM-dd-yyyy");
    this.minDate = new Date(new_date);
    let date = this.minDate.getDate();
    let mnth = this.minDate.getMonth();
    let year = this.minDate.getFullYear();
    this.minDate.setDate(date + 1);
    this.minDate.setMonth((date == 31) ? mnth + 1 : mnth);
    this.minDate.setFullYear((mnth == 11 && date == 31 ? year + 1 : year));
    let start_date = this.minDate;
    // let start_new_date = this.datePipe.transform(start_date, config.edit_dateFormat);
    let end_date = this.addDetails[rowIndex].sEndDate;
    let end_new_date = this.datePipe.transform(end_date, config.edit_dateFormat);
    this.productForm.controls['iPurchaseAmt'].setValue(purchase);
    this.productForm.controls['sStartDate'].setValue(start_date);
    this.productForm.controls['sEndDate'].setValue(end_new_date);

  }

  createControl(prdData?: purchaseProductMaster): FormGroup {
    this.productForm = this.fb.group({
      iPurchaseAmt: [prdData.iPurchaseAmt, [Validators.required, Validators.pattern('^[0-9]*$')]],
      sStartDate: [prdData.sStartDate ? moment(prdData.sStartDate).toDate() : null, Validators.required],
      sEndDate: [prdData.sEndDate ? moment(prdData.sEndDate).toDate() : null, Validators.required],
    });
    return this.productForm;
  }

  //delete purchase price data
  deletePprice(addDetails) {
    this.confirmationService.confirm({
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID": 2415,
          "iPPriceID": addDetails.iPPriceID
        }
        console.log(dataToSendDelete, "delete")
        this.httpService.callPostApi(dataToSendDelete).subscribe(
          (data) => {
            this.product_details();
            this.productForm.reset();
            this.flag = 0;
            this.productForm.controls['sStartDate'].enable();
            this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
          },
          (error) => console.log(error)
        );
      },
    });
  }

  addProductPrice() {
    var formData = this.productForm.getRawValue();
    let new_date_start = formData.sStartDate;
    let start_date = this.datePipe.transform(new_date_start, config.dateFormat);
    let new_date_end = formData.sEndDate;
    let end_date = this.datePipe.transform(new_date_end, config.dateFormat);
    const product_price_data = {
      "iRequestID": 2411,
      "iPrdID": this.prd_id,
      "iSupID": this.sup_id,
      "iPurchaseAmt": +formData.iPurchaseAmt,
      "sStartDate": start_date,
      "sEndDate": end_date,
      "iIsDefault": 1
    }
    console.log(product_price_data)
    this.httpService.callPostApi(product_price_data).subscribe(
      data => {
        if (data.headers.get('StatusCode') == 200) {
          this.product_details();
          this.productForm.reset();
        }
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
        //this.submitFlag = 0;
      });
  }

  dateChange() {
    this.dateflag = 1;
    console.log(this.dateflag, "1")
  }

  editProductPrice() {
    var formData = this.productForm.getRawValue();
    let new_date_start = formData.sStartDate;
    let start_date = this.datePipe.transform(new_date_start, "yyyy-MM-dd");
    let new_date_end = formData.sEndDate;
    if (this.dateflag == 0) {
      this.end_date = new_date_end.split("-").reverse().join("-");
    } else {
      this.end_date = this.datePipe.transform(new_date_end, config.dateFormat);
    }

    const product_price_data = {
      "iRequestID": 2414,
      "iPrdID": this.prd_id,
      "iSupID": this.sup_id,
      "iPurchaseAmt": +formData.iPurchaseAmt,
      "sStartDate": start_date,
      "sEndDate": this.end_date,
      "iPPriceID": this.price_id
    }
    console.log(product_price_data)
    this.httpService.callPostApi(product_price_data).subscribe(
      data => {
        if (data.headers.get('StatusCode') == 200) {
          this.product_details();
          this.productForm.reset();
          this.flag = 0;
          this.dateflag = 0;
          this.productForm.controls['sStartDate'].enable();
        }
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      });
  }

  //code for close dialog box
  closeDialog() {
    this.ref.close(true);
  }
}

