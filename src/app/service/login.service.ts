import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router"
import {CookieService} from "ngx-cookie-service";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient,private router: Router,private cookieService: CookieService) {
  }
  public error: string = '';
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(!!localStorage.getItem("access_token"));

  get isLoggedIn$(): BehaviorSubject<boolean> {
    return this.loggedIn$;
  }

  verifConnexion(): boolean{
    let verif;
    let retour;
    verif = localStorage.getItem("access_token");
    if(verif == null){
      retour = false;
    }else{
      retour = true;
    }
    return retour;
  }

  verifAdmin(): boolean{
    let retour;
    let role;
    let token = localStorage.getItem("access_token");
    if (token != null) {
      const tokenInfo = this.getDecodedAccessToken(token);
      role = tokenInfo.roles[0];
    }
    if(role == "ROLE_ADMINISTRATEUR"){
      retour = true;
    }else{
      retour = false;
    }
    return retour;
  }

  getUser(email: string, password: string,rememberMe:boolean) {
    this.error = '';
    const httpOptions ={
      headers: new HttpHeaders(({
        'Content-Type': 'application/json'
      }))
    }
    console.log("lolo");
    this.httpClient.post<{token: string}>("https://127.0.0.1:8000/api/login_check", {username: email, password: password},httpOptions).subscribe(el=>{
      if(el != null){
        localStorage.setItem("access_token",el.token);
        this.loggedIn$.next(true);

        if(rememberMe){
          this.cookieService.set('email',email);
        }
        this.router.navigate(['/home']);
      }
    },
    error => {
      this.error = error.message;
    }
    );
  }
  disconnect(){
    localStorage.removeItem("access_token");
    this.router.navigate(['/']);
    this.loggedIn$.next(false);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
