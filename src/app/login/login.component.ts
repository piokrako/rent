import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.userService.loginUser(email, password).subscribe(
      result => {
        this.userService.authenticated.next(true);
        const admin = result.admin;
        const token = result.token;
        this.userService.isAdmin.next(admin);
        const expires = result.expiresIn;
        if (token) {
          this.userService.setTimer(expires);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expires * 1000);
          this.userService.saveUserData(token, expirationDate, admin);
          this.router.navigate(['/main']);
        }
      }
    )

  }

  autoAuthUser() {
    const authInfo = this.userService.getUserData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.userService.authenticated.next(true);
    }
  }
}
