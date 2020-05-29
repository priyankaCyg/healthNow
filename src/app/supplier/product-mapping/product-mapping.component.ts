import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { SelectItem, MenuItem } from 'primeng/api';
import { from } from 'rxjs';
import { Message } from 'primeng/api';
import { SupplierRoutingModule } from '../supplier-routing.module';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { suppmapData } from 'src/app/model/sup-producer-map.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-mapping',
  templateUrl: './product-mapping.component.html',
  styleUrls: ['./product-mapping.component.css']
})
export class ProductMappingComponent implements OnInit {
  items: MenuItem[];
  producerValue: any[];
  producer: suppmapData[];
  selectedproducer: any;
  Selectedvalue: any[] = [];
  constructor(private breadcrumbService: BreadcrumbService,
    private apiService: ApiService, private route: ActivatedRoute,
    private toastService: ToastService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Supplier', routerLink: ['/supplier'] }
    ]);
  }

  ngOnInit(): void {
    this.producerDropdown();
  }

  //code forproducer dropdown data
  producerDropdown() {
    const producer_dropdown_data = {
      "iRequestID": 2126,
    }
    this.apiService.callPostApi(producer_dropdown_data).subscribe(
      (data) => {
        this.producerValue = data.body;
        this.producerValue.unshift({ "iProducerID": 0, "sProducerName": "Select" });
      },
      (error) => console.log(error)
    );
    this.producer = null;
    this.Selectedvalue = [];
  }

  //code for show all list of product
  getProduct() {
    this.Selectedvalue = [];
    let producer_id = +this.selectedproducer.iProducerID;
    let sup_id = +this.route.snapshot.params['iSupID'];
    const product_list_data = {
      "iRequestID": 2231,
      "iSupID": sup_id,
      "iProducerID": producer_id
    }
    this.apiService.callPostApi(product_list_data).subscribe(
      (data) => {
        this.producer = data.body;
        for (var i = 0; i < this.producer.length; i++) {
          if (this.producer[i].iSelected == 1) {
            this.Selectedvalue.push(this.producer[i]);
          }
        }
      },
      (error) => console.log(error)
    );
  }

  //code for save new product
  saveProduct() {
    const prd_id = this.Selectedvalue.map(({ iPrdID }) => iPrdID);
    let prd_id_str = prd_id.toString();
    let producer_id = +this.selectedproducer.iProducerID;
    let sup_id = +this.route.snapshot.params['iSupID'];
    const save_product_data = {
      "iRequestID": 2232,
      "iSupID": sup_id,
      "iProducerID": producer_id,
      "sSupPrdMap": prd_id_str
    }
    this.apiService.callPostApi(save_product_data).subscribe(
      (data) => {
        this.getProduct();
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
      },
      (error) => console.log(error)
    );
  }

}
