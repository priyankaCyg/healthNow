import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders
} from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { stringify } from '../../config';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: LoginService, private router: Router) { }



    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.auth.getToken();


        /*
        * The verbose way:
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
          headers: req.headers.set('Authorization', authToken)
        });
        */
        // Clone the request and set the new header in one step.login/verifyQuestionFPWD
        if (req.url.endsWith('/PHAPI/login') || req.url.endsWith('/PHAPI/login/getQuestionFPWD') || req.url.endsWith('/PHAPI/login/verifyQuestionFPWD') || req.url.endsWith('/PHAPI/login/changeForgotPWD')) {
            return next.handle(req);
        } else {
            let reqBody;
            if (req.body) {
                if (req.body.permission) {
                    delete req.body.permission;
                }
                if (Object.keys(req.body).length > 0) {
                    reqBody = stringify(req.body);
                } else {
                    reqBody = 'null';
                }
            } else {
                reqBody = 'null';
            }

            /**
             * 
             */
            let microTime = new Date().getTime();



            let newHeader = new HttpHeaders({
                'Authorization': authToken
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
                                        this.router.navigateByUrl('/PH/login/');
                                        // this.openSnackBar("Your session has been timed out. Please login again.");
                                    }
                                    if (event.body["code"] === 402) {
                                        this.router.navigateByUrl('/PH/login/');
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

                        this.router.navigateByUrl('/PH/login/');


                    })
                );
        }

    }



}