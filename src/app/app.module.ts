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

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, NavbarComponent, CreateCarComponent],
  imports: [BrowserModule, MatFormFieldModule, FormsModule, MatCardModule, MatInputModule, BrowserAnimationsModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterModule.forRoot([
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
