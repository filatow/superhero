import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { FightResult } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-battles-history',
  templateUrl: './battles-history.component.html',
  styleUrls: ['./battles-history.component.scss']
})
export class BattlesHistoryComponent implements OnInit {
  fights: Array<{
    time: number,
    heroId: string,
    heroName: string,
    enemyId: string
    enemyName: string,
    victory: boolean,
  }> = [];
  columns: any[];

  constructor(
    public profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'time', header: 'Date' },
      { field: 'heroName', header: 'Hero' },
      { field: 'enemyName', header: 'Opponent' },
      { field: 'victory', header: 'Result' }
    ];

    this.fights = this.profileService.getFightResults()
      .map((fr: FightResult) => {
        const fight = {
          time: fr.time,
          heroName: fr.hero.name,
          heroId: fr.hero.id,
          enemyName: fr.enemy.name,
          enemyId: fr.enemy.id,
          victory: fr.victory
        };

        return fight;
      })
  }

}
