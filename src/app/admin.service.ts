import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
      imgUrl: 'http://localhost:3000/uploads/' + imgUrl
    }
    console.log(carData);

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


}
