import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private userMgtUrl = 'https://testapi.aicollectapp.com/usermanagementservice/'
  private userMgtUrl = 'http://164.90.214.25:4001/userManagementService/';
  constructor(private httpService: HttpClient) {}

  public searchUsers(searchparam: any) {
    return this.httpService.post(`${this.userMgtUrl}fetchAllUsers`, {
      where: searchparam,
    });
  }

  public getAllUsers() {
    return this.httpService.post(`${this.userMgtUrl}fetchAllUsers`, {});
  }

  public addUser(userdata: any) {
    console.log(userdata);
    if (userdata?.role === 'Administrator') {
      userdata.role = 3;
    }
    if (userdata?.role === 'Super Administrator') {
      userdata.role = 2;
    }
    if (userdata?.role === 'Standard User') {
      userdata.role = 7;
    }
    if (userdata?.role === 'title') {
      userdata.role = 13;
    }
    return this.httpService.post(
      `${this.userMgtUrl}addNewAdministrator`,
      userdata
    );
  }

  public getSystemRoles() {
    return this.httpService.post(`${this.userMgtUrl}getSystemRoles`, {});
  }

  public deleteAUsers(id: any) {
    return this.httpService.post(`${this.userMgtUrl}deleteUser`, {
      userid: id,
    });
  }

  public updateUserProfile(userprofile: any) {
    return this.httpService.post(
      `${this.userMgtUrl}editUserProfile`,
      userprofile
    );
  }

  public disableUser(details: { userid: any; comment: any }) {
    return this.httpService.post(`${this.userMgtUrl}deactivateUser`, details);
  }

  public enableUser(id: any) {
    return this.httpService.post(`${this.userMgtUrl}reactivateUser`, {
      userid: id,
    });
  }

  public inviteUser(userdata: any) {
    return this.httpService.post(`${this.userMgtUrl}inviteUser`, userdata);
  }

  public completeAccountVerification(userdata: any) {
    return this.httpService.post(
      `${this.userMgtUrl}completeAccountVerification`,
      userdata
    );
  }

  public requestPasswordResset(email: string) {
    return this.httpService.post(
      `${this.userMgtUrl}requestPasswordResset`,
      email
    );
  }

  public registerUser(userdata: any) {
    return this.httpService.post(`${this.userMgtUrl}userSignUp`, userdata);
  }
}
