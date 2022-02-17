import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { nanoid } from "nanoid";
import { HOUR_IN_MS, SESSION_TOKEN_LENGTH } from "../consts";
import { SessionToken, User } from "../shared/interfaces";
import { RegistryService } from "./registry.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private registryService: RegistryService,
    private router: Router
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
    const existedUser = this.registryService.findUser(user);

    if (existedUser) {
      this.createToken();
      const token = this.sessionToken.value;
      this.registryService.patchUserWithToken(existedUser.id, {token});
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
