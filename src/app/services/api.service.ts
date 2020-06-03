import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from 'rxjs/operators';
import { config } from '../../config';

const baseUrl: string = config.url
@Injectable({
  providedIn: "root",
})
export class ApiService {

  headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  private sendData = new BehaviorSubject<any>("null");
  captureData$ =  this.sendData.asObservable();

  callPostApi(requestBody: Object): Observable<any> {
    return this.http.post<any>(baseUrl, requestBody, { observe: 'response' }).pipe(
      tap(resp => console.log('response message', resp.headers.get('StatusMessage'))
      )
    );
  }

  getDropDownData(requestData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(baseUrl, requestData).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }

  getComponentData(data){
    this.sendData.next(data);
  }
}