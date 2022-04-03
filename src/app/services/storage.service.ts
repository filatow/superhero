import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  getItem(name: string) {
    return JSON.parse(localStorage.getItem(name));
  }

  removeItem(name: string) {
    localStorage.removeItem(name);
  }
}
