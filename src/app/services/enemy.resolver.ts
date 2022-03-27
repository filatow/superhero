import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TOTAL_HERO_AMOUNT } from "../consts";
import { Hero } from "../shared/interfaces";
import { HeroesService } from "./heroes.service";

@Injectable({
  providedIn: 'root'
})
export class EnemyResolver implements Resolve<Hero> {
  constructor(
    private heroService: HeroesService
  ) {}

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Hero | Observable<Hero> | Promise<Hero> {
    const randomHeroId = Math.floor(Math.random() * TOTAL_HERO_AMOUNT + 1);

    return this.heroService.getById(randomHeroId);
  }
}
