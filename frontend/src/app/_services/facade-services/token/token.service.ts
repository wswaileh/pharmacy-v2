import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private token: string;
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  setToken(token: string, expiresIn: number) {
    this.storage.setItem('token', token);
    if (expiresIn) {
      this.storage.setItem('expires', expiresIn + '');
    }
    this.token = token;
  }

  getToken(): string {
    if (!this.token && this.storage.getItem('token')) {
      this.token = this.storage.getItem('token');
    }
    return this.token;
  }

  hasToken(): boolean {
    return Boolean(
      this.token || (!this.token && this.storage.getItem('token'))
    );
  }

  removeToken() {
    this.storage.removeItem('token');
    this.storage.removeItem('expires');
    this.token = null;
  }

  /*
        Checkes, whether there is a valid access_token.
    */
  public hasValidAccessToken(): boolean {
    if (this.hasToken()) {
      const expiresAt = this.storage.getItem('expires');
      const now = new Date();
      if (
        !expiresAt ||
        (expiresAt && parseInt(expiresAt, 10) < now.getTime())
      ) {
        return false;
      }
      return true;
    }
    return false;
  }
}
