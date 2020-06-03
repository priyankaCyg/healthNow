import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-requisition',
  templateUrl: './create-requisition.component.html',
  styleUrls: ['./create-requisition.component.css']
})
export class CreateRequisitionComponent implements OnInit {
  products: any[];
  productCategValue;
  selectedCategory1: any;
  selectedPartner1: any;
  pc_id;
  productCateName;
  productName;
  prodshortName;
  partner;
  location;
  prd_id;

  constructor(private apiService: ApiService, private fb: FormBuilder, private ref: DynamicDialogRef,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.productCategDropdown();
    this.partnerDropdown();
  }

  productCategDropdown() {
    const productCateg_dropdown_data = {
      "iRequestID": 2116,
    }
    this.apiService.getDropDownData(productCateg_dropdown_data).then(
      (data) => {
        this.productCategValue = data;
        this.productCategValue.unshift({ "iPCID": 0, "sPCName": "Select" });
        if (this.selectedCategory1 != undefined) {
          this.productList();
        }
      },
      (error) => console.log(error)
    );
    // this.producer = null;
    //this.Selectedvalue = [];
  }

  partnerDropdown() {
    const partner_dropdown_data = {
      "iRequestID": 2289,
    }
    this.apiService.getDropDownData(partner_dropdown_data).then(
      (data) => {
        this.partner = data;
        this.partner.unshift({ "iPartnerID": 0, "sPartnerName": "Select" });
        if (this.selectedPartner1 != undefined) {
          this.partnerlocationDropdown();
        }
      },
      (error) => console.log(error)
    );
    // this.producer = null;
    //this.Selectedvalue = [];
  }

  partnerlocationDropdown() {
    const productCateg_dropdown_data = {
      "iRequestID": 22810,
      "iPartnerID": this.selectedPartner1.iPartnerID
    }
    this.apiService.getDropDownData(productCateg_dropdown_data).then(
      (data) => {
        this.location = data;
        this.location.unshift({ "iLocationID": 0, "sLocName": "Select" });
      },
      (error) => console.log(error)
    );
    // this.producer = null;
    //this.Selectedvalue = [];
  }

  productList() {
    const product_list_data = {
      "iRequestID": 2244,
      "iPCID": this.selectedCategory1.iPCID
    }
    this.apiService.callPostApi(product_list_data).subscribe(
      (data) => {
        this.products = data.body;
      },
      (error) => console.log(error)
    );
  }

  fetchProductData(products) {
    this.productCateName = products.sPCName;
    this.productName = products.sPrdName;
    this.prodshortName = products.sShortName;
    this.prd_id = products.iPrdID;
    this.pc_id = products.iPCID;
  }

  createReqForm = this.fb.group({
    partner: ["", Validators.required],
    location: ["", Validators.required],
    quantity: ["", Validators.required]
  });

  addnewRequisition() {
    var form = this.createReqForm.getRawValue();

    const requisition_data = {
      "iRequestID": 2331,
      "iPCID": this.pc_id,
      "iPartnerID": form.partner.iPartnerID,
      "iPartLocID": form.location.iLocationID,
      "iPrdID": this.prd_id,
      "iQty": +form.quantity
    }
    console.log(requisition_data);
    this.apiService.callPostApi(requisition_data).subscribe(
      (data) => {
        this.ref.close(true);
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
      },
      (error) => console.log(error)
    );
    this.createReqForm.reset();
  }

  closeDialog() {
    this.ref.close();
  }
}
