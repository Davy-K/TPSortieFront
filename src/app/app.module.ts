import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent } from './app.component';
import {ConnexionComponent } from './connexion/connexion.component';
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from "@angular/material/icon";
import {CreateSortieComponent} from "./create-sortie/create-sortie.component";
import {MatSelectModule} from "@angular/material/select";
import {ProfilComponent } from './profil/profil.component';
import {AccueilComponent } from './accueil/accueil.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from "@angular/material/table";
import { ListUserComponent } from './list-user/list-user.component';
import {AuthInterceptor} from "./interceptors/interceptor";
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import { AfficherSortieComponent } from './afficher-sortie/afficher-sortie.component';




@NgModule({
  declarations: [
    AppComponent,
    CreateSortieComponent,
    ConnexionComponent,
    ProfilComponent,
    AccueilComponent,
    ListUserComponent,
    MonProfilComponent,
    AfficherSortieComponent,
  ],
  imports: [
    BrowserModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    RouterModule.forRoot([
      {path: '', component: ConnexionComponent},
      {path: 'profil/:pseudo', component: ProfilComponent},
      {path: 'sortieCreate', component: CreateSortieComponent},
      {path: 'home', component: AccueilComponent},
      {path: 'monProfil', component: MonProfilComponent},
      {path: 'listUser', component: ListUserComponent}
    ]),
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
