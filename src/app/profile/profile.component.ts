import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public login = "Login";
  public prenom = "Prenom";
  public nom = "Nom";
  public telephone = "Telephone";
  public email = "Email";
  public campus = "Campus";

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

}
