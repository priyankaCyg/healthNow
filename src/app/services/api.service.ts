import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private _baseUrl = "http://13.126.132.149/healthnow/DataAPI";
  public headerMessage;
  public headerCode;

  headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  callPostApi(requestBody: Object): Observable<any> {
    //   return this.http.post(this._baseUrl, requestBody, { headers: this.headers });
    return this.http.post<any>(this._baseUrl, requestBody, { observe: 'response' }).pipe(
      tap(resp => console.log('response message', resp.headers.get('StatusMessage'))
      )
    );
  }
  // callPostApi(requestBody: Object): Observable<any> {
  //   return this.http.post(this._baseUrl, requestBody, {headers: this.headers});
  // }
  //   callPostApi(requestBody: Object) : Observable<any>{

  //     return this.http.post<any>(this._baseUrl,requestBody, {observe: 'response'}).pipe(
  //          tap(resp => 
  //           console.log('response message', resp.headers.get('StatusMessage'),
  //           this.headerCode = resp.headers.get('StatusCode'),
  //           this.headerMessage = resp.headers.get('StatusMessage'),
  //          )
  //          )
  //     );
  // }

  getDropDownData(requestData): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this._baseUrl, requestData).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }
}
