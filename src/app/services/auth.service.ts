import { Injectable } from "@angular/core";
import { nanoid } from "nanoid";
import { HOUR_IN_MS, SESSION_TOKEN_LENGTH } from "../consts";
import { SessionToken, User } from "../shared/interfaces";
import { RegistryService } from "./registry.service";
import { ProfileService } from "./profile.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private registryService: RegistryService,
    private profileService: ProfileService,
  ) { }

  private createToken() {
    const value = nanoid(SESSION_TOKEN_LENGTH);
    const sessionToken: SessionToken = {
      value,
      expiryDate: new Date().getTime() + HOUR_IN_MS
    }

    localStorage.setItem('sessionToken', JSON.stringify(sessionToken));
  }

  private get sessionToken(): SessionToken {
    return JSON.parse(localStorage.getItem('sessionToken'));;
  }

  login(user: User) {
    const registeredUser = this.registryService.findUser(user);

    if (registeredUser) {
      this.createToken();
      const token = this.sessionToken.value;
      this.registryService.patchUserWithToken(registeredUser.id, {token});

      const userProfile = this.profileService.getProfileById(registeredUser.id);
      if (!userProfile) {
        this.profileService.createProfile(registeredUser.id);
      }

      this.registryService.setActiveUserId(registeredUser.id);
    }
  }

  isAuthenticated(): boolean {
    return this.sessionToken && !this.tokenWasExpired();
  }

  tokenWasExpired(): boolean {
    const token: SessionToken = this.sessionToken;
    const wasExpired = +token?.expiryDate <= Date.now();

    return token && wasExpired;
  }

  logout() {
    localStorage.setItem('sessionToken', null);
  }
}
