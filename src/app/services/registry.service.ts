import { Injectable } from "@angular/core";
import { User } from "../shared/interfaces";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: 'root' })
export class RegistryService {
  private users: User[] | null;
  private activeUserId: string;

  constructor(
    private storageService: StorageService
  ) {
    this.users = this.storageService.getItem('users');
    this.activeUserId = this.storageService.getItem('activeUserId');

  }

  private actualizeStorage() {
    this.storageService.setItem('users', this.users);
    this.storageService.setItem('activeUserId', this.activeUserId);
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
    if (!this.users) return false;

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

  setActiveUserId(userId: string) {
    this.activeUserId = userId;
    this.actualizeStorage();
  }

  getActiveUserId() {
    return this.activeUserId;
  }

  nullifyActiveUserId() {
    this.activeUserId = null;
    this.actualizeStorage();
  }
}
