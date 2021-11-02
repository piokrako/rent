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
  constructor(private authService: AuthService,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  onRegister(form: NgForm) {
    const email = form.value.email;
    const pass = form.value.password;
    if (email && pass && form.valid) {
      this.authService.createUser(email, pass).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
        this.openSnackBar(`User `+ email + ` was created!`, "Close")
        console.log(res);
      },
      (error) => {
        this.openSnackBar(`Conflict: User already exists!`, "Close")
        console.log(error)},
      () => {
        form.resetForm();
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}
