import { Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../config';
import { Router } from '@angular/router';

const authUrl: string = config.authUrl
const authAccess: string = config.authAccess
const authStoreUrl: string = config.authStoreUrl



@Injectable()
export class LoginService {

  token: string = null;

  constructor(private _httpClient: HttpClient, private router: Router) {

  }

  public _test: any;


  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.setToken(undefined);
      this.router.navigate([('/login')])
      resolve('DONE');
    });
  }

  authenticate(dataToSend): any {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'text/html');


    return new Promise((resolve, reject) => {
      this._httpClient.post(authUrl, dataToSend, { observe: 'response' })
        .subscribe((resp: any) => {
          //working code
          console.log('response message', resp.headers.get('StatusCode'));

          resolve(resp);
        }, reject);
    });
  }


  getAccess(navigate_url: any): any {
    var dataToSend = {}
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      this._httpClient.post(authAccess, dataToSend, { observe: 'response' })
        .subscribe((resp: any) => {
          if (resp.body != null || resp.body != '') {
            this.setToken(resp.body)

            return new Promise((resolve, reject) => {
              this._httpClient.post(authStoreUrl, resp.body, { observe: 'response' })
                .subscribe((resp1: any) => {
                  sessionStorage.setItem('isSessionValid', 'true');
                  this.router.navigate([navigate_url]);
                  resolve(resp1);
                }, (error: any) => {
                  sessionStorage.setItem('isSessionValid', 'false');
                  this.router.navigate(['/login']);
                  reject(error)
                }
                );
            });
          }
        }, (error: any) => {
          sessionStorage.setItem('isSessionValid', 'false');
          this.router.navigate(['/login']);
          this.setToken(null)
          reject(error)
        }
        );
    });
  }

  // checkBrowserClosed() {
  //   var isBrowserClosed = localStorage.getItem('isBrowserClosed');
  //   // var isLoggedIn = localStorage.getItem('isSessionValid');
  //   if (isBrowserClosed == "true" || isBrowserClosed == null) {
  //     this.getAccess().then(response1 => {
  //       console.log("Response of Access ", response1)
  //     }).catch(error => { })
  //   }

  // }


  setToken(token: string) {

    this.token = token;
  }
  getToken() {
    return this.token;
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
}