import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onCreate(form: NgForm) {

  }

  onFileSelected() {


  }
}
