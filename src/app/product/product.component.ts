import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  items: MenuItem[];

  product: any[];


  constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Product', routerLink: ['/app/product'] }
    ]);
}

  ngOnInit(): void {
    
    
    this.product = [
      { srNo: '1', prCategory: 'Diet & Nutrition', prCode: 'HHY_WHT', prName: 'Gluten Free Wheat', unit: 'kg', foodCulture: 'Veg', producer:'Nestle' },      
      { srNo: '2', prCategory: 'Supplementsess', prCode: 'HHY_MGC', prName: 'Magnesuim', unit: 'mg', foodCulture: 'Vegan', producer:'HealthyHey' },
      { srNo: '3', prCategory: 'Health & Personal Care', prCode: 'NOR_OM3D3', prName: 'Omega 3 Oil with D3', unit: 'mg', foodCulture: 'Non-Veg', producer:'Abbott'},
      { srNo: '4', prCategory: 'Immunity', prCode: 'HRLK', prName: 'Horlicks', unit: 'kg', foodCulture: 'Veg', producer:'Nestle' },
      { srNo: '5', prCategory: 'Oil', prCode: 'SFFL', prName: 'Saffola', unit: 'Liter', foodCulture: 'Veg', producer:'Saffola' },
      { srNo: '6', prCategory: 'Health & Personal Care', prCode: 'NOR_OM3D3', prName: 'Omega 3 Oil with D3', unit: 'No', foodCulture: 'Vegan', producer:'Abbott'},
      { srNo: '7', prCategory: 'Supplementsess', prCode: 'HHY_MGC', prName: 'Magnesuim', unit: 'mg', foodCulture: 'Veg', producer:'HealthyHey' },
      { srNo: '8', prCategory: 'Diet & Nutrition', prCode: 'HHY_WHT', prName: 'Gluten Free Wheat', unit: 'Gm', foodCulture: 'Veg', producer:'Nestle' },      
      { srNo: '10', prCategory: 'Oil', prCode: 'SFFL', prName: 'Saffola', unit: 'Liter', foodCulture: 'Veg', producer:'Saffola' },
    ];

    
}




}
