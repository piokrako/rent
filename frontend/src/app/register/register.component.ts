import { takeUntil } from 'rxjs/operators';
import { UserService } from '../user.service';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {
    const email = form.value.email;
    const pass = form.value.password;
    this.userService.createUser(email, pass).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}
