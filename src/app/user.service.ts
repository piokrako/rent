import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  tokenTimer: any;
  isAdmin = new Subject();
  authenticated = new BehaviorSubject(false);
  selectedCars = new Subject();
  path = 'http://localhost:3000/uploads/';

  constructor(private http: HttpClient, private router: Router) { }

  changeAdmin(data: any) {
    this.isAdmin.next(data);
  }

  createUser(email: string, password: string) {
    const authData = {
      email: email,
      password: password
    };
    return this.http.post('http://localhost:3000/api/user/signup', authData);
  }

  loginUser(email: string, passowrd: string) {
    const authData = { email: email, password: passowrd };
    return this.http.post<{ token: string, expiresIn: any, admin: any }>('http://localhost:3000/api/user/login', authData);
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
    return this.http.post('http://localhost:3000/api/admin/cars', {from, until});

  }

}
