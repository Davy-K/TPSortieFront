import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  constructor(private httpClient: HttpClient) { }

  getCondition(lien: string): Observable<Condition>{
    return this.httpClient.get<Condition>("https://127.0.0.1:8000"+lien)
  }
}
export interface Condition {
  id: number,
  name: string
}
