import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Hero } from 'src/app/shared/interfaces';
import { HERO_IMAGE_HEIGHT, HERO_IMAGE_WIDTH } from './consts';

@Component({
  selector: 'app-user-heroes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-heroes.component.html',
  styleUrls: ['./user-heroes.component.scss']
})
export class UserHeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHeroIndex: number;
  heroImageWidth = HERO_IMAGE_WIDTH;
  heroImageHeight = HERO_IMAGE_HEIGHT;

  constructor(
    public profileService: ProfileService
  ) {}

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

  trackItem(_index: number, item: any) {
    return item.id || item;
  }
}
