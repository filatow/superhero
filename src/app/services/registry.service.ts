import { Injectable } from "@angular/core";
import { User } from "../shared/interfaces";

@Injectable({ providedIn: 'root' })
export class RegistryService {
  private users: User[] | null;
  private activeUser: User = null;

  constructor() {
    this.users = JSON.parse(localStorage.getItem('users'));
  }

  private actualizeStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  isEmailUnique(email: string): boolean {
    if (this.users) {
      const userWithEmail = this.users.find((u: User) => u.email === email);
      if (userWithEmail) return false;
    }

    return true;
  }

  registerUser(user: User) {
    if (!this.users) {
      this.users = [user];
    } else {
      this.users.push(user);
    }

    this.actualizeStorage();
  }

  findUser(userToFind: User) {
    const existedUser = this.users.find((user: User) => {
      for (let prop of Object.keys(userToFind)) {
        if (userToFind[prop] !== user[prop]) {
          return false;
        }
      }

      return true;
    });

    return existedUser;
  }

  patchUserWithToken(userId: string, patch: {token: string}) {
    const userToPatchIndex = this.users.findIndex((user: User) => user.id === userId);

    Object.assign(
      this.users[userToPatchIndex],
      patch
    )

    this.actualizeStorage();
  }

  setActiveUser(user: User) {
    this.activeUser = user;
  }
}
