import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sortie, SortieService} from "../service/sortie.service";

export interface sortie {
  name: string;
  dateSortie: DatePipe;
  cloture: DatePipe;
  places: string;
  state: string;
  inscrits: boolean;
  organisator: string;
  action: string;
}
const ELEMENT_DATA : sortie[] = [

];

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  sorties$! : Observable<Sortie[]>;
  listCampus = [];
  date = new Date();
  displayedColumns: string[] = ['name', 'dateSortie', 'cloture', 'places','state','inscrits','organisator','action'];
  dataSource = ELEMENT_DATA;



  constructor(private sortieService: SortieService, private router: Router,public loginService: LoginService, private httpClient : HttpClient) {

  }
  ngOnInit(): void {
    this.sorties$ = this.sortieService.getSorties();
  }

}
