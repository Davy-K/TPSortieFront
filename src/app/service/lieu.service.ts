import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Campus} from "./campus.service";

@Injectable({
  providedIn: 'root'
})
export class LieuService {

  constructor(private httpClient : HttpClient) { }

  getLieu() : Observable<Lieu[]>{
    return this.httpClient.get<Lieu[]>("https://127.0.0.1:8000/api/places.json")
  }
}

export interface Lieu{
  id:number,
  name:string;
}
