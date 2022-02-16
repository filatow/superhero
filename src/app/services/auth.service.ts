import { Injectable } from "@angular/core";
import { nanoid } from "nanoid";
import { HOUR_IN_MS } from "../consts";
import { SessionToken, User } from "../shared/interfaces";
import { RegistryService } from "./registry.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private registryService: RegistryService) { }

  login(user: User) {
    const existedUser = this.registryService.findUser(user);
    // const sessionToken = JSON.parse(localStorage.getItem('sessionToken')); // null by default

    if (existedUser) {
      this.createToken();
      const token = this.sessionToken.value;
      this.registryService.patchUserWithToken(existedUser.id, {token});
    }
  }

  private createToken() {
    const token = nanoid(140);
    const sessionToken: SessionToken = {
      value: token,
      expiryDate: new Date().getTime() + HOUR_IN_MS
    }

    localStorage.setItem('sessionToken', JSON.stringify(sessionToken));
  }

  get sessionToken(): SessionToken {
    const sessionToken: SessionToken = JSON.parse(localStorage.getItem('sessionToken'));
    if (Date.now() > +sessionToken?.expiryDate) {
      this.logout();
    }

    return sessionToken;
  }

  isAuthenticated(): boolean {
    return !!this.sessionToken;
  }

  logout() {
    localStorage.setItem('sessionToken', null);
  }
}
