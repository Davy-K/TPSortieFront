import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";
import {User, UserCampusURI, UserService} from "../service/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Campus, CampusService} from "../service/campus.service";
import {Observable, tap} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Store} from "../store/store";

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css']
})
export class MonProfilComponent implements OnInit {
  hide = true;
  userInfoForm = new FormGroup({
    pseudo: new FormControl("",[Validators.required]),
    prenom: new FormControl("",[Validators.required]),
    nom: new FormControl("",[Validators.required]),
    telephone: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required ,Validators.email]),
    password: new FormControl(""),
    passwordConfirm: new FormControl(""),
    campus: new FormControl("",[Validators.required]),
  })
  userURI! : UserCampusURI;
  selectedValue!: number;
  user$!: Observable<User>;
  campus$!:Observable<Campus[]> ;
  store!:Store;
  constructor(private cookieService: CookieService,private router: Router, public loginService: LoginService,public userService: UserService, private  campusService : CampusService) {

  }

  ngOnInit(): void {
    this.store = Store.getInstance()
    this.campus$ = this.campusService.getCampus();
    console.log(this.store.get(['user', 'id']));
    this.user$ = this.userService.getUserById(this.store.get(['user','id'])).pipe(tap(user=>{
      this.userInfoForm.controls.pseudo.setValue(user.pseudo)
      this.userInfoForm.controls.prenom.setValue(user.firstname)
      this.userInfoForm.controls.nom.setValue(user.name)
      this.userInfoForm.controls.telephone.setValue(user.phone)
      this.userInfoForm.controls.email.setValue(user.email)
      this.userInfoForm.controls.campus.setValue(user.campus.name)
      this.selectedValue = user.campus.id;
    }))
  }


  onFormSubmit(user:User){

    let pseudo = this.userInfoForm.controls.pseudo.value
    let prenom = this.userInfoForm.controls.prenom.value
    let nom = this.userInfoForm.controls.nom.value
    let telephone = this.userInfoForm.controls.telephone.value
    let email = this.userInfoForm.controls.email.value
    let campus = this.userInfoForm.controls.campus.value

    if(pseudo != null && prenom != null && nom != null && telephone != null && email != null && campus != null){

      this.userURI={
        id: ""+user.id,
        pseudo: pseudo,
        firstname: prenom,
        name: nom,
        phone: telephone,
        email: email,
        campus: "api/campuses/"+campus
      }
      this.user$ = this.userService.updateUserCampusURI(this.userURI)
    }
  }
}
