import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user.service";
import {Condition} from "./condition.service";
import {Campus} from "./campus.service";
import {Place} from "./place.service";

@Injectable({
  providedIn: 'root'
})
export class SortieService {

  constructor(private httpClient : HttpClient) { }

  getSorties() : Observable<Sortie[]>{
    return this.httpClient.get<Sortie[]>("https://127.0.0.1:8000/api/outings.json")
  }

  addSortie(sortie:CreationSortie): void{
    this.httpClient.post<Sortie>("https://127.0.0.1:8000/api/outings",sortie).subscribe();
  }

  updateSortie(sortie:Sortie):Observable<Sortie[]>{
    this.httpClient.put("https://127.0.0.1:8000/api/outings/"+sortie.id,sortie).subscribe();
    return this.getSorties();
  }

  getUneSortie(id:string):Observable<Sortie>{
    return this.httpClient.get<Sortie>("https://127.0.0.1:8000/api/outings/"+id)
  }
  getSortieFiltre(id:string):Observable<Sortie>{
    return this.httpClient.get<Sortie>("https://127.0.0.1:8000/"+id)
  }
}

export interface Sortie{
  id : number,
  name : string,
  dateHourStart : string,
  duration : number,
  dateLimitRegistration : string,
  nbRegistrationMax : number,
  infosOuting : string,
  organizer	: string | User,
  registereds	:  User[],
  campus : Campus,
  place	: Place,
  outingCondition : string | Condition,
  longitude : number;
  latitude : number;
  commentaire:string;
  adresse:string;
  rue:string;
  lieu:string;
  cp:string;
}

export interface CreationSortie{
  name : string,
  dateHourStart : string,
  duration : number,
  dateLimitRegistration : string,
  nbRegistrationMax : number,
  infosOuting : string,
  organizer	: string,
  campus : string,
  place	: string,
  outingCondition : string,
}
