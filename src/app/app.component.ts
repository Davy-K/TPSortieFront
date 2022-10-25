import { Component } from '@angular/core';
import {BreakpointService} from "./service/breakpoint.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TPSortieFront';

  constructor(public breakpointService:BreakpointService) {
  }
  navLinks = [
    {
      label : "Se Connecter",
      link:"/"
    },
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
