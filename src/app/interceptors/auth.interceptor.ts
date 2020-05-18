import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders
} from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: LoginService, private router: Router) { }



    intercept(req: HttpRequest<any>, next: HttpHandler) {

            let newHeader = new HttpHeaders({
                // Working Code By Priyanka
                // 'Authorization': authToken
            });


            const authReq = req.clone({ headers: newHeader ,withCredentials: true});
            // send cloned request with header to the next handler.

            return next.handle(authReq)
                .pipe(
                    tap(event => {
                        
                    }, error => {
                        this.router.navigateByUrl('/');
                    })
                );
        }


}