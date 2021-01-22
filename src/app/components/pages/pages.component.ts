import { Component, OnInit } from '@angular/core';
import {PageService} from '../../service/page.service';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  categories: any[];

  pages: any[];

  constructor(private pageService: PageService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.pageService.getAllPageByCategory(17).subscribe(data => {
      this.pages = data;
      console.log(this.pages);
    });
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }

}
