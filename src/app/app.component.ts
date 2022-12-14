import {Component} from '@angular/core';
import {BreakpointService} from "./service/breakpoint.service";
import {LoginService} from "./service/login.service";
import {Router} from "@angular/router"
import jwt_decode from 'jwt-decode';
import {BehaviorSubject, lastValueFrom, Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Store} from "./store/store";
import {User, UserService} from "./service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TPSortieFront';
  isLoggedIn: boolean = false;
  admin$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(public breakpointService: BreakpointService, public loginService: LoginService, private router: Router, private userService: UserService) {
    this.loginService.isLoggedIn$.subscribe(el => {
      this.isLoggedIn = el;
      let token = localStorage.getItem('access_token');
      if (token != null && token != "") {
        const tokenInfo = this.getDecodedAccessToken(token);
        let role = tokenInfo.roles[0];
        if (role === "ROLE_ADMINISTRATEUR") {
          this.admin$.next(true);
        }
      } else {
        this.admin$.next(false);
      }
    })

  }

  navLinks = [
    {
      label: "Accueil",
      link: "/home",
      isAdmin: false
    },
    {
      label: "Mon Profil",
      link: "/monProfil",
      isAdmin: false
    },
    {
      label: "Liste des Utilisateurs",
      link: "/listUser",
      isAdmin: true
    }
  ]

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
