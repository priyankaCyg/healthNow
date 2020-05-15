import { Component, OnInit } from '@angular/core';
import {LoginService} from '../app/services/login.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent  implements OnInit {

    constructor(private loginService:LoginService) { }
    ngOnInit(): void {
        // this.changeOfRoutes()

        window.onbeforeunload = function (e) {
            localStorage.setItem('isBrowserClosed', 'true');
        }
    }

    changeOfRoutes()
    {
        // alert("hi")
        this.loginService.getAccess().then(response1 => {

            console.log("Response of Access ",response1)
        
        
          }).catch(error=>{
            // alert(JSON.stringify(error))
          })
    }
}
