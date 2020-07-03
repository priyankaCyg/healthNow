import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  warehouseData ;
  selectedWarehouseData;
  partnerData;
  selectedPartnerData;

  constructor(private httpService: ApiService) { 
    
  }

  ngOnInit(): void {
    this.getwarehouseDropdown();
    this.partnerDropdown();
  }


  // warehouse dropdown 
  getwarehouseDropdown() {
    return new Promise((resolve, reject) => {
      var parent_cat_api = {
        "iRequestID": 2116
      }
      this.httpService.callPostApi(parent_cat_api).subscribe(
        data => {
          this.warehouseData = data.body;
          this.warehouseData.unshift({ iPCID: "", sPCName: "Select Product Category" });
          this.selectedWarehouseData = { iPCID: "", sPCName: "Select Product Category" };
          resolve(this.warehouseData);
        },
        error => {
          console.log(error);
        });
    });
  }

   // code for partner dropdown data
   partnerDropdown() {
    return new Promise((resolve, reject) => {
      const partner_dropdown_data = {
        "iRequestID": 2289,
      }
      this.httpService.getDropDownData(partner_dropdown_data).then(
        (data) => {
          this.partnerData = data;
          this.partnerData.splice(0, 0, { "iPartnerID": 0, "sPartnerName": "Select Partner" });
          this.selectedPartnerData = { "iPartnerID": 0, "sPartnerName": "Select Partner" };
          resolve(this.partnerData);
        },
        (error) => console.log(error)
      );
    });
  }

}
