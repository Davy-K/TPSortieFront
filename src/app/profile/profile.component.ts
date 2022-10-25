import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public login = "TestLogin";
  public prenom = "TestPrenom";
  public nom = "TestNom";
  public telephone = "TestTelephone";
  public email = "TestEmail";
  public campus = "TestCampus";

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

}
