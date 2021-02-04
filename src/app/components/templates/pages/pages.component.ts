import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../service/Page.service';
import {CategoryService} from '../../../service/Category.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  id: string;

  categories: any[];

  pages: any;
  offset: 10;
  index: 1;
  minPagi;
  maxPagi;

  pagi: number[] = [];

  constructor(private route: ActivatedRoute, private pageService: PageService, private categoryService: CategoryService) {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') === undefined ? null : this.route.snapshot.paramMap.get('id');

    if (this.id !== null) {
      this.pageService.getAllPageByCategory(this.id).subscribe(data => {
        console.log(this.pages);
        this.pages = data;
        this.minPagi = this.index;
        this.maxPagi = this.index;

        for (let i = this.minPagi + 1; i <= this.maxPagi - 1; i++) {
          this.pagi.push(i);
        }
      });
    }
  }
}
