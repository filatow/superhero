import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Hero } from "../shared/interfaces";
import { HeroesService } from "./heroes.service";

@Injectable({
  providedIn: 'root'
})
export class HeroResolver implements Resolve<Hero> {
  constructor(
    private heroService: HeroesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Hero | Observable<Hero> | Promise<Hero> {
    return this.heroService.getById(+route.params['id']); // returns Observable<Hero>
  }
}
