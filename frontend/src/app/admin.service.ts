import { ObjectId } from 'mongodb';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';

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

    return this.http.post('http://localhost:3000/api/admin/create-car', carData);
  }

  getUsers() {
    return this.http.get('http://localhost:3000/api/admin/users');
  }

  deleteUser(email: string) {
    return this.http.post('http://localhost:3000/api/admin/delete-user', { email: email });
  }

  makeAdmin(email: string) {
    return this.http.post('http://localhost:3000/api/admin/admin-user', { email: email });
  }

  rentedCars() {
    return this.http.get('http://localhost:3000/api/admin/rented-cars');
  }

  cancelReservation(id: ObjectId, from: Date, until: Date) {
    return this.http.post('http://localhost:3000/api/admin/cancel-reservation', { id: id, from: from, until: until });
  }
}
