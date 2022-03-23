import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Observable, Subscription } from 'rxjs';
import { Hero } from '../shared/interfaces';

@Component({
  selector: 'app-hero-info-page',
  templateUrl: './hero-info-page.component.html',
  styleUrls: ['./hero-info-page.component.scss']
})
export class HeroInfoPageComponent implements OnInit, OnDestroy {
  hero: Hero;
  // hero$: Observable<Hero>;
  // heroSub: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.data.subscribe((data) => {
      console.log(`DATA: `, data);

      this.hero = data.hero;
      // this.heroSub = this.hero$.subscribe(
      //   (hero: Hero) => {
      //     console.log('Hero response: ', hero)
      // });

    })
  }

  ngOnDestroy() {
    // this.heroSub.unsubscribe();
  }

}
