import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      let extras: NavigationExtras;

      if (this.authService.tokenWasExpired()) {
        extras = {
          queryParams: {
            needRelog: true
          }
        }
      } else {
        extras = {
          queryParams: {
            needLogin: true
          }
        }
      }

      this.authService.logout();
      this.router.navigate(['/login'], extras);
    }
  }

}
