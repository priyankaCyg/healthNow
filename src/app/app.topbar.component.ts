import {Component} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="layout-topbar">
			<div class="layout-topbar-wrapper">
                <div class="layout-topbar-left">
					<div class="layout-topbar-logo-wrapper">
						<a href="#" class="layout-topbar-logo">
							<img src="assets/layout/images/logo.png" alt="healthNow" />
						
						</a>
					</div>

					<a href="#" class="sidebar-menu-button" (click)="app.onMenuButtonClick($event)">
						<i class="pi pi-bars"></i>
					</a>

					<a href="#" class="megamenu-mobile-button" (click)="app.onMegaMenuMobileButtonClick($event)">
						<i class="pi pi-align-right megamenu-icon"></i>
					</a>

					<a href="#" class="topbar-menu-mobile-button" (click)="app.onTopbarMobileMenuButtonClick($event)">
						<i class="pi pi-ellipsis-v"></i>
					</a>

					
                </div>
                <div class="layout-topbar-right fadeInDown">
					<ul class="layout-topbar-actions">

						<li #message class="topbar-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === message}">
							<a href="#" (click)="app.onTopbarItemClick($event,message)">
								<i class="topbar-icon pi pi-bell"></i>
							</a>
							<ul class="fadeInDown">
								<li class="layout-submenu-header">
									<h1>Messages</h1>
									<span>Today, you have new 4 messages</span>
								</li>
								<li class="layout-submenu-item">
									<img src="assets/layout/images/topbar/avatar-cayla.png" alt="mirage-layout" width="35" />
									<div class="menu-text">
										<p>Override the digital divide</p>
										<span>Cayla Brister</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-item">
									<img src="assets/layout/images/topbar/avatar-gabie.png" alt="mirage-layout" width="35" />
									<div class="menu-text">
										<p>Nanotechnology immersion</p>
										<span>Gabie Sheber</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-item">
									<img src="assets/layout/images/topbar/avatar-gaspar.png" alt="mirage-layout" width="35" />
									<div class="menu-text">
										<p>User generated content</p>
										<span>Gaspar Antunes</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-item">
									<img src="assets/layout/images/topbar/avatar-tatiana.png" alt="mirage-layout" width="35" />
									<div class="menu-text">
										<p>The holistic world view</p>
										<span>Tatiana Gagelman</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
							</ul>
						</li>

						<li #profile class="topbar-item profile-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === profile}">
							<a href="#" (click)="app.onTopbarItemClick($event,profile)">
                            <span class="profile-image-wrapper">
                                <img src="assets/layout/images/topbar/avatar-eklund.png" alt="mirage-layout" />
                            </span>
								<span class="profile-info-wrapper">
                                <h3>User Name</h3>
                                <span>Designation</span>
                            </span>
							</a>
							<ul class="profile-item-submenu fadeInDown">
								<li class="profile-submenu-header">
									<div class="performance">
										<span>Weekly Performance</span>
										<img src="assets/layout/images/topbar/asset-bars.svg" alt="mirage-layout" />
									</div>
									<div class="profile">
										<img src="assets/layout/images/topbar/avatar-eklund.png" alt="mirage-layout"
														width="40" />
										<h1>Olivia Eklund</h1>
										<span>Designation</span>
									</div>
								</li>
								<li class="layout-submenu-item">
									<i class="pi pi-list icon icon-1"></i>
									<div class="menu-text">
										<p>Tasks</p>
										<span>3 open issues</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-item">
									<i class="pi pi-shopping-cart icon icon-2"></i>
									<div class="menu-text">
										<p>Payments</p>
										<span>24 new</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-item">
									<i class="pi pi-users icon icon-3"></i>
									<div class="menu-text">
										<p>Clients</p>
										<span>+80%</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-footer">
									<button class="signout-button">Sign Out</button>
									<button class="buy-mirage-button">Buy Mirage</button>
								</li>
							</ul>
						</li>
						<li>
							<a href="#" class="layout-rightpanel-button" (click)="app.onRightPanelButtonClick($event)">
								<i class="pi pi-arrow-left"></i>
							</a>
						</li>
                    </ul>

					<ul class="profile-mobile-wrapper">
						<li #mobileProfile class="topbar-item profile-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === mobileProfile}">
							<a href="#" (click)="app.onTopbarItemClick($event,mobileProfile)">
                            <span class="profile-image-wrapper">
                                <img src="assets/layout/images/topbar/avatar-eklund.png" alt="mirage-layout" />
                            </span>
								<span class="profile-info-wrapper">
                                <h3>User Name</h3>
                                <span>Designation</span>
                            </span>
							</a>
							<ul class="fadeInDown">
								<li class="profile-submenu-header">
									<div class="performance">
										<span>Weekly Performance</span>
										<img src="assets/layout/images/topbar/asset-bars.svg" alt="mirage-layout" />
									</div>
									<div class="profile">
										<img src="assets/layout/images/topbar/avatar-eklund.png" alt="mirage-layout" width="45" />
										<h1>User Name</h1>
                                		<span>Designation</span>
									</div>
								</li>
								<li>
									<i class="pi pi-list icon icon-1"></i>
									<div class="menu-text">
										<p>Tasks</p>
										<span>3 open issues</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li>
									<i class="pi pi-shopping-cart icon icon-2"></i>
									<div class="menu-text">
										<p>Payments</p>
										<span>24 new</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li>
									<i class="pi pi-users icon icon-3"></i>
									<div class="menu-text">
										<p>Clients</p>
										<span>+80%</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-footer">
									<button class="signout-button">Sign Out</button>
									<button class="buy-mirage-button">Buy Mirage</button>
								</li>
							</ul>
						</li>
					</ul>
                </div>
            </div>
        </div>
    `
})
export class AppTopBarComponent {

    activeItem: number;

    constructor(public app: AppMainComponent) {}

    mobileMegaMenuItemClick(index) {
        this.app.megaMenuMobileClick = true;
        this.activeItem = this.activeItem === index ? null : index;
    }

}
