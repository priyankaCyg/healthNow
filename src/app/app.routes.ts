import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppLoginComponent } from './pages/app.login.component';
// import { CompanyComponent } from './company/company.component';

import { AuthGuard } from './services/authguard';

export const routes: Routes = [
    { path: 'app', component: AppMainComponent,
        children: [
            { path: '', component: DashboardDemoComponent },
            { path: 'components/forms', component: FormsDemoComponent },
            { path: 'components/panels', component: PanelsDemoComponent },
            { path: 'components/menus', component: MenusDemoComponent },
            { path: 'components/messages', component: MessagesDemoComponent },
            { path: 'components/misc', component: MiscDemoComponent },
            { path: 'pages/empty', component: EmptyDemoComponent },
            { path: 'components/charts', component: ChartsDemoComponent },
            { path: 'components/file', component: FileDemoComponent },
            { path: 'documentation', component: DocumentationComponent },
            // { path: 'company', component: CompanyComponent},
            { path: 'company', loadChildren:"./company/company.module#CompanyModule"},
            {
                path: "landingPage",
                loadChildren: "./landing-page/landing-page.module#LandingPageModule",
                canActivate: [AuthGuard]
              },

              { path: 'product-category', loadChildren:"./product-category/product-category.module#ProductCategoryModule"},
              { path: 'producer', loadChildren:"./producer/producer.module#ProducerModule"},
              { path: 'brand', loadChildren:"./brand/brand.module#BrandModule" },
              { path: 'unit', loadChildren:"./unit/unit.module#UnitModule" },
              { path: 'product', loadChildren:"./product/product.module#ProductModule" },
              { path: 'supplier-category', loadChildren:"./supplier-category/supplier-category.module#SupplierCategoryModule"},
              { path: 'supplier', loadChildren:"./supplier/supplier.module#SupplierModule" },
              { path: 'partner', loadChildren:"./partner/partner.module#PartnerModule" },
              { path: 'purchase-order', loadChildren:"./purchase-order/purchase-order.module#PurchaseOrderModule" }
              
        ]
    },
    {path: 'error', component: AppErrorComponent},
    {path: 'accessdenied', component: AppAccessdeniedComponent},
    {path: 'notfound', component: AppNotfoundComponent},
    {path: '', component: AppLoginComponent},
    {path: '**', redirectTo: '/notfound'},

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
