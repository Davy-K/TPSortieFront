import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ville, VilleService} from "../service/ville.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-sortie',
  templateUrl: './create-sortie.component.html',
  styleUrls: ['./create-sortie.component.css']
})
export class CreateSortieComponent implements OnInit {


  listLieu = ["Gaumont","Jardins des plantes","La Beaujoire"];
  //listVille = ["Nantes"];
  registerForm = new FormGroup({
    name: new FormControl("",[Validators.required]),
    ville: new FormControl("",[Validators.required]),
    lieu: new FormControl("",[Validators.required]),
    cp: new FormControl("",[Validators.required]),
    rue: new FormControl("",[Validators.required]),
    commentaire: new FormControl(""),
    duree: new FormControl("",[Validators.required]),
    nbPlace: new FormControl("",[Validators.required]),
    latitude: new FormControl("",[Validators.required]),
    longitude: new FormControl("",[Validators.required]),
    dateSortie: new FormControl("",[Validators.required]),
    dateLimite: new FormControl("",[Validators.required]),
    campus : new FormControl("",[Validators.required])
  })
  villes$! : Observable<Ville[]>;
  constructor(private villeService:VilleService, httpClient:HttpClient, private router: Router) { }
  public error: string = "";

  ngOnInit(): void {
    this.villes$ = this.villeService.getVilles();
  }



  onFormSubmit() {
    let name = this.registerForm.controls.name.value;
    let ville = this.registerForm.controls.ville.value;
    let lieu = this.registerForm.controls.lieu.value;
    let cp= this.registerForm.controls.cp.value;
    let rue= this.registerForm.controls.rue.value;
    let commentaire= this.registerForm.controls.commentaire.value;
    let duree= this.registerForm.controls.duree.value;
    let nbPlace= this.registerForm.controls.nbPlace.value;
    let latitude= this.registerForm.controls.latitude.value;
    let longitude= this.registerForm.controls.longitude.value;
    let campus = this.registerForm.controls.campus.value;
  }

  publish(){

  }

  register(){

  }

  annuler(){

  }
}
