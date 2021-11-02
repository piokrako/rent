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

  constructor( private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

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
      this.authService.login(email, password).pipe(takeUntil(this.unsubscribe)).subscribe(
        result => {
          this.openSnackBar('Logged successfully' + result, "Close");
        },
        (error) => {
          this.openSnackBar(error.error.message, "Close");
          console.log(error);
        }
      )
    }
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}
