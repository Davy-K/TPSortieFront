import { Component } from '@angular/core';
import {BreakpointService} from "./service/breakpoint.service";
import {LoginService} from "./service/login.service";
import {Router} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TPSortieFront';
  isLoggedIn : boolean = false;
  constructor(public breakpointService:BreakpointService, public loginService:LoginService,private router: Router) {
    this.loginService.isLoggedIn$.subscribe(el=>this.isLoggedIn = el)
  }
  navLinks = [
    {
      label : "Profile",
      link:"/profile"
    },
    {
      label : "Création Sortie",
      link:"/sortieCreate"
    }
  ]


}
