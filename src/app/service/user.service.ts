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
}

