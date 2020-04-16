import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders
} from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { stringify } from '../../config';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: LoginService, private router: Router) { }



    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.auth.getToken();


        // Clone the request and set the new header in one step.login/verifyQuestionFPWD
        if (req.url.endsWith('/login') || req.url.endsWith('/getQuestionFPWD') || req.url.endsWith('/verifyQuestionFPWD') || req.url.endsWith('/changeForgotPWD')) {
            return next.handle(req);
        } else {

            let newHeader = new HttpHeaders({
                // Working Code By Priyanka
                // 'Authorization': authToken
            });


            const authReq = req.clone({ headers: newHeader });
            // send cloned request with header to the next handler.

            return next.handle(authReq)
                .pipe(
                    tap(event => {
                        if (event instanceof HttpResponse) {
                            if (event.body) {
                                if (event.body.code) {
                                    if (event.body["code"] === 401) {
                                        this.router.navigateByUrl('/');
                                        // this.openSnackBar("Your session has been timed out. Please login again.");
                                    }
                                    if (event.body["code"] === 402) {
                                        this.router.navigateByUrl('/');
                                        // this.openSnackBar("Your session has been invalidated by admin. Please contact bank.");
                                    }
                                }

                            }

                            let responseHeaders = event.headers;

                            if (responseHeaders && responseHeaders.has('Authorization')) {

                                let token = responseHeaders.get('Authorization');
                                this.auth.setToken(token);

                            }

                        }
                    }, error => {
                        // this.openSnackBar(error.message);

                        this.router.navigateByUrl('/');


                    })
                );
        }

    }



}