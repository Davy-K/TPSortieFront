import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  getUsers() : Observable<User[]>{
    return this.httpClient.get<User[]>("https://127.0.0.1:8000/api/users.json")
  }

  updateUser(user:User): Observable<User[]>{
    this.httpClient.put("https://127.0.0.1:8000/api/users/"+user.id,user).subscribe();
    return this.getUsers();
  }

  deleteUser(user:User): Observable<User[]>{
    if(user.outingsOrganizer == ""){
      this.httpClient.delete("https://127.0.0.1:8000/api/users/"+user.id).subscribe();
    }else{
      user.actif = false;
      this.updateUser(user);
    }
    return this.getUsers();
  }
}

export interface User{
  id: number,
  email: string,
  roles: string[],
  password: string,
  pseudo: string,
  name: string,
  firstname: string,
  phone: string,
  administrator: boolean,
  actif: boolean,
  campus: string,
  userIdentifier: string
  outingsOrganizer: string
}

