import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
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
