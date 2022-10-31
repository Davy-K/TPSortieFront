import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  constructor(private httpClient: HttpClient) {
  }

  getVilles(): Observable<Ville[]> {
    return this.httpClient.get<Ville[]>("https://127.0.0.1:8000/api/cities.json")
  }
}
    export interface Ville{
  id : number,
  name : string,
  users : string[],
  campusOuting : string[]
}


