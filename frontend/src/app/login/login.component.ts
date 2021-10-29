import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();
  token: any;

  constructor(private userService: UserService, private router: Router, private _snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (email && password && !form.invalid) {
      this.userService.loginUser(email, password).pipe(takeUntil(this.unsubscribe)).subscribe(
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
        },
        (error) => {

          this.openSnackBar(error.error.message, "Close");
        console.log(error);
        }
      )
    }


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

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}
