import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ProfileService } from "./profile.service";

@Injectable({ providedIn: 'root' })
export class BattleGuard implements CanActivate {
  constructor(
    private profileService: ProfileService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const heroes = this.profileService.getHeroes();

    if (heroes.length) {
      return true;
    }

    return false;
  }
}
