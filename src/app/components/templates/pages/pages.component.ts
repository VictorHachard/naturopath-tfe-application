import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../service/page.service';
import {CategoryService} from '../../../service/category.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  private id: string;

  categories: any[];

  pages: any[];

  constructor(private route: ActivatedRoute, private pageService: PageService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') === undefined ? null : this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {
      this.pageService.getAllPageByCategory(this.id).subscribe(data => {
        this.pages = data;
        console.log(this.pages);
      });
    }
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }
}
