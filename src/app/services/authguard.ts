import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { LoginService } from '../services/login.service';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private myRoute: Router, private _loginService: LoginService) {
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this._loginService.isLoggednIn()) {
            return true;
        } else {
            this.myRoute.navigate(["login"]);
            return false;
        }
    }

    canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        var isSessionValid = sessionStorage.getItem('isSessionValid');
        if (isSessionValid == 'true') {
            return true;
        } else {
            //this.myRoute.navigate(["/"], { queryParams: { returnUrl: state.url } });
            this._loginService.getAccess(state.url);
            return false;
        }
    }
}
