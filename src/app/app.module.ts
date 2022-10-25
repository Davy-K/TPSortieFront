import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ConnexionComponent} from "./connexion/connexion.component";
import {RouterModule} from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CreateSortieComponent} from "./create-sortie/create-sortie.component";
import {MatGridListModule} from "@angular/material/grid-list";
@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    CreateSortieComponent
  ],
    imports: [
        BrowserModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSidenavModule,
        RouterModule.forRoot([
            {path: '', component: ConnexionComponent}]),
        RouterModule.forRoot([{path: 'createSerie', component: CreateSortieComponent}]),
        BrowserAnimationsModule,
        MatGridListModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
