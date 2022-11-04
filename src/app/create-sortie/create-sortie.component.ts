import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ville, VilleService} from "../service/ville.service";
import {Observable} from "rxjs";
import {Campus, CampusService} from "../service/campus.service";
import {CreationSortie, Sortie, SortieService} from "../service/sortie.service";
import {CookieService} from "ngx-cookie-service";
import { MatInputModule } from '@angular/material/input';
import * as Console from "console";
import * as moment from "moment";
import {Lieu, LieuService} from "../service/lieu.service";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-create-sortie',
  templateUrl: './create-sortie.component.html',
  styleUrls: ['./create-sortie.component.css']
})
export class CreateSortieComponent implements OnInit {


  //listLieu = ["Gaumont","Jardins des plantes","La Beaujoire"];
  //listVille = ["Nantes"];

  registerForm = new FormGroup({
    name: new FormControl("",[Validators.required]),
    ville: new FormControl("",[Validators.required]),
    lieu: new FormControl("",[Validators.required]),
    cp: new FormControl("",[Validators.required]),
    rue: new FormControl("",[Validators.required]),
    commentaire: new FormControl(""),
    duree: new FormControl(0,[Validators.required]),
    nbPlace: new FormControl("",[Validators.required]),
    latitude: new FormControl(0,[Validators.required]),
    longitude: new FormControl(0,[Validators.required]),
    dateSortie: new FormControl(new Date(),[Validators.required]),
    dateLimite: new FormControl(new Date(),[Validators.required]),
    campus : new FormControl("",[Validators.required])
  })
  villes$! : Observable<Ville[]>;
  campuses$!: Observable<Campus[]>;
  maSortie!: CreationSortie;
  maSortieRegister!: CreationSortie;
  lieus$!: Observable<Lieu[]>;

  constructor(private lieuService : LieuService,public loginService: LoginService, private sortieService: SortieService,private cookieService: CookieService,private campusService: CampusService, private villeService:VilleService, httpClient:HttpClient, private router: Router) { }
  public error: string = "";

  ngOnInit(): void {
    this.villes$ = this.villeService.getVilles();
    this.campuses$ = this.campusService.getCampus();
    this.lieus$ = this.lieuService.getLieu();
  }



  onFormSubmit() {
    //console.log(this.registerForm.controls.dateSortie.value?.toLocaleLowerCase());
    //console.log(moment(this.registerForm.controls.dateLimite.value?.toString()).format('YYYY-MM-DD'));

    //console.log( this.registerForm.controls.ville.value);

    /*if(this.registerForm.valid)
    {*/
    let name = this.registerForm.controls.name.value;
    let ville = this.registerForm.controls.ville.value;
    let lieu = this.registerForm.controls.lieu.value;
    let cp= this.registerForm.controls.cp.value;
    let rue= this.registerForm.controls.rue.value;
    let commentaires= this.registerForm.controls.commentaire.value;
    let duree= this.registerForm.controls.duree.value;
    let nbPlace= this.registerForm.controls.nbPlace.value;
    let latitude= this.registerForm.controls.latitude.value;
    let longitude= this.registerForm.controls.longitude.value;
    let campus = this.registerForm.controls.campus.value;
    let dateSortie = this.registerForm.controls.dateSortie.value;
    let dateLimite = this.registerForm.controls.dateLimite.value;
    let nbMax = this.registerForm.controls.nbPlace.value;
    console.log(campus);
    if(name!=null && campus!=null && duree!=null && commentaires!=null && lieu !=null ) {
      this.maSortie = {
        name : name,
        campus : "/api/campuses/" + campus.toString(),
        outingCondition : "/api/conditions/2",
        organizer : "api/users/" + sessionStorage.getItem('userId'),
        duration : Number(duree),
        dateHourStart : moment(dateSortie?.toString()).format('YYYY-MM-DD'),
        dateLimitRegistration : moment(dateLimite?.toString()).format('YYYY-MM-DD'),
        infosOuting: commentaires,
        place : "/api/places/" + lieu,
        nbRegistrationMax : Number(nbMax)
      }

      this.sortieService.addSortie(this.maSortie);
      this.router.navigate(["/home"])
    }

      //console.log("tttt")
 //   }
  }


  register(){
    let name = this.registerForm.controls.name.value;
    let ville = this.registerForm.controls.ville.value;
    let lieu = this.registerForm.controls.lieu.value;
    let cp= this.registerForm.controls.cp.value;
    let rue= this.registerForm.controls.rue.value;
    let commentaires= this.registerForm.controls.commentaire.value;
    let duree= this.registerForm.controls.duree.value;
    let nbPlace= this.registerForm.controls.nbPlace.value;
    let latitude= this.registerForm.controls.latitude.value;
    let longitude= this.registerForm.controls.longitude.value;
    let campus = this.registerForm.controls.campus.value;
    let dateSortie = this.registerForm.controls.dateSortie.value;
    let dateLimite = this.registerForm.controls.dateLimite.value;
    let nbMax = this.registerForm.controls.nbPlace.value;
    console.log(campus);
    if(name!=null && campus!=null && duree!=null && commentaires!=null && lieu !=null ) {
      this.maSortieRegister = {
        name : name,
        campus : "/api/campuses/" + campus.toString(),
        outingCondition : "/api/conditions/1",
        organizer : "api/users/" + sessionStorage.getItem('userId'),
        duration : Number(duree),
        dateHourStart : moment(dateSortie?.toString()).format('YYYY-MM-DD'),
        dateLimitRegistration : moment(dateLimite?.toString()).format('YYYY-MM-DD'),
        infosOuting: commentaires,
        place : "/api/places/" + lieu,
        nbRegistrationMax : Number(nbMax)
      }

      this.sortieService.addSortie(this.maSortieRegister);
      this.router.navigate(["/home"])
    }
  }

  annuler(){

  }

  change(){

  }
}
