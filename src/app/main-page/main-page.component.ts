import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import * as moment from 'moment';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  cars: any;
  path: string;

  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.selectedCars.subscribe((res) => {
      this.cars = res;
    })

    this.path = this.userService.path;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onRent(car: Car) {
    const from = localStorage.getItem('from');
    const until = localStorage.getItem('until');
    const fromDate = moment(from).format('YYYY-MM-DD');
    const untilDate = moment(until).format('YYYY-MM-DD');
    this.userService.rentCar(car._id, from, until, fromDate, untilDate).subscribe(
      res => console.log(res),
      err => console.log('Error: ', err),
      () => this.openSnackBar(`You rented ` + car.brand + ' ' + car.model, "OK"));
  }

}

export interface Car {
  _id: any,
  brand: String,
  model: String,
  power: String,
  seats: Number,
  imgUrl: String,
}
