import { Component, OnInit } from '@angular/core';
import {PageService} from '../../service/page.service';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
