import { takeUntil } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSearch(form: NgForm) {
    const from0 = form.value.dateInput[0];
    const until0 = form.value.dateInput[1];
    const from = moment(from0).format('YYYYMMDD');
    const until = moment(until0).format('YYYYMMDD');
    localStorage.setItem('from', from);
    localStorage.setItem('until', until);
    this.userService.getCars(from, until).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.userService.selectedCars.next(res)
    });

  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
