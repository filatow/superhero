import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../shared/interfaces';

@Component({
  selector: 'app-hero-info-page',
  templateUrl: './hero-info-page.component.html',
  styleUrls: ['./hero-info-page.component.scss']
})
export class HeroInfoPageComponent implements OnInit {
  hero: Hero;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.data.subscribe((data) => {
      this.hero = data.hero;
    })
  }
}
