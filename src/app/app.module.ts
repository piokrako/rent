import { AdminService } from './admin.service';
import { UserService } from './user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateCarComponent } from './create-car/create-car.component';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CreateCarComponent,
    ManageReservationsComponent,
    MainPageComponent,
    AdminUsersComponent,
    DatepickerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'main', component: MainPageComponent },
      { path: 'create-car', component: CreateCarComponent },
      { path: 'manage', component: ManageReservationsComponent },
      { path: 'users', component: AdminUsersComponent },
    ]),
  ],
  providers: [UserService, LoginComponent, AdminService],
  bootstrap: [AppComponent],
})
export class AppModule {}
