import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../service/login.service";
import {HttpClient} from "@angular/common/http";
import {User, UserService} from "../service/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  pseudo: string = "";
  user$!: Observable<User>;


  constructor(private router: Router, public loginService: LoginService,public userService: UserService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pseudo = params['pseudo'];
    });

     this.user$ = this.userService.getUserByPseudo(this.pseudo);
  }

}
