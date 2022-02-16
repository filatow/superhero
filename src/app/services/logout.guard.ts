import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class LogoutGuard implements CanActivateChild {
  constructor(
    private auth: AuthService,
    private location: Location
  ) {}

  canActivateChild(
    routeSn: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.auth.isAuthenticated()) {
      return true;
    } else {
      this.location.back();
    }
  }

}
