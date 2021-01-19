import { Component, OnInit } from '@angular/core';
import {PageService} from '../service/page.service';
import {CategoryService} from '../service/category.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  pages: any[];

  categories: any[];

  constructor(private pageService: PageService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.pageService.getAllPage().subscribe(data => {
      this.pages = data;
      console.log(this.pages);
    });
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }



}
