import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';

const AdminLayoutRoutes: Routes = [
  { path: 'dashboard',      component: DashboardComponent },
  { path: 'user-profile',   component: UserProfileComponent },
  // { path: 'home',           component: HomeComponent }
];
@NgModule({
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),

  ]
})
export class AdminLayoutModule { }
