import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { nanoid } from "nanoid";
import { HOUR_IN_MS } from "../consts";
import { SessionToken, User } from "../shared/interfaces";
import { RegistryService } from "./registry.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private registryService: RegistryService,
    private router: Router
  ) { }

  login(user: User) {
    const existedUser = this.registryService.findUser(user);

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
      this.router.navigate(['/login']);
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
