import { Injectable } from "@angular/core";
import { Profile } from "../shared/interfaces";
import { RegistryService } from "./registry.service";

@Injectable({providedIn: 'root'})
export class ProfileService {
  private profileId: string;
  private profileData: Profile;

  constructor(
    private registryService: RegistryService
  ) {
    this.setActualProfile(this.registryService.getActiveUserId());
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
    const emptyProfile: Profile = {
      searches: [],
      heroes: []
    }

    this.setActualProfile(userId, emptyProfile);
    this.actualizeStorage();
  }

  saveSearchedString(searchedString: string) {
    if (!this.profileData) {
      throw new Error('It\'s needed to create the Profile first');
    }
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

  addHero(heroId: string) {
    this.profileData.heroes.push(heroId);
    this.actualizeStorage();
  }

  isHeroInList(heroId: string): boolean {
    return this.profileData.heroes.includes(heroId);
  }
}
