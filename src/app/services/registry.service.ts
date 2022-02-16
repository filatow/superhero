import { Injectable } from "@angular/core";
import { User } from "../shared/interfaces";

@Injectable({ providedIn: 'root' })
export class RegistryService {
  private users: User[] | null;

  constructor() {
    this.users = JSON.parse(localStorage.getItem('users'));
  }

  private updateStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  isEmailUnique(email: string): boolean {
    if (this.users) {
      const userWithEmail = this.users.find((u: User) => u.email === email);
      if (userWithEmail) return false;
    }

    return true;
  }

  register(user: User) {
    if (!this.users) {
      this.users = [user];
    } else {
      this.users.push(user);
    }

    this.updateStorage();
  }

  findUser(userToFind: User) {
    console.log(`userToFind `, userToFind);

    const existedUser = this.users.find((user: User) => {
      for (let prop of Object.keys(userToFind)) {
        if (userToFind[prop] !== user[prop]) {
          return false;
        }
      }

      return true;
    });
    console.log(`existedUser `, existedUser);

    return existedUser;
  }

  patchUserWithToken(userId: string, patch: {token: string}) {
    const userToPatchIndex = this.users.findIndex((user: User) => user.id === userId);

    Object.assign(
      this.users[userToPatchIndex],
      patch
    )

    this.updateStorage();
  }
}
