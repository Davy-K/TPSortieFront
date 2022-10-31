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
  public login = "TestLogin";
  public prenom = "TestPrenom";
  public nom = "TestNom";
  public telephone = "TestTelephone";
  public email = "TestEmail";
  public campus = "TestCampus";

  id: string = "";
  user$!: Observable<User>;

  constructor(private router: Router, public loginService: LoginService,public userService: UserService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.user$ = this.userService.getUserById(this.id);
  }

}
