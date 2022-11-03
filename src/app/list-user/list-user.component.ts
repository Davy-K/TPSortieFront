import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User, UserInsert, UserService} from "../service/user.service";
import {Observable} from "rxjs";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Campus, CampusService} from "../service/campus.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users$!: Observable<User[]>;

  constructor(private router: Router, public loginService: LoginService, private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  displayedColumns: string[] = ['pseudo', 'email', 'actif', "remove"];


  RemoveUser(user: User) {
    this.users$ = this.userService.deleteUser(user);
  }

  changeActif(user: User) {
    user.actif = !user.actif;
    this.users$ = this.userService.updateUser(user);
  }

  openDialog() {
    let dialogRef =this.dialog.open(AddUserDialog);
    dialogRef.afterClosed().subscribe(result=>{
      this.users$ = this.userService.getUsers();
    })
  }
}

@Component({
  selector: 'addUser-dialog',
  templateUrl: 'addUser-dialog.html',
})
export class AddUserDialog {

  constructor(private campusService: CampusService, private userService: UserService,public dialog: MatDialog,public dialogRef: MatDialogRef<AddUserDialog>) {
  }
  error : boolean = false;
  user!: UserInsert;
  user$!: Observable<User>;
  campus$!: Observable<Campus[]>;
  hide = true;
  selectedValue: number = 0;

  userForm = new FormGroup({
    pseudo: new FormControl("", [Validators.required]),
    prenom: new FormControl("", [Validators.required]),
    nom: new FormControl("", [Validators.required]),
    telephone: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    passwordConfirm: new FormControl("", [Validators.required]),
    campus: new FormControl("", [Validators.required]),
  })

  ngOnInit(): void {
    this.campus$ = this.campusService.getCampus();
  }

  onFormSubmit() {

    let pseudo = this.userForm.controls.pseudo.value
    let prenom = this.userForm.controls.prenom.value
    let nom = this.userForm.controls.nom.value
    let telephone = this.userForm.controls.telephone.value
    let email = this.userForm.controls.email.value
    let campus = this.userForm.controls.campus.value
    let password = this.userForm.controls.password.value
    let passwordConfirm = this.userForm.controls.passwordConfirm.value
    let roles = ["ROLE_USER"];

    if (password == passwordConfirm) {
      if (pseudo != null && prenom != null && nom != null && telephone != null && email != null && campus != null && password != null) {
        this.user = {
          pseudo: pseudo,
          firstname: prenom,
          name: nom,
          phone: telephone,
          email: email,
          campus: "api/campuses/" + campus,
          roles: roles,
          password: password,
          administrator: false,
          actif: true,
        }

        this.userService.insertUser(this.user);
        this.dialogRef.close();
      }
    }else{
      this.error = true;
    }


  }
}
