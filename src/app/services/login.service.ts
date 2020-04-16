import {Injectable, OnInit} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';




@Injectable()
export class LoginService {

    loginData: any= {};
    userData: any= {};

    token: string=null;
    onMenuChange: BehaviorSubject<any>;

    menuData:any=[];

    constructor(private _httpClient: HttpClient)
    {
      this.onMenuChange = new BehaviorSubject(null);
        
    }

  public _test:any;


  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.loginData=undefined;
        this.setToken(undefined);
       
        resolve('DONE');
    });
  }

  authenticate(data): any {
    // alert(window.location.host);
    // config.url = window.location.host;
    var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL

      var username = data.username;
      var password = data.password;
      
    return data;
  }



  getloginDetails():any {
 
    return this.loginData;
  }

  setloginDetails(loginDet: string) {

    this.loginData=loginDet;
}


getMenuDetails():any {
 
  return this.menuData;
}

setMenuDetails(menuDet) {

  this.menuData=menuDet;
}

getUserData():any {
 
  return this.userData;
}

setUserData(userData) {

  this.userData=userData;
}

  setToken(token: string) {

      this.token=token;
  }
  getToken() {
    return this.token;
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
}