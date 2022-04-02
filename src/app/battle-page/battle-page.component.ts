import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { POWERUP_NAMES } from '../consts';
import { ProfileService } from '../services/profile.service';
import { FightResult, Hero, Powerup, PowerupBonusPoints } from '../shared/interfaces';
import { DEFAULT_POWERUP_BONUS_POINTS } from './consts';

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss']
})
export class BattlePageComponent implements OnInit {
  hero: Hero;
  enemy: Hero;
  powerups: Powerup[];
  lastFightResult: FightResult = null;
  selectedPowerups: Powerup[] = [];
  bonusPoints: PowerupBonusPoints = DEFAULT_POWERUP_BONUS_POINTS;
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

    this.route.data.subscribe((data) => {
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
      p['inactive'] = !p.usesCount;
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
    let heroStrongSidesCount = 0;
    const DEFAULT_EQUALIZING_VALUE = 100;

    for (let powerupName of this.powerupNames) {
      let heroPowerstatValue: number = DEFAULT_EQUALIZING_VALUE;
      let enemyPowerstatValue: number = DEFAULT_EQUALIZING_VALUE;

      if (this.hero.powerstats[powerupName] !== 'null' &&
          this.enemy.powerstats[powerupName] !== 'null') {
        heroPowerstatValue = +this.hero.powerstats[powerupName] + +this.bonusPoints[powerupName];
        enemyPowerstatValue = +this.enemy.powerstats[powerupName];
      }

      if (heroPowerstatValue > enemyPowerstatValue) {
        heroStrongSidesCount++;
      } else if (heroPowerstatValue === enemyPowerstatValue) {
        heroStrongSidesCount += 0.5;
      }
    }

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
}
