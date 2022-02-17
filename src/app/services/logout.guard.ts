import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class LogoutGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: AuthService,
    private location: Location,
  ) { }

  canActivate(
    routeSn: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> | UrlTree {
    if (!this.auth.isAuthenticated()) {
      return true;
    } else {
      this.location.back();
    }
  }

  canActivateChild(
    routeSn: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> | UrlTree {
    if (!this.auth.isAuthenticated()) {
      return true;
    } else {
      this.location.back();
    }
  }

}
