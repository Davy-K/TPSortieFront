import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user.service";
import {Condition} from "./condition.service";

@Injectable({
  providedIn: 'root'
})
export class SortieService {

  constructor(private httpClient : HttpClient) { }

  getSorties() : Observable<Sortie[]>{
    return this.httpClient.get<Sortie[]>("https://127.0.0.1:8000/api/outings.json")
  }
}

export interface Sortie{
  id : number,
  name : string,
  dateHourStart : Date,
  duration : number,
  dateLimitRegistration : Date,
  nbRegistrationMax : number,
  infosOuting : string,
  organizer	: string | User,
  registereds	: string[] | User[],
  campus : string,
  place	: string,
  outingCondition : string | Condition
}

