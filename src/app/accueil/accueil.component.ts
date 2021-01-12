import { Component, OnInit } from '@angular/core';
import {PageService} from '../page.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  pages: any[];

  constructor(private pageService: PageService) { }

  ngOnInit(): void {
    this.pageService.getAllPage().subscribe(data => {
      this.pages = data;
      console.log(this.pages);
    });
  }



}
