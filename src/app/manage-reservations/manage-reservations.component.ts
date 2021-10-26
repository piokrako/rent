import { AdminService } from './../admin.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ObjectId } from "mongodb";


@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.scss']
})
export class ManageReservationsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['car_id', 'reserved_from', 'reserved_till', 'actions'];
  dataSource = new MatTableDataSource();

  reservations: Reservation[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table: MatTableDataSource<any>;

  constructor(private adminService: AdminService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.adminService.rentedCars().subscribe((res: any) => {
      const ELEMENT_DATA: Reservation[] = [];
      this.reservations = res;
      this.reservations.forEach((reservation: Reservation) => {
        ELEMENT_DATA.push({ car_id: reservation.car_id, fromDate: reservation.fromDate, untilDate: reservation.untilDate });
      });
      this.dataSource.data = ELEMENT_DATA;
      this.dataSource.paginator = this.paginator;
    });
  }


  onDelete(reservation: Reservation) {
    this.adminService.cancelReservation(reservation.car_id, reservation.fromDate, reservation.untilDate).subscribe( res => {
      this.adminService.rentedCars().subscribe((cars: any) => {
        const ELEMENT_DATA: Reservation[] = [];
        this.reservations = cars;
        this.reservations.forEach((reservation: Reservation) => {
          ELEMENT_DATA.push({ car_id: reservation.car_id, fromDate: reservation.fromDate, untilDate: reservation.untilDate });
        });
        this.dataSource.data = ELEMENT_DATA;
        this.dataSource.paginator = this.paginator;
      });
    });

  }
}

export interface Reservation {
  car_id: ObjectId,
  fromDate: Date,
  untilDate: Date,
}
