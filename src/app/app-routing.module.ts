import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroSelectionPageComponent } from './hero-selection-page/hero-selection-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginComponent } from './login-page/login/login.component';
import { RegistrationComponent } from './login-page/registration/registration.component';
import { AuthGuard } from './services/auth.guard';
import { LogoutGuard } from './services/logout.guard';


const routes: Routes = [
  {path: 'selection', component: HeroSelectionPageComponent, canActivate: [AuthGuard]},
  {
    path: '', component: LoginPageComponent, canActivateChild: [LogoutGuard], children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
