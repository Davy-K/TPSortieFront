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
  username!:string;
  //nbInscrit: number[] = [];
  user$!: Observable<User>;
  listCampus: string[] = [];
  date = new Date();
  listSortie: string[] = [];
  userCo!:User;
  campusSelect: Campus | null = null;
  organisateur$!: Observable<User[]>;
  campuses$!:Observable<Campus[]> ;
  usernameId: string ="";
  displayedColumns: string[] = ['name', 'dateSortie', 'cloture', 'places', 'state', 'inscrits', 'organisator', 'action'];
  //dataSource = ELEMENT_DATA;
  filtreForm = new FormGroup({
    campus: new FormControl<Campus | null>(null),
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
    let userId = sessionStorage.getItem('userId')
    //console.log(this.store.get(['user','id']))
    this.user$ = this.userService.getUserById(userId!).pipe(tap(user=>{
        console.log(user.name)
        this.username = user.name
    }
    ))

    this.sorties$ = this.sortieService.getSorties()
    /*tap((sortieList:Sortie[]) =>{

  }
  )*/

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

  inscrit(mesUser:User[]) :boolean{
    let userId = sessionStorage.getItem('userId');
    let present: boolean= false;
    if (mesUser.find(el=> el.id.toString() == userId)){
      present = true;
    }
    return present;
  }
  cgmntEtat(etat:boolean,maSortie:Sortie) :void{
    //maSortie.registereds.push()
    //let monUser = "api/users/"+unUser.id;
    if(!etat){
    //(maSortie.registereds as string[]).push("api/users/"+sessionStorage.getItem('userId'));
    this.sorties$ = this.sortieService.updateSortie(maSortie);
    }else{
      let monUser!:User[]
      monUser!=(maSortie.registereds as User[]).filter(el=> el.id.toString() != sessionStorage.getItem('userId'))
      maSortie.registereds = monUser;
      this.sorties$ = this.sortieService.updateSortie(maSortie);
    }
  }

  onFormSubmit(){
    //let campus= this.filtreForm.value.campus;
    this.campusSelect = this.filtreForm.controls.campus.value;
    let name = this.filtreForm.value.name;
    let dateD = this.filtreForm.value.dateD;
    let dateF =this.filtreForm.value.dateF;
    /*if(this.campusSelect != null) {
      if(this.campusSelect.campusOutings.length>0){
        for(let i =0;i<this.campusSelect.campusOutings.length;i++){
          this.sorties$ = this.sortieService.getSortieFiltre(this.campusSelect.campusOutings[i])
        }
      }
      else{
        this.sorties$= this.tmpSorties$;
      }
      //this.campusSelect.campusOutings.forEach(uneSortie => )
      )
    }*/
     //console.log(campus);
    // console.log(name);
    // console.log(dateD);
    // console.log(dateF);
  }
}
