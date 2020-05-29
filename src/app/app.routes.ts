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
import { AuthGuard } from './services/authguard';

export const routes: Routes = [
    {
        path: '', component: AppMainComponent, canActivate: [AuthGuard],
        children: [
            {
                path: '', component: DashboardDemoComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'components/forms', component: FormsDemoComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'components/panels', component: PanelsDemoComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'components/menus', component: MenusDemoComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'components/messages', component: MessagesDemoComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'components/misc', component: MiscDemoComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'pages/empty', component: EmptyDemoComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'components/charts', component: ChartsDemoComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'components/file', component: FileDemoComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'documentation', component: DocumentationComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'company', loadChildren: "./company/company.module#CompanyModule",
                canActivate: [AuthGuard]
            },
            {
                path: 'product-category', loadChildren: "./product-category/product-category.module#ProductCategoryModule",
                canActivate: [AuthGuard]
            },
            {
                path: 'producer', loadChildren: "./producer/producer.module#ProducerModule",
                canActivate: [AuthGuard]
            },
            {
                path: 'brand', loadChildren: "./brand/brand.module#BrandModule",
                canActivate: [AuthGuard]
            },
            {
                path: 'unit', loadChildren: "./unit/unit.module#UnitModule",
                canActivate: [AuthGuard]
            },
            {
                path: 'product', loadChildren: "./product/product.module#ProductModule",
                canActivate: [AuthGuard]
            },
            {
                path: 'supplier-category', loadChildren: "./supplier-category/supplier-category.module#SupplierCategoryModule",
                canActivate: [AuthGuard]
            },
            {
                path: 'supplier', loadChildren: "./supplier/supplier.module#SupplierModule",
                canActivate: [AuthGuard]
            },
            {
                path: 'partner', loadChildren: "./partner/partner.module#PartnerModule",
                canActivate: [AuthGuard]
            }
        ]
    },
    { path: 'error', component: AppErrorComponent },
    { path: 'accessdenied', component: AppAccessdeniedComponent },
    { path: 'login', component: AppLoginComponent },
    { path: 'notfound', component: AppNotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
