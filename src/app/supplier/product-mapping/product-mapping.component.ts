import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { SelectItem, MenuItem } from 'primeng/api';
import { from } from 'rxjs';
import { Message } from 'primeng/api';
import { SupplierRoutingModule } from '../supplier-routing.module';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { suppmapData } from 'src/app/model/sup-producer-map.model';

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
    private apiService: ApiService, private route: ActivatedRoute) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Supplier', routerLink: ['/app/supplier'] }
    ]);
  }

  ngOnInit(): void {
    alert(this.Selectedvalue)
    this.producerDropdown();

  }

  producerDropdown() {
    const producer_dropdown_data = {
      "iRequestID": 2126,
    }
    this.apiService.callPostApi(producer_dropdown_data).subscribe(
      (data) => {
        this.producerValue = data;
        this.producerValue.unshift({ "iProducerID": 0, "sProducerName": "Select" });

      },
      (error) => console.log(error)
    );
  }

  getProduct() {
    let producer_id = +this.selectedproducer.iProducerID;
    let sup_id = +this.route.snapshot.params['iSupID'];

    const product_list_data = {
      "iRequestID": 2231,
      "iSupID": sup_id,
      "iProducerID": producer_id
    }
    this.apiService.callPostApi(product_list_data).subscribe(
      (data) => {
        console.log("data ",data)
        this.producer = data;

        for(var i=0;i<this.producer.length;i++)
        {
          if(this.producer[i].iSelected==1)
          {
            this.Selectedvalue.push(this.producer[i]);

          }
        }


      },
      (error) => console.log(error)
    );
  }

  // check() {
  //   let id = this.producer.map(({ iSelected }) => iSelected);
  //   console.log(id);
  //   if (id[0] == 1) {
  //     this.checkid = true
  //   } else {
  //     this.checkid = false
  //   }
  // }
  saveProduct() {
    console.log("Selectedvalue ",this.Selectedvalue);
    //let prd_id = this.Selectedvalue;
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
    console.log(save_product_data)
    // this.apiService.callPostApi(save_product_data).subscribe(
    //   (data) => {
    //     this.producer = data;

    //   },
    //   (error) => console.log(error)
    // );
  }

}
