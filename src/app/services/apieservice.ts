import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class APIService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Accept': 'text/html',
            'Content-Type': 'application/json'
        }),
        responseType: 'text'
    };

    constructor(private http: HttpClient) {}

    getDetails(dataToSend) {
        
        return this.http.post<any>('http://13.126.132.149/healthnow/DataAPI', dataToSend)
                    .toPromise()
                    .then(res =>{ 
                        
                        // alert(JSON.stringify(res))
                        res as any[]
                        return res;
                    });
                    
    }

    apiCall(dataToSend)
    {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'text/html');
        return this.http.post('http://13.126.132.149/healthnow/DataAPI',dataToSend)
        .subscribe(data => {
            console.log("IN API CALL",data);
        });
    }

    getApiDetails(dataToSend): Promise<any> {


        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'text/html');


                return new Promise((resolve, reject) => {
                    this.http.post('http://13.126.132.149/healthnow/DataAPI',dataToSend,{ observe: 'response',headers:headers,responseType: 'text'})
                        .subscribe((resp: any) => {
                            // alert(JSON.stringify(resp.status))
                            // alert(JSON.stringify(resp))
                            resolve(resp);
        
                        }, reject);
                });
            }

    getFilesystem() {
        return this.http.get<any>('assets/demo/data/filesystem.json')
                    .toPromise()
                    .then(res => res.data as any[])
                    .then(data => data);
    }
}
