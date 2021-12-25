import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../shared/constants/api.constants';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const AUTH_API = ApiConstants.AUTH_SVC_URL;
const USER_API = ApiConstants.USR_SVC_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
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

  public getLoggedInProfile() {
    const token = window.sessionStorage.getItem('token') || '';
    return this.jwtHelper.decodeToken(token);
  }

  // refreshToken(){
  //   return this.httpService.post(`${this.renewbaseurl}`
  //   , {
  //     headers: new HttpHeaders(
  //         {
  //           Authorization:this.getToken(),
  //           'Content-Type': 'application/json',
  //         }
  //       )
  //   }
  //   );
  // }
}
