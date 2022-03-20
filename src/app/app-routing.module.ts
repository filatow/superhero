import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroInfoPageComponent } from './hero-info-page/hero-info-page.component';
import { HeroSelectionPageComponent } from './hero-selection-page/hero-selection-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginComponent } from './login-page/login/login.component';
import { RegistrationComponent } from './login-page/registration/registration.component';
import { AuthGuard } from './services/auth.guard';
import { LogoutGuard } from './services/logout.guard';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';


const routes: Routes = [
  { path: 'selection', component: HeroSelectionPageComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: LoginPageComponent,
    canActivateChild: [LogoutGuard],
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },
  { path: 'user-info', component: UserInfoPageComponent, canActivate: [AuthGuard] },
  { path: 'hero-info/:id', component: HeroInfoPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
