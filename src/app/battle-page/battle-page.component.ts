import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { POWERUP_NAMES } from '../consts';
import { ProfileService } from '../services/profile.service';
import { FightResult, Hero, Powerup, PowerupBonusPoints } from '../shared/interfaces';

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
  selectedPowerups: Powerup[];
  bonusPoints: PowerupBonusPoints = {
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0
  };
  powerupNames: string[] = POWERUP_NAMES;

  displayFightModal = false;
  displayFightPreloader = true;
  displayFightResults = false;
  progressBarValue = 0;
  private fightPreloaderAnimationInterval: ReturnType<typeof setInterval>;
  private fightPreloaderAnimationTimeout: ReturnType<typeof setTimeout>;

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
      (a: Powerup, b: Powerup) => b.usesCount - a.usesCount
    ).map((p: Powerup) => {
      p['inactive'] = !p.usesCount;
      return p;
    });
  }

  private executeFightAnimation() {
    this.progressBarValue = 0;
    this.fightPreloaderAnimationInterval = setInterval(() => {
      this.progressBarValue += 25;
      if (this.progressBarValue >= 100) {
        this.progressBarValue = 100;
        clearInterval(this.fightPreloaderAnimationInterval);
      }
    }, 1000);

    this.fightPreloaderAnimationTimeout = setTimeout(() => {
      this.displayFightPreloader = false;
      this.displayFightResults = true;
      clearTimeout(this.fightPreloaderAnimationTimeout);
    }, 5000);
  }

  showFightModal() {
    this.displayFightModal = true;
  }

  hideFightModal() {
    this.displayFightPreloader = true;
    this.displayFightResults = false;
    clearInterval(this.fightPreloaderAnimationInterval);
    clearTimeout(this.fightPreloaderAnimationTimeout);
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
    let victoryProbability: number;

    for (let powerupName of this.powerupNames) {
      const heroPowerstatValue = +this.hero.powerstats[powerupName] + +this.bonusPoints[powerupName];
      let enemyPowerstatValue: number;

      if (this.enemy.powerstats[powerupName] === null) {
        enemyPowerstatValue = heroPowerstatValue;
      } else {
        enemyPowerstatValue = +this.enemy.powerstats[powerupName];
      }

      if (heroPowerstatValue > enemyPowerstatValue) {
        heroStrongSidesCount++;
      } else if (heroPowerstatValue === enemyPowerstatValue) {
        heroStrongSidesCount += 0.5;
      }
    }
    victoryProbability = heroStrongSidesCount / this.powerupNames.length;

    return victoryProbability;
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
    this.executeFightAnimation();

    this.lastFightResult = this.getFightResult();
    this.profileService.addFightResult(this.lastFightResult);

    this.reviseProfilePowerups();
    this.setPowerups();

    this.resetBonusPoints();
    this.clearSelectedPowerups();
  }
}
