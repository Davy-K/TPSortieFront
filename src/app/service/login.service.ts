import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router"
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient,private router: Router,private cookieService: CookieService) {
  }

  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(!!localStorage.getItem("access_token"));

  get isLoggedIn$(): BehaviorSubject<boolean> {
    return this.loggedIn$;
  }

  getUser(email: string, password: string,rememberMe:boolean) {

    const httpOptions ={
      headers: new HttpHeaders(({
        'Content-Type': 'application/json'
      }))
    }

    this.httpClient.post<{token: string}>("https://127.0.0.1:8000/api/login_check", {username: email, password: password},httpOptions).subscribe(el=>{
      if(el != null){
        this.loggedIn$.next(true);
        localStorage.setItem("access_token",el.token);

        if(rememberMe){
          this.cookieService.set('email',email);
        }
        this.router.navigate(['/profile']);
      }
    });

  }
  disconnect(){
    localStorage.removeItem("access_token");
    this.router.navigate(['/']);
    this.loggedIn$.next(false);
  }
}
