import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private httpClient : HttpClient) { }
}

export interface Place{
  id:number,
  latitude:number,
  longitude:number,
  name:string,
  street:string,
}
