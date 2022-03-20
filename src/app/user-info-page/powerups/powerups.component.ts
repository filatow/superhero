import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Powerup } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-powerups',
  templateUrl: './powerups.component.html',
  styleUrls: ['./powerups.component.scss']
})
export class PowerupsComponent implements OnInit {
  powerups: Powerup[];

  constructor(
    public profileService: ProfileService
  ) {
    // this.powerups = this.profileService.getPowerups();
  }

  ngOnInit(): void {
    this.powerups = this.profileService.getPowerups().sort(
      (a: Powerup , b: Powerup) => b.usesCount - a.usesCount
    );
  }

}
