

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,CanActivateChild } from '@angular/router';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate,CanActivateChild {
    
    constructor( private myRoute: Router, 
        private httpClient: HttpClient,
        private _loginService: LoginService
    ){
    } 

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        if(this._loginService.isLoggednIn()){
            return true;
        }else{
            this.myRoute.navigate(["login"]);
            return false;
        }
    }

   
    canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return true;
      

        // if(this._loginService.isLoggednIn()){
        //     return true;
        // }else{
        //     this.myRoute.navigate(["login"], { queryParams: { returnUrl: state.url } });
        //     return false;
        // }
    }



}
