import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PurchaseOrderRoutingModule } from '../purchase-order-routing.module';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-map-supplier',
  templateUrl: './map-supplier.component.html',
  styleUrls: ['./map-supplier.component.css']
})
export class MapSupplierComponent implements OnInit {

  items: MenuItem[];
  requisitionData: any[];
  data;
  supplierData: any[];
  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService, private httpService: ApiService, private commonService: CommonService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Purchase Order', routerLink: ['/purchase-order'] }
    ]);
  }

  ngOnInit(): void {

    this.commonService.captureData$.subscribe(data => this.data = data);
    console.log(this.data)
    this.requisitionData = Object.values(this.data)
    console.log(this.requisitionData);
    this.getSupplierList();
    // this.requisition = [
    //   { reqNo:'RE/SS/20200514/5', prdCategory:'Food',product:'Gluten Free Wheat 5kg Pack',partner:'Shibin KP',location:'Mumbai', qty:'100',unit:'kg',	createdBy:'System',	createdDate:'1-05-2020' }
    // ];

    // this.addRequValue = [
    //   { supplier:'SKK Supplier',rate:'250',default:'Yes',discount:'5%',discAmt:'15', purcPrice:'235' },
    //   { supplier:'KKB Supplier',rate:'275',default:'No',discount:'0%',discAmt:'0', purcPrice:'275' }
    // ];

  }
  
  //Function to get Supplier list
  getSupplierList() {
    const supplierAPI = {
      "iRequestID": 2336,
      "iPReqID": 1
    }
    this.httpService.callPostApi(supplierAPI).subscribe(
      data => {
        this.supplierData = data.body;
      },
      error => { console.log(error) }
    )
  }
   checkBoxValue(data){
     console.log(data,"1")
   }
}

