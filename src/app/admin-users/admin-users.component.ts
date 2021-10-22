import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from './../admin.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['email', 'isAdmin', 'actions'];
  dataSource = new MatTableDataSource();

  users: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table: MatTableDataSource<any>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(res => {
      const ELEMENT_DATA: User[] = [];
      this.users = res;
      this.users.forEach((user: User) => {
        const email = user.email;
        const isAdmin = user.isAdmin;
        ELEMENT_DATA.push({ email, isAdmin });
      });
      this.dataSource.data = ELEMENT_DATA;
      this.dataSource.paginator = this.paginator;
    });

  }

  onDelete(user: User) {
    this.adminService.deleteUser(user.email).subscribe(res => {
      const ELEMENT_DATA: User[] = [];
      this.users = res;
      this.users.forEach((user: User) => {
        const email = user.email;
        const isAdmin = user.isAdmin;
        ELEMENT_DATA.push({ email, isAdmin });
      });
      this.dataSource.data = ELEMENT_DATA;
      this.dataSource.paginator = this.paginator;
    });
  }

  onAdmin(user: User) {
    this.adminService.makeAdmin(user.email).subscribe(res => {
      const ELEMENT_DATA: User[] = [];
      this.users = res;
      this.users.forEach((user: User) => {
        const email = user.email;
        const isAdmin = user.isAdmin;
        ELEMENT_DATA.push({ email, isAdmin });
      });
      this.dataSource.data = ELEMENT_DATA;
      this.dataSource.paginator = this.paginator;
    });
  }

}


export interface User {
  email: string;
  isAdmin: string;
}
