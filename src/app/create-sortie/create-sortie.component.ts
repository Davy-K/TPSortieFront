import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-sortie',
  templateUrl: './create-sortie.component.html',
  styleUrls: ['./create-sortie.component.css']
})
export class CreateSortieComponent implements OnInit {
  listLieu = ["Gaumont","Jardins des plantes","La Beaujoire"];
  listVille = ["Nantes"];

  constructor() { }

  ngOnInit(): void {
  }

}
