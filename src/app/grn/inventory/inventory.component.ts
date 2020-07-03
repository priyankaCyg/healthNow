import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  warehouseData;
  selectedWarehouseData;
  partnerData;
  selectedPartnerData;
  wh_id: number;
  disbalePartner: boolean = true;

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
        "iRequestID": 20111
      }
      this.httpService.callPostApi(parent_cat_api).subscribe(
        data => {
          this.warehouseData = data.body;
          this.warehouseData.unshift({ "iAddID": 0, "sShortName": "Select Warehouse" });
          this.selectedWarehouseData = { "iAddID": 0, "sShortName": "Select Warehouse" };
          resolve(this.warehouseData);
        },
        error => {
          console.log(error);
        });
    });
  }

  setWarehouseId(event) {
    this.wh_id = event.value.iAddID;
    console.log(this.wh_id)
    if (this.wh_id != 0) {
      this.disbalePartner = false;
    }
    else {
      this.disbalePartner = true;
    }
    this.partnerDropdown();
  }


  // code for partner dropdown data
  partnerDropdown() {
    return new Promise((resolve, reject) => {
      const partner_dropdown_data = {
        "iRequestID": 2392,
        "iAddID": this.wh_id
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
