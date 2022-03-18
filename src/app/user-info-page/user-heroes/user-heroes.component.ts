import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Hero } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-heroes',
  templateUrl: './user-heroes.component.html',
  styleUrls: ['./user-heroes.component.scss']
})
export class UserHeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHeroIndex: number;

  constructor(
    public profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.heroes = this.profileService.getHeroes();
    this.selectedHeroIndex = this.profileService.getSelectedHeroIndex();
  }

  isSelectedHero(heroId: string): boolean {
    return this.heroes[this.selectedHeroIndex].id === heroId;
  }

  selectHero(heroId: string) {
    this.profileService.setSelectedHeroIndex(heroId);
    this.selectedHeroIndex = this.profileService.getSelectedHeroIndex();
  }
}
