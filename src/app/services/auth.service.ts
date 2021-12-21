import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../shared/constants/api.constants';
import { Router } from '@angular/router';

const AUTH_API = ApiConstants.AUTH_SVC_URL;
const USER_API = ApiConstants.USR_SVC_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/clientLogin',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(
      USER_API + '/requestPasswordResset',
      {
        email,
      },
      httpOptions
    );
  }

  public logout() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
