import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from './login.types';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CurrentUserType } from '../../facade-services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(public httpClient: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const url = environment.backendUrl + '/api/v0/auth/login';
    return this.httpClient.post<LoginResponse>(url, { username, password });
  }

  getUserInfo(): Observable<CurrentUserType> {
    const url = environment.backendUrl + '/api/v0/auth/user-details';
    return this.httpClient.get<CurrentUserType>(url);
  }
}
