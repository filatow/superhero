import { Injectable } from "@angular/core";
import { User } from "../shared/interfaces";



@Injectable({ providedIn: 'root' })
export class RegistryService {
  private users: Array<User> | null;

  constructor() {
    this.users = JSON.parse(localStorage.getItem('users'));
  }

  private updateStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  isEmailUnique(email: string): boolean {
    console.log(`isEmailUnique: this.users `, this.users);

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

    const u = localStorage.getItem('users');
    console.log(`Storage users `, u);
  }
}
