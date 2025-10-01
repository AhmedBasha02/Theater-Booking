import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { AdminLoginComponent } from './admin/login/login';
import { SeatSelectionComponent } from './booking/seat-selection/seat-selection';
import { RegisterComponent } from './auth/register/register';
import { DashboardComponent } from './user/dashboard/dashboard';
import { NgModule } from '@angular/core';
import { HistoryComponent } from './user/history/history';
import { FoodSelectionComponent } from './booking/food-selection/food-selection';
import { UserAuthGuard } from './core/user-auth-guard';
import { AdminAuthGuard } from './core/admin-auth-guard';
import { AdminDashboardComponent } from './admin/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user',
    //redirectTo: 'user/dashboard',
    //pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'user/history',
    component: HistoryComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'booking/seat-selection',
    component: SeatSelectionComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'booking/food-selection/:bookingId',
    component: FoodSelectionComponent,
    canActivate: [UserAuthGuard],
  },
  { path: 'admin', component: AdminLoginComponent },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// export const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   //   { path: 'admin', component: AdminLoginComponent },
//   { path: 'booking', component: SeatSelectionComponent },
//   { path: 'user', component: DashboardComponent },
//   { path: 'booking', component: SeatSelectionComponent },
//   { path: '**', redirectTo: 'login' },
// ];

// import { AdminLoginComponent } from './admin/login';

// const routes: Routes = [
//   { path: 'admin', component: AdminLoginComponent },
// //   { path: 'admin/dashboard', component: AdminDashboardComponent }, // create this next
// ];

// import { LoginComponent } from './auth/login.component';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'user', component: DashboardComponent }, // make sure DashboardComponent exists
// ];

// import { RegisterComponent } from './auth/register.component';

// const routes: Routes = [
//   { path: 'register', component: RegisterComponent },
//   { path: 'user', component: DashboardComponent }, // make sure DashboardComponent exists
// ];

// import { DashboardComponent } from './user/dashboard.component';

// const routes: Routes = [
//   { path: 'user', component: DashboardComponent },
//   { path: 'booking', component: SeatSelectionComponent },
//   { path: 'user/history', component: HistoryComponent }
// ];

// import { HistoryComponent } from './user/history.component';

// const routes: Routes = [
//   { path: 'user/history', component: HistoryComponent }
// ];
