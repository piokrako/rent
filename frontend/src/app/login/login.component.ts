import { AuthService } from './../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../services/user.service';
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

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (email && password && !form.invalid) {
      this.authService.login(email, password).pipe(takeUntil(this.unsubscribe)).subscribe(
        res => {
          this._snackBar.open("Logged successfully", "Close", {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          console.log(res);
        },
        err => {
          this._snackBar.open(err.error.message, "Close", {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          console.log(err);
        }
      )
    }
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}
