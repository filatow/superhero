import { Injectable } from "@angular/core";
import { Profile } from "../shared/interfaces";

@Injectable({providedIn: 'root'})
export class ProfileService {
  private profileId: string;
  private profileData: Profile;

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
}
