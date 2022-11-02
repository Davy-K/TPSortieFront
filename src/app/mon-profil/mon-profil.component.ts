import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";
import {User, UserService} from "../service/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Campus, CampusService} from "../service/campus.service";
import {Observable, tap} from "rxjs";
import {CookieService} from "ngx-cookie-service";

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
  listCampus: Campus[] =[];
  selectedValue: string = "";
  user$!: Observable<User>;
  constructor(private cookieService: CookieService,private router: Router, public loginService: LoginService,public userService: UserService, private  campusService : CampusService) { }

  ngOnInit(): void {

    this.user$ = this.userService.getUserById(this.cookieService.get('id_user')).pipe(tap(user=>{
      this.userInfoForm.controls.pseudo.setValue(user.pseudo)
      this.userInfoForm.controls.prenom.setValue(user.firstname)
      this.userInfoForm.controls.nom.setValue(user.name)
      this.userInfoForm.controls.telephone.setValue(user.phone)
      this.userInfoForm.controls.email.setValue(user.email)

    }))
    //this.listCampus.push();
  }


  onFormSubmit(){

  }
}
