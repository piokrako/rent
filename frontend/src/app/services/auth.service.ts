import { environment } from './../../environments/environment';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

let API_URL = environment.baseUrl + "/api";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  tokenTimer: any;
  private isAdmin$ = new Subject();

  get token(): any {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient, private router: Router) {
    this._isLoggedIn$.next(!!this.token);
  }

  login(email: string, passowrd: string) {
    return this.http.post<{ token: string, expiresIn: any, admin: any }>(API_URL + '/user/login', {
      email: email, password: passowrd
    }).pipe(
      tap((response: any) => {
        this.saveUserData(response.token, response.expiresIn, response.admin);
        this._isLoggedIn$.next(true);
        this.router.navigate(['/main']);
      }),
      shareReplay()
    );
  }

  loggedIn() {
    return !!this.token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('admin');
    this.router.navigate(['/login']);
  }

  getToken() {
    return this.token;
  }

  changeAdmin(data: any) {
    this.isAdmin$.next(data);
  }

  createUser(email: string, password: string) {
    const authData = {
      email: email,
      password: password
    };
    return this.http.post(API_URL + '/user/signup', authData);
  }

  private saveUserData(token: string, expiration: Date, admin: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toString());
    localStorage.setItem('admin', admin);
  }

  private setTimer(duration: any) {
    this.tokenTimer = setTimeout(() => { this.onLogout() }, duration * 1000);
  }

  private onLogout() {
    this._isLoggedIn$.next(false);
    clearTimeout(this.tokenTimer);
    this.changeAdmin(0);
    localStorage.removeAll();
    this.router.navigate(['']);
  }

  private getUserData() {
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
}
