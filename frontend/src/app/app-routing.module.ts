import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { CreateCarComponent } from './create-car/create-car.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-car', component: CreateCarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manage', component: ManageReservationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users', component: AdminUsersComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
