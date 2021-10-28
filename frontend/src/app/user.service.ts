import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

let API_URL = environment.baseUrl + "/api";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  tokenTimer: any;
  isAdmin = new Subject();
  authenticated = new BehaviorSubject(false);
  selectedCars = new Subject();
  path = environment.baseUrl + '/uploads/';

  constructor(private http: HttpClient, private router: Router) { }

  changeAdmin(data: any) {
    this.isAdmin.next(data);
  }

  createUser(email: string, password: string) {
    const authData = {
      email: email,
      password: password
    };
    return this.http.post(API_URL + '/user/signup', authData);
  }

  loginUser(email: string, passowrd: string) {
    const authData = { email: email, password: passowrd };
    return this.http.post<{ token: string, expiresIn: any, admin: any }>(API_URL + '/user/login', authData);
  }

  setTimer(duration: any) {
    this.tokenTimer = setTimeout(() => { this.onLogout() }, duration * 1000);
  }

  saveUserData(token: string, expiration: Date, admin: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toString());
    localStorage.setItem('admin', admin);
  }

  onLogout() {
    this.authenticated.next(false);
    clearTimeout(this.tokenTimer);
    this.changeAdmin(0);
    localStorage.removeAll();
    this.router.navigate(['']);
  }

  getUserData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const admin = localStorage.getItem('admin');
    if (!token || !expiration) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expiration),
      admin: admin
    };
  }

  getCars(from: String, until: String) {
    return this.http.post(API_URL + '/admin/cars', { from, until });
  }

  rentCar(id: any, from: any, until: any, fromDate: any, untilDate: any) {
    return this.http.post(API_URL + '/admin/rent', { id: id, from: from, until: until, fromDate: fromDate, untilDate: untilDate });
  }

}
