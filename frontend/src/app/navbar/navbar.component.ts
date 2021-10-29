import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: {'class': 'd-flex flex-column h-100'}

})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
