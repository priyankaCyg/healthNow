import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { SelectItem, MenuItem } from 'primeng/api';
import { from } from 'rxjs';
import { Message } from 'primeng/api';
import { SupplierRoutingModule } from '../supplier-routing.module';

@Component({
  selector: 'app-product-mapping',
  templateUrl: './product-mapping.component.html',
  styleUrls: ['./product-mapping.component.css']
})
export class ProductMappingComponent implements OnInit {
  items: MenuItem[];

  producer: any[];

 constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Supplier', routerLink: ['/app/supplier'] }
    ]);
}

  ngOnInit(): void {

    this.producer = [
      { prCategory: 'Food Type - Vitamin & Supplements', product:'Product 1'},
      { prCategory: 'Health Condition - Weigth Loss', product:'Product 2'},
      { prCategory: 'Health Condition - Immunity', product:'Product 3'},
      { prCategory: 'Health Condition - Diabetes', product:'Product 4'},
      { prCategory: 'Health Condition - Stress', product:'Product 5'},
      { prCategory: 'Health Condition - Thyroid', product:'Product 6'}
    ];

  }

}
