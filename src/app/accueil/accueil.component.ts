import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Sortie, SortieService} from "../service/sortie.service";
import {User, UserService} from "../service/user.service";
import {ConditionService} from "../service/condition.service";
import {Campus, CampusService} from "../service/campus.service";
import {CookieService} from "ngx-cookie-service";
import { Store } from '../store/store';


/*const ELEMENT_DATA : Sortie = [

];*/

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  sorties$!: Observable<Sortie[]>;
  tmpSorties$!: Observable<Sortie[]>;
  //nbInscrit: number[] = [];
  user$!: Observable<User>;
  listCampus: string[] = [];
  date = new Date();
  listSortie: string[] = [];
  organisateur$!: Observable<User[]>;
  campuses$!:Observable<Campus[]> ;
  usernameId: string ="";
  displayedColumns: string[] = ['name', 'dateSortie', 'cloture', 'places', 'state', 'inscrits', 'organisator', 'action'];
  //dataSource = ELEMENT_DATA;
  store!: Store;

  filtreForm = new FormGroup({
    campus: new FormControl(""),
    name: new FormControl(""),
    dateD: new FormControl(""),
    dateF : new FormControl(""),

  })

  constructor(private campusService : CampusService, private cookieService: CookieService, private conditionService: ConditionService,private sortieService: SortieService, private userService: UserService, private router: Router, public loginService: LoginService, private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    //this.username = this.cookieService.get("id_user")
    //console.log(this.listCampus)


    this.campuses$ = this.campusService.getCampus().pipe(
      tap((campusList:Campus[]) =>{
        campusList.forEach(el =>{

          this.listCampus.push(el.name)
        })
      })
    )
    //console.log(this.listCampus)
    this.store=Store.getInstance()
    this.user$ = this.userService.getSortieUser(this.store.get(['user','id'])).pipe(
      tap((monUser: User) => {
        this.listSortie.push(monUser.outings)
        this.listSortie.push(monUser.outingsOrganizer)
    }
    ))

    // this.sorties$ = this.sortieService.getSorties().pipe(
    //   tap((sortieList) => {
    //     sortieList.forEach(el => {
    //       this.userService.getUserHome(el.organizer as string).subscribe(
    //         resp => {
    //           el.organizer = resp
    //         })
    //       this.conditionService.getCondition(el.outingCondition as string).subscribe(
    //         resp => {
    //           el.outingCondition = resp
    //         })
    //       //this.nbInscrit.push(el.registereds.length)
    //     })
    //   }))
  }

  refreshTable(){
    this.tmpSorties$ = this.sorties$;

    /*if(){

    }*/
  }

  onFormSubmit(){
    let campus = this.filtreForm.value.campus;
    let name = this.filtreForm.value.name;
    let dateD = this.filtreForm.value.dateD;
    let dateF =this.filtreForm.value.dateF;

    if(campus != ""){
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
          })
        }))
    }
    // console.log(campus);
    // console.log(name);
    // console.log(dateD);
    // console.log(dateF);
  }
}
