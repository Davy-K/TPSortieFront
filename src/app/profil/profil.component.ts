import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  public login = "Login";
  public prenom = "Prenom";
  public nom = "Nom";
  public telephone = "Telephone";
  public email = "Email";
  public campus = "Campus";

  constructor() {

  }

  ngOnInit(): void {
  }

}
