import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createCar(brand: string, model: string, power: string, seats: Number, imgURL: string) {
    const carData = {
      brand: brand,
      model : model,
      power: power,
      seats: seats,
      imgURL: imgURL
    }
    return this.http.post('http://localhost:300/api/admin/create-car', carData);
  }


}
