import { environment } from './../../environments/environment.prod';
import { ObjectId } from 'mongodb';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

let API_URL = environment.baseUrl + "/api";

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private http: HttpClient) { }

  createCar(brand: string, model: string, power: string, seats: Number, imgUrl: string) {
    const carData = {
      brand: brand,
      model: model,
      power: power,
      seats: seats,
      imgUrl: imgUrl
    }
    return this.http.post(API_URL + '/admin/create-car', carData);
  }

  getUsers() {
    return this.http.get(API_URL + '/admin/users');
  }

  deleteUser(email: string) {
    return this.http.post(API_URL + '/admin/delete-user', { email: email });
  }

  makeAdmin(email: string) {
    return this.http.post(API_URL + '/admin/admin-user', { email: email });
  }

  rentedCars() {
    return this.http.get(API_URL + '/admin/rented-cars');
  }

  cancelReservation(id: ObjectId, from: Date, until: Date) {
    return this.http.post(API_URL + '/admin/cancel-reservation', { id: id, from: from, until: until });
  }
}
