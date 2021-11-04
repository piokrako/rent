import { AuthService } from './../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();
  constructor(private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {
    const email = form.value.email;
    const pass = form.value.password;
    if (email && pass && form.valid) {
      this.authService.createUser(email, pass).pipe(takeUntil(this.unsubscribe)).subscribe(
        res => {
          this._snackBar.open(`User ` + email + ` was created!`, "Close", {
            duration: 3600,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          console.log(res);
        },
        err => {
          this._snackBar.open(`Conflict: User already exists!`, "Close", {
            duration: 3600,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          console.log(err)
        },
        () => {
          form.resetForm();
        }
      );
    }
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}
