import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _baseUrl = "http://13.126.132.149:8080/healthnow/DataAPI";

  constructor(private http: HttpClient) { }

  callPostApi(requestBody: Object): Observable<any> {
    return this.http.post(this._baseUrl, requestBody)
  }
}
