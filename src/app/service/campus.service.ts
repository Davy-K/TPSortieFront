import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  constructor(private httpClient : HttpClient) {}

  getCampus() : Observable<Campus[]>{
    return this.httpClient.get<Campus[]>("https://127.0.0.1:8000/api/campuses.json")
  }
}

export interface Campus{
  id : number,
  name : string
}
