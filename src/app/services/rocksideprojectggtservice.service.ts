import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RocksideProjectMgtService {
  // private baseurl = 'https://testapi.aicollectapp.com/adminprojectmanagementservice/'
  private baseurl = 'http://164.90.214.25:4005/mainManagementService/';
  constructor(private httpService: HttpClient) {}

  public getAllSectors() {
    return this.httpService.post(`${this.baseurl}getAllSectors`, {});
  }

  public searchSectors(searchparam: any) {
    return this.httpService.post(`${this.baseurl}getAllSectors`, {
      where: searchparam,
    });
  }

  // public fetchAllSectors(){
  //   return this.httpService.post(`${this.baseurl}fetchAllSectors`,{});
  // }

  public updateSectorProfile(Sectorprofile: any) {
    return this.httpService.post(`${this.baseurl}editSector`, Sectorprofile);
  }

  public AddNewSector(Sectordata: any) {
    return this.httpService.post(`${this.baseurl}saveSector`, Sectordata);
  }

  public addSectorModules(moduledata: any) {
    return this.httpService.post(`${this.baseurl}addSectorModules`, moduledata);
  }

  public DeactivateSector(id: any) {
    return this.httpService.post(`${this.baseurl}disableSector`, {
      sectorid: id,
    });
  }

  public ReactivateSector(id: any) {
    return this.httpService.post(`${this.baseurl}enableSector`, {
      sectorid: id,
    });
  }

  public getAllSectorModules(id: any) {
    return this.httpService.post(`${this.baseurl}fetchAllModules`, {
      where: { sectorid: id },
    });
  }

  public getModuleQuestionairred(sectorid: any) {
    return this.httpService.post(`${this.baseurl}getQuestionareTemplates`, {
      where: { sectorid },
    });
  }

  public deleteSectorModules(id: any) {
    return this.httpService.post(`${this.baseurl}deleteSectorModules`, {
      moduleid: id,
    });
  }

  public deleteQuestionairre(id: any) {
    return this.httpService.post(`${this.baseurl}deleteQuestionaireTemplate`, {
      questionaireid: id,
    });
  }
}
