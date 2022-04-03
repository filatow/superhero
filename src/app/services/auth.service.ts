import { Injectable } from "@angular/core";
import { nanoid } from "nanoid";
import { HOUR_IN_MS, SESSION_TOKEN_LENGTH } from "../consts";
import { SessionToken, User } from "../shared/interfaces";
import { RegistryService } from "./registry.service";
import { ProfileService } from "./profile.service";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private registryService: RegistryService,
    private profileService: ProfileService,
    private storageService: StorageService,
  ) {}

  private createToken() {
    const value = nanoid(SESSION_TOKEN_LENGTH);
    const sessionToken: SessionToken = {
      value,
      expiryDate: new Date().getTime() + HOUR_IN_MS
    }

    this.storageService.setItem('sessionToken', sessionToken);
  }

  private get sessionToken(): SessionToken {
    return this.storageService.getItem('sessionToken');
  }

  login(user: User) {
    const registeredUser = this.registryService.findUser(user);

    if (registeredUser) {
      this.createToken();
      const token = this.sessionToken.value;
      this.registryService.setActiveUserId(registeredUser.id);
      this.registryService.patchUserWithToken(registeredUser.id, {token});

      const userProfile = this.profileService.getProfileById(registeredUser.id);
      if (!userProfile) {
        this.profileService.createProfile(registeredUser.id);
      }

      this.profileService.setActualProfile(registeredUser.id);
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
    this.storageService.removeItem('sessionToken');
  }
}
