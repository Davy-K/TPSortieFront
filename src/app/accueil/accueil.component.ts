import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";

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
  listCampus = [];
  date = new Date();
  displayedColumns: string[] = ['name', 'dateSortie', 'cloture', 'places','state','inscrits','organisator','action'];
  dataSource = ELEMENT_DATA;



  constructor() { }

  ngOnInit(): void {
  }

}
