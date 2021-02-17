import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { HomeComponent } from 'src/app/pages/home/home.component';

const AuthLayoutRoutes: Routes = [
  { path: 'login',      component: LoginComponent },
  { path: 'register',   component: RegisterComponent },
  { path: 'home',           component: HomeComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
  ]
})
export class AuthLayoutModule { }
