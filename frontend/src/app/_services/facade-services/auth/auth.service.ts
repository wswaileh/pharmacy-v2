import { Injectable } from '@angular/core';
import { LoginService } from '../../http-services/login/login.service';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { TokenService } from '../token/token.service';

export type CurrentUserType = {
  name: string;
  role: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentLoggedInUser: CurrentUserType;

  currentUser$ = new BehaviorSubject(null);

  constructor(
    public loginService: LoginService,
    public tokenService: TokenService
  ) {
    if (!this.currentLoggedInUser && this.tokenService.getToken()) {
      this.loginService
        .getUserInfo()
        .pipe(take(1))
        .subscribe(({ name, role }) => {
          this.currentLoggedInUser = { name, role };
          this.currentUser$.next({ ...this.currentLoggedInUser });
        });
    }
  }

  login(username: string, password: string) {
    return this.loginService.login(username, password).pipe(
      tap(({ name, role, token, expires }) => {
        this.tokenService.setToken(token, expires);
        this.currentLoggedInUser = { name, role };
        this.currentUser$.next({ ...this.currentLoggedInUser });
      })
    );
  }

  public logout() {
    this.tokenService.removeToken();
  }

  public isAuthenticated(): boolean {
    return this.tokenService.hasValidAccessToken();
  }

  public getCurrentUser$(): Observable<CurrentUserType> {
    return this.currentUser$.asObservable();
  }
}
