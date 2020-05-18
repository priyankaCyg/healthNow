import {Injectable, OnInit} from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { config } from '../../config';
import { Router } from '@angular/router';

const authUrl:string=config.authUrl
const authAccess:string=config.authAccess
const authStoreUrl:string=config.authStoreUrl



@Injectable()
export class LoginService {

    token: string=null;

    constructor(private _httpClient: HttpClient, private router: Router)
    {
        
    }

  public _test:any;


  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.setToken(undefined);
       
        resolve('DONE');
    });
  }

  authenticate(dataToSend): any {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'text/html');


            return new Promise((resolve, reject) => {
                this._httpClient.post(authUrl,dataToSend,{ observe: 'response'})
                    .subscribe((resp: any) => {
                        //working code
                        console.log('response message', resp.headers.get('Set-Cookie'));
                        
                        resolve(resp);
                    }, reject);
            });
  }


  getAccess(): any {
    var dataToSend ={}
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    
    return new Promise((resolve, reject) => {
      this._httpClient.post(authAccess,dataToSend,{ observe: 'response'})
          .subscribe((resp: any) => {

            if(resp.body!=null || resp.body!='')
            {
              // alert("hi")
              this.setToken(resp.body)
    localStorage.setItem('isLogin', 'true');  
    localStorage.setItem('isBrowserClosed', 'false');


              return new Promise((resolve, reject) => {
                this._httpClient.post(authStoreUrl,resp.body,{ observe: 'response'})
                    .subscribe((resp1: any) => {
                        //working code
                        console.log('response message authenticate and access ' , resp1);
                        // alert("hi")
                        resolve(resp1);
                    }, (error:any) => {
                      console.log('oops Error', error)
    localStorage.setItem('isLogin', 'false');  
    this.router.navigate(['/']);

                    reject(error)}
                    );
            });
            }
          }, (error:any) => {
            console.log('oops Error', error)
    localStorage.setItem('isLogin', 'false');  
    this.router.navigate(['/']);

            this.setToken(null)
          reject(error)}
          );
  });
  }


  checkBrowserClosed()
  {
    var isBrowserClosed = localStorage.getItem('isBrowserClosed')
    // alert(isBrowserClosed)
    if(isBrowserClosed=="true" || isBrowserClosed==null)
    {
      this.getAccess().then(response1 => {

        console.log("Response of Access ",response1)
    
    
      }).catch(error=>{
        // console.log(JSON.stringify(error))
      })
    }

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