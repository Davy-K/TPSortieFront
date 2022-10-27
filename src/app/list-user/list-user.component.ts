import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User, UserService} from "../service/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users$! : Observable<User[]>;
  constructor(private router: Router,public loginService: LoginService,private userService : UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
  actif = false;

  displayedColumns: string[]=['pseudo','email','actif',"remove"];


  RemoveUser(id:string){

  }
  ChangeActif(id:string){

  }
}
