import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  cars: any;
  path: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.selectedCars.subscribe((res) => {
      this.cars = res;
    })

    this.path = this.userService.path;
  }

}

export interface Car {
  brand: String,
  model: String,
  power: String,
  seats: Number,
  imgUrl: String,
}
