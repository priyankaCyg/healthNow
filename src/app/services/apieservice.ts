import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class APIService {

    constructor(private http: HttpClient) {}

    getDetails(dataToSend) {
        
        return this.http.post<any>('http://13.126.132.149:8080/healthnow/DataAPI', dataToSend)
                    .toPromise()
                    .then(res =>{ 
                        
                        // alert(JSON.stringify(res))
                        res as any[]
                        return res;
                    });
    }

    getApiDetails(dataToSend): Promise<any> {

                return new Promise((resolve, reject) => {
                    this.http.post('http://13.126.132.149:8080/healthnow/DataAPI',dataToSend, {observe: 'response'})
                        .subscribe((resp: any) => {
                            alert(JSON.stringify(resp))
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
