import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {ErrorStateMatcher} from '@angular/material/core';
import {LoginService} from "../service/login.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  hide = true;
  authForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    rememberMe: new FormControl(false)
  })

  matcher = new MyErrorStateMatcher();

  constructor(private cookieService: CookieService, public loginService: LoginService) {
    if (this.cookieService.get("email") != null) {
      this.authForm.controls.email.setValue(this.cookieService.get('email'));
    }
  }

  ngOnInit(): void {
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  onFormSubmit() {
    console.log("prout");
    let email = this.authForm.controls.email.value;
    let password = this.authForm.controls.password.value;
    let rememberMe = this.authForm.controls.rememberMe.value;
    console.log(email);
    console.log(password);
    console.log(rememberMe);
    if(rememberMe == false){
      this.cookieService.delete("email");
    }

    if (email != null && password != null && rememberMe != null) {
      this.loginService.getUser(email, password,rememberMe);
    }

  }
}
