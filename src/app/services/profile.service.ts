import { Injectable } from "@angular/core";
import { ProfilePowerup } from "../consts";
import { FightResult, Hero, Powerup, Profile } from "../shared/interfaces";
import { RegistryService } from "./registry.service";

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private profileId: string;
  private profileData: Profile;

  constructor(
    private registryService: RegistryService,
  ) {
    this.setActualProfile(this.registryService.getActiveUserId());
  }

  getSelectedHeroIndex() {
    return this.profileData.selectedHeroIndex;
  }

  setSelectedHeroIndex(heroId: string) {
    this.profileData.selectedHeroIndex = this.profileData.heroes.findIndex(
      (hero: Hero) => hero.id === heroId
    );
  }

  getSelectedHero() {
    const selectedHeroIndex = this.getSelectedHeroIndex();

    return this.profileData.heroes[selectedHeroIndex];
  }

  private actualizeStorage() {
    localStorage.setItem(this.profileId, JSON.stringify(this.profileData));
  }

  getProfileById(userId: string): Profile {
    return JSON.parse(localStorage.getItem(userId));
  }

  setActualProfile(userId: string, profile?: Profile) {
    this.profileId = userId;
    this.profileData = profile ? profile : this.getProfileById(userId);
  }

  createProfile(userId: string) {
    const newProfile: Profile = {
      searches: [],
      heroes: [],
      selectedHeroIndex: null,
      powerups: Object.values(ProfilePowerup),
      fightResults: []
    }

    this.setActualProfile(userId, newProfile);
    this.actualizeStorage();
  }

  saveSearchedString(searchedString: string) {
    if (!this.profileData) {
      throw new Error('It\'s needed to create the Profile first');
    }
    searchedString = searchedString.toLocaleLowerCase();
    const alreadySaved = this.profileData.searches.includes(searchedString);

    if (!alreadySaved) {
      this.profileData.searches.push(searchedString);
      this.actualizeStorage();
    }
  }

  getSavedSearches() {
    return this.profileData.searches;
  }

  clearSavedSearches() {
    this.profileData.searches = [];
    this.actualizeStorage();
  }

  addHero(hero: Hero) {
    this.profileData.heroes.push(hero);
    this.profileData.selectedHeroIndex = this.profileData.heroes.length - 1;
    this.actualizeStorage();
  }

  getHeroes() {
    return this.profileData.heroes;
  }

  isHeroInList(heroId: string): boolean {
    return !!this.profileData.heroes.find((hero: Hero) => hero.id === heroId);
  }

  getPowerups() {
    return this.profileData.powerups;
  }

  decrementPowerupsCount(powerupNames: string[]) {
    this.profileData.powerups.forEach((p: Powerup) => {
      if (powerupNames.includes(p.name)) {
        p.usesCount--;
      }
    })
    this.actualizeStorage();
  }

  addFightResult(result: FightResult) {
    this.profileData.fightResults.push(result);
    this.actualizeStorage();
  }

  getFightResults() {
    return this.profileData.fightResults;
  }
}
