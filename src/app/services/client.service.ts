import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  // private baseurl = 'https://testapi.aicollectapp.com/clientmanagementservice/'
  private baseurl = 'http://164.90.214.25:4002/clientManagementService/';
  constructor(private httpService: HttpClient) {}
  //get client
  public getClient(id: number): Observable<User> {
    return this.httpService.get<User>(`http://localhost:3000/user/${id}`).pipe(
      map((data) => new User().deserialize(data)),
      catchError(() => throwError('User not found'))
    );
  }

  //add client

  addClient(clientdata: any) {
    return this.httpService.post(`${this.baseurl}fetchAllClients`, clientdata);
  }

  //search client data
  public searchClients(searchparam: any) {
    return this.httpService.post(`${this.baseurl}fetchAllClients`, {
      where: searchparam,
    });
  }
  //fetch all clients
  public fetchAllClients() {
    return this.httpService.post(`${this.baseurl}fetchAllClients`, {});
  }

  public getAllClients() {
    return this.httpService.post(`${this.baseurl}getAllClients`, {});
  }
  //delete client

  public deleteAClient(id: any) {
    return this.httpService.post(`${this.baseurl}deleteClient`, {
      clientid: id,
    });
  }
  //updates client profile
  public updateClientProfile(clientprofile: any) {
    return this.httpService.post(`${this.baseurl}editClient`, clientprofile);
  }
  //add new client data
  public AddNewClient(clientdata: any) {
    return this.httpService.post(`${this.baseurl}addNewClient`, clientdata);
  }
  //deactivate client
  public DeactivateClient(id: any) {
    return this.httpService.post(`${this.baseurl}deactivateClient`, {
      clientid: id,
    });
  }

  //reactovate client
  public ReactivateClient(id: any) {
    return this.httpService.post(`${this.baseurl}reactivateClient`, {
      clientid: id,
    });
  }
  //  fetches client profile
  public ClientProfile() {
    return this.httpService.post(`${this.baseurl}getClientProfile`, {});
  }
}
