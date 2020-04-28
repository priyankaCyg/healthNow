import {Component, Inject, forwardRef} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
			<div class="logo-text">
				<img src="assets/layout/images/logo-footer.png" alt="mirage-layout" />
				<div class="text">
					<span>© 2019 </span>
				</div>
			</div>
			
        </div>
    `
})
export class AppFooterComponent {

}
