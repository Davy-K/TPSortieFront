import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";

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

  constructor(private router: Router,public loginService: LoginService) {

  }

  ngOnInit(): void {
  }

}
