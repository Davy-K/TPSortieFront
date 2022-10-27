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
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
  declarations: [
    AppComponent,
    CreateSortieComponent,
    ConnexionComponent,
    ProfilComponent,
    AccueilComponent,
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
      {path: 'profil', component: ProfilComponent},
      {path: 'sortieCreate', component: CreateSortieComponent},
      {path: 'home', component: AccueilComponent}
    ]),
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
