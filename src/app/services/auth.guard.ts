import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationExtras,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuthenticated()) {
      return true;
    }

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

    return this.router.createUrlTree(['/login'], extras);
  }
}
