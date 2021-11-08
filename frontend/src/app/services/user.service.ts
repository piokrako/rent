import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

let API_URL = environment.baseUrl + "/api";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  selectedCars = new Subject();

  constructor(private http: HttpClient) { }

  getCars(from: String, until: String) {
    return this.http.post(API_URL + '/admin/cars', { from, until });
  }

  rentCar(id: any, from: any, until: any, fromDate: any, untilDate: any) {
    return this.http.post(API_URL + '/admin/rent', { id: id, from: from, until: until, fromDate: fromDate, untilDate: untilDate });
  }

}
