import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { POWERUP_NAMES } from '../consts';
import { ProfileService } from '../services/profile.service';
import { FightResult, Hero, Powerup, HeroPowerstats } from '../shared/interfaces';
import { DEFAULT_POWERUP_BONUS_POINTS, HERO_IMAGE_WIDTH, HERO_IMAGE_HEIGHT } from './consts';

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss']
})
export class BattlePageComponent implements OnInit, OnDestroy {
  heroImageWidth = HERO_IMAGE_WIDTH;
  heroImageHeight = HERO_IMAGE_HEIGHT;
  hero: Hero;
  enemy: Hero;
  powerups: Powerup[];
  routeDataSub: Subscription;
  lastFightResult: FightResult = null;
  selectedPowerups: Powerup[] = [];
  bonusPoints: HeroPowerstats = DEFAULT_POWERUP_BONUS_POINTS;
  powerupNames: string[] = POWERUP_NAMES;

  fightTimerSub: Subscription;
  displayFightModal = false;
  displayFightPreloader = true;
  displayFightResults = false;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.hero = this.profileService.getSelectedHero();

    this.routeDataSub = this.route.data.subscribe((data) => {
      this.enemy = data.enemy;
    })

    this.setPowerups();
    this.resetBonusPoints();
  }

  private setPowerups() {
    this.powerups = this.profileService.getPowerups()
      .sort(
        (a: Powerup, b: Powerup) => (b.name > a.name) ? -1 : 1
      ).map((p: Powerup) => {
        p.inactive = !p.usesCount;
        return p;
      });
  }

  private executeFightProcess() {
    this.fightTimerSub = timer(5000).subscribe({
      next: () => {
        this.displayFightPreloader = false;
        this.displayFightResults = true;

        this.lastFightResult = this.getFightResult();
        this.profileService.addFightResult(this.lastFightResult);

        this.reviseProfilePowerups();
        this.setPowerups();

        this.resetBonusPoints();
        this.clearSelectedPowerups();
      },
      complete: () => {
        this.fightTimerSub.unsubscribe();
      }
    })
  }

  private interruptFightProcess() {
    this.fightTimerSub.unsubscribe();
  }

  showFightModal() {
    this.displayFightModal = true;
  }

  hideFightModal() {
    this.interruptFightProcess();
    this.displayFightPreloader = true;
    this.displayFightResults = false;
  }

  resetBonusPoints() {
    this.powerupNames.forEach((powerupName: string) => {
      this.bonusPoints[powerupName] = 0;
    });
  }

  clearSelectedPowerups() {
    this.selectedPowerups = [];
  }

  powerupListChange() {
    this.resetBonusPoints();
    this.selectedPowerups.forEach((p: Powerup) => {
      this.bonusPoints[p.description.powername] += Number(p.description.value);
    });
  }

  getVictoryProbability(): number {
    const heroStrongSidesCount = this.powerupNames.reduce(
      (accum: number, powerupName: string) => {
        const heroPowerstat = +this.hero.powerstats[powerupName] +
          +this.bonusPoints[powerupName];
        const enemyPowerstat = +this.enemy.powerstats[powerupName];

        if (isNaN(heroPowerstat) || isNaN(enemyPowerstat)) {
          accum += 0.5;
        } else if (heroPowerstat === enemyPowerstat) {
          accum += 0.5;
        } else if (heroPowerstat > enemyPowerstat) {
          accum++;
        }

        return accum;
      }, 0);

    return heroStrongSidesCount / this.powerupNames.length;
  }

  getFightResult(): FightResult {
    const victoryProbability = this.getVictoryProbability();

    return {
      time: Date.now(),
      hero: this.hero,
      enemy: this.enemy,
      victory: victoryProbability >= Math.random() ? true : false
    };
  }

  reviseProfilePowerups() {
    const powerupNames = this.selectedPowerups.map((p: Powerup) => p.name);

    this.profileService.decrementPowerupsCount(powerupNames);
  }

  fight() {
    this.showFightModal();
    this.executeFightProcess();
  }

  ngOnDestroy(): void {
    if (this.routeDataSub) {
      this.routeDataSub.unsubscribe();
    }
  }
}
