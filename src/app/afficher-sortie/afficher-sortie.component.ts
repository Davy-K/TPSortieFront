import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";
import {ActivatedRoute} from "@angular/router";
import {Sortie, SortieService} from "../service/sortie.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-afficher-sortie',
  templateUrl: './afficher-sortie.component.html',
  styleUrls: ['./afficher-sortie.component.css']
})
export class AfficherSortieComponent implements OnInit {

  sortie$!:Observable<Sortie>
  id:string=""
  constructor(public loginService: LoginService,private route: ActivatedRoute,private sortieService:SortieService) { }

  ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.id = params['id'];
    this.sortie$ = this.sortieService.getUneSortie(this.id);
  });

  }

}
