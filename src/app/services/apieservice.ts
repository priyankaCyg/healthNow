import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { config } from '../../config';

const baseUrl:string=config.url
const fileUrl:string=config.fileUrl

@Injectable()
export class APIService {

    errorMessage

    private httpOptions = {
        headers: new HttpHeaders({
            'Accept': 'text/html',
            'Content-Type': 'application/json'
        }),
        responseType: 'text'
    };

    constructor(private http: HttpClient) {}

    getDetails(dataToSend) {
        
        return this.http.post<any>(baseUrl, dataToSend)
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
        return this.http.post(baseUrl,dataToSend)
        .subscribe(data => {
            console.log("IN API CALL",data);
        });
    }

    getApiDetails(dataToSend): Promise<any> {

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'text/html');


                return new Promise((resolve, reject) => {
                    this.http.post(baseUrl,dataToSend,{ observe: 'response',headers:headers,responseType: 'text'})
                        .subscribe((resp: any) => {
                            //working code
                            console.log('response message', resp.headers.get('StatusMessage'));
                            
                            resolve(resp);
                        }, reject);
                });
            }



    postFile(filesToUpload : any[],dataToSend:any): Observable<any> {
    
        const formData: FormData = new FormData();
    
        // formData.append('json', "JSON.stringify(catalogacion)");
    
        for (let file of filesToUpload) {
            // alert(JSON.stringify(file.name))
          formData.append('uploadFile', file);
        }


        formData.append('iRequestID',dataToSend.iRequestID.toString());
        formData.append('iProcessID',dataToSend.iProcessID.toString());
        formData.append('iProcessTranID',dataToSend.iProcessTranID.toString());
        formData.append('iDocTypeID',dataToSend.iDocTypeID.toString());

    
        console.log(formData);
    
        let headers = new HttpHeaders();
    
        return this.http.post(fileUrl, formData, { headers: headers });
      }


      public downloadAPI(dataToSend: any) {

        console.log("IN DOWNLOAD Image")

        const formData: FormData = new FormData();


        formData.append('iRequestID','1112');
        formData.append('sActualFileName',dataToSend.sActualFileName);
        formData.append('sSystemFileName',dataToSend.sSystemFileName);

        this.http.post(fileUrl,formData,{responseType: 'arraybuffer'})
        .subscribe(response => this.downLoadFile(response, "image/png"));
    }


    downLoadFile(data: any, type: string) {
        let blob = new Blob([data], { type: type});
        let url = window.URL.createObjectURL(blob);
        var link = document.createElement("a");
    link.download = name;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
        // let pwa = window.open(url);
        // if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        //     alert( 'Please disable your Pop-up blocker and try again.');
        // }
    }

}
