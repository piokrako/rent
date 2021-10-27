import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from '../admin.service';
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['email', 'isAdmin', 'actions'];
  dataSource = new MatTableDataSource();

  users: any;

  private unsubscribe = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table: MatTableDataSource<any>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsers().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
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
    this.adminService.deleteUser(user.email).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
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
    this.adminService.makeAdmin(user.email).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
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


  ngOnDestroy() {
    this.unsubscribe.unsubscribe();

  }
}


export interface User {
  email: string;
  isAdmin: string;
}
