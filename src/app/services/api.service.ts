import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _baseUrl="http://13.126.132.149:8080/healthnow/DataAPI";
  headers = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) { }
  
  callPostApi(requestBody:Object):Observable<any>{
    return this.http.post(this._baseUrl,requestBody,{ headers: this.headers})
  }

  getDropDownData(requestData:Object): Promise<any> {
  return new Promise((resolve, reject) => {
  this.http.post(this._baseUrl,requestData).subscribe((response: any) => {
  resolve(response);
  }, reject);
  });
}
  
}