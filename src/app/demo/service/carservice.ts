import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Car} from '../domain/car';

@Injectable()
export class CarService {

    constructor(private http: HttpClient) {}
    getCarsMedium() {
        return this.http.get<any>('assets/demo/data/cars-medium.json')
                    .toPromise()
                    .then(res => res.data as Car[])
                    .then(data => data);
    }
}
