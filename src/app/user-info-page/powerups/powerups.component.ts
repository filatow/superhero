import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Powerup } from 'src/app/shared/interfaces';
import { POWERUP_IMAGE_WIDTH, POWERUP_IMAGE_HEIGHT } from './consts'

@Component({
  selector: 'app-powerups',
  templateUrl: './powerups.component.html',
  styleUrls: ['./powerups.component.scss']
})
export class PowerupsComponent implements OnInit {
  powerups: Powerup[];
  powerupImageWidth = POWERUP_IMAGE_WIDTH;
  powerupImageHeight = POWERUP_IMAGE_HEIGHT;

  constructor(
    public profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.powerups = this.profileService.getPowerups().sort(
      (a: Powerup, b: Powerup) => (b.name > a.name) ? -1 : 1
    );
  }

}
