import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const USER_EMAIL = 'email';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any, email: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user.status);
    window.sessionStorage.setItem(USER_EMAIL, email);
  }

  public getUser(): any {
    const userName = window.sessionStorage.getItem(USER_KEY);
    const userEmail = window.sessionStorage.getItem(USER_EMAIL);
    let user = {
      userName,
    };

    if (user) {
      return user;
    }

    return {};
  }
}
