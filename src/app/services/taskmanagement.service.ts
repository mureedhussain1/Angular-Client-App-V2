import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskmanagementService {
  // private baseurl = 'https://testapi.aicollectapp.com/taskmanagementservice/'
  // private collectionbaseurl = 'https://testapi.aicollectapp.com/answerCollectionService/'
  private baseurl = 'http://164.90.214.25:4006/taskManagementService/';
  private collectionbaseurl =
    'http://164.90.214.25:4006/answerCollectionService/';

  constructor(private httpService: HttpClient) {}

  public getAllProjectProfiles(data: { projectid: any }) {
    return this.httpService.post(
      `${this.collectionbaseurl}getAllProjectProfiles`,
      {}
    );
  }

  public saveNewTask(data: any) {
    delete data.action;
    return this.httpService.post(`${this.baseurl}saveNewTask`, data);
  }

  public getAllProfiles() {
    return this.httpService.post(`${this.baseurl}getAllSavedProfiles`, {});
  }
  public getProfileDetails(id: any) {
    return this.httpService.post(`${this.baseurl}getProfileDetails`, {
      profileid: id,
    });
  }

  public searchprofiles(searchparam: any) {
    return this.httpService.post(`${this.baseurl}getAllSavedProfiles`, {
      where: searchparam,
    });
  }

  public getAllTasks(searchparam: any) {
    return this.httpService.post(`${this.baseurl}getAllGroupedTasks`, {
      where: searchparam,
    });
  }

  public saveNewInspTask(data: any) {
    delete data.action;
    data.assignedto.forEach((element: any) => {
      element.profiles = element.profiles.map((profile: any) => profile._id);
    });
    console.log(data);
    return this.httpService.post(`${this.baseurl}saveNewInsTask`, data);
  }

  public deleteTask(data: any) {
    return this.httpService.post(`${this.baseurl}cancelATasks`, { data });
  }

  public gettaskProfile(where: any) {
    return this.httpService.post(`${this.baseurl}getTaskProfile`, { where });
  }
}
