import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Sortie, SortieService} from "../service/sortie.service";
import {User, UserService} from "../service/user.service";
import {ConditionService} from "../service/condition.service";
import {Campus, CampusService} from "../service/campus.service";


/*const ELEMENT_DATA : Sortie = [

];*/

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  sorties$!: Observable<Sortie[]>;
  //nbInscrit: number[] = [];
  listCampus: string[] = [];
  date = new Date();
  organisateur$!: Observable<User[]>;
  campus$!:Observable<Campus[]> ;
  displayedColumns: string[] = ['name', 'dateSortie', 'cloture', 'places', 'state', 'inscrits', 'organisator', 'action'];
  //dataSource = ELEMENT_DATA;


  constructor(private campusService : CampusService, private conditionService: ConditionService,private sortieService: SortieService, private userService: UserService, private router: Router, public loginService: LoginService, private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    console.log(this.listCampus)
    this.campus$ = this.campusService.getCampus().pipe(
      tap((campusList:Campus[]) =>{
        campusList.forEach(el =>{
          //console.log(el.name)
          this.listCampus.push(el.name)
        })
      })
    )
    console.log(this.listCampus)
    this.sorties$ = this.sortieService.getSorties().pipe(
      tap((sortieList) => {
        sortieList.forEach(el => {
          this.userService.getUserHome(el.organizer as string).subscribe(
            resp => {
              el.organizer = resp
            })
          this.conditionService.getCondition(el.outingCondition as string).subscribe(
            resp => {
              el.outingCondition = resp
            })
          //this.nbInscrit.push(el.registereds.length)
        })
      }))
  }
}
