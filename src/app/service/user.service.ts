import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Campus, CampusService} from "./campus.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient, private  campusService : CampusService) { }

  getUsers() : Observable<User[]>{
    return this.httpClient.get<User[]>("https://127.0.0.1:8000/api/users.json")
  }

  updateUser(user:User): Observable<User[]>{

    this.httpClient.put("https://127.0.0.1:8000/api/users/"+user.id,user).subscribe();
    return this.getUsers();
  }
  updateUserCampusURI(user:UserCampusURI): Observable<User>{
    this.httpClient.put("https://127.0.0.1:8000/api/users/"+user.id,user).subscribe();
    return this.getUserById(user.id)
  }

  getUserById(id:string) : Observable<User>{
    return this.httpClient.get<User>("https://127.0.0.1:8000/api/users/"+id);
  }

  getUserByPseudo(pseudo:string) : Observable<User>{
    return this.httpClient.get<User>("https://127.0.0.1:8000/api/search/userByPseudo?pseudo="+pseudo);
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

  getUserHome(user:string): Observable<User>{
    return this.httpClient.get<User>("https://127.0.0.1:8000"+user);
    //return this.getUsers();
  }

  getSortieUser(id:string):Observable<User>{
    return this.httpClient.get<User>("https://127.0.0.1:8000/api/users/"+id);
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
  campus: Campus,
  userIdentifier: string,
  outings: string,
  outingsOrganizer: string
}

export interface UserCampusURI{
  id: string,
  email: string,
  //password?: string,
  pseudo: string,
  name: string,
  firstname: string,
  phone: string,
  campus: string,
}
