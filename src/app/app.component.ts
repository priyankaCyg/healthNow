import { Component, OnInit } from '@angular/core';
import {LoginService} from '../app/services/login.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent  implements OnInit {

    constructor(private loginService:LoginService) { }
    ngOnInit(): void {
        window.onbeforeunload = function (e) {
            localStorage.setItem('isBrowserClosed', 'true');
        }
    }

}
