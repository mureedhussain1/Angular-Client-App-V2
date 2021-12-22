import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientprojectService {
  // private baseurl = 'https://testapi.aicollectapp.com/projectmanagementservice/'
  // private clientbaseurl = 'https://testapi.aicollectapp.com/adminprojectmanagementservice/'
  private baseurl = 'http://164.90.214.25:4005/projectmanagementservice/';
  private clientbaseurl = 'http://164.90.214.25:4005/mainManagementService/';
  // private adminbaseurl = 'https://testapi.aicollectapp.com/adminprojectmanagementservice/'

  constructor(private httpService: HttpClient) {}
  //get all projects
  public getAllProjects() {
    return this.httpService.post(`${this.baseurl}fetchAllProjects`, {});
  }
  //  get all sectors
  public getSectors() {
    return this.httpService.post(
      `${this.clientbaseurl}clientGetAllSectors`,
      {}
    );
  }
  //get all project team
  public getProjectTeam(where: any) {
    return this.httpService.post(`${this.baseurl}getAllProjectTeam`, where);
  }
  //get all project questionaires
  public getAllProjectQuestionairesNP(where: any) {
    return this.httpService.post(
      `${this.baseurl}getAllProjectQuestionairesNP`,
      where
    );
  }

  //search  projects
  public searchProjects(searchparam: any) {
    return this.httpService.post(`${this.baseurl}fetchAllProjects`, {
      where: searchparam,
    });
  }
  //adds new project
  public AddNewProject(project: any) {
    return this.httpService.post(`${this.baseurl}saveNewProject`, project);
  }

  // edits project
  public EditProject(id: any) {
    return this.httpService.post(`${this.baseurl}editProject`, {
      Projectid: id,
    });
  }
  //gets questionaire templates
  public getQuestionTemplates() {
    return this.httpService.post(`${this.baseurl}getquestionaretemplates`, {});
  }

  // delets project
  public deleteProject(id: any) {
    return this.httpService.post(`${this.baseurl}deleteProject`, {
      projectid: id,
    });
  }
  //adds member to project
  public addMember(memberdata: any) {
    return this.httpService.post(`${this.baseurl}addTeamMember`, memberdata);
  }
  // gets prject members
  public getTeamMembers(id: any) {
    return this.httpService.post(`${this.baseurl}getProjectTeam`, {
      projectid: id,
    });
  }
  //deletes mber
  public deleteTeamMember(id: any, projectid: any) {
    return this.httpService.post(`${this.baseurl}removeUserFromProjectTeam`, {
      userid: id,
      projectid: projectid,
    });
  }
  //gets project profile
  public getProjectProfile(id: any) {
    return this.httpService.post(`${this.baseurl}getProjectProfile`, {
      projectid: id,
    });
  }
  //gets project module
  getProjectModules(id: any) {
    return this.httpService.post(`${this.baseurl}getProjectProfile`, {
      projectid: id,
    });
  }
  //save new template
  public saveNewTemplate(data: {
    title: any;
    description: any;
    projectid: any;
    moduleid: any;
    formjson: any;
  }) {
    return this.httpService.post(`${this.baseurl}saveModuleQuestionaire`, data);
  }

  //gets module questionaires
  public getModuleQuestionairred(projectid: any, moduleid: any) {
    return this.httpService.post(`${this.baseurl}getAllProjectQuestionaires`, {
      where: { projectid: projectid, moduleid: moduleid },
    });
  }
  //gets mandatory questions
  public madatoryTemplates(moduleid: any, projectid: any) {
    return this.httpService.post(
      `${this.baseurl}getMandatoryProjectQuestionaires`,
      { where: { moduleid: moduleid, projectid: projectid } }
    );
  }
}
