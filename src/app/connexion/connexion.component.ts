import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
hide = true;
  authForm = new FormGroup({
    login : new FormControl("", [Validators.required]),
    password : new FormControl("", [Validators.required]),
    rememberMe : new FormControl(false)
  })

  constructor(private cookieService:CookieService) {
    if(this.cookieService.get("login")!=null){
      this.authForm.controls.login.setValue(this.cookieService.get('login'));
    }
  }

  ngOnInit(): void {
  }

  onFormSubmit(){
    let login = this.authForm.controls.login.value;
    let password = this.authForm.controls.password.value;
    let rememberMe = this.authForm.controls.rememberMe.value;

    if(rememberMe){
      if (login!=null) {
        this.cookieService.set("login", login);
      }
    }
  }
}
