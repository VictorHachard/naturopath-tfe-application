import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../service/Page.service';
import {CategoryService} from '../../../service/Category.service';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent extends AbstractComponents implements OnInit {

  private id: string;

  categories: any[];
  name: string;

  pages: any;
  offset: 10;
  index: 1;
  minPagi;
  maxPagi;

  pagi: number[] = [];

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private pageService: PageService,
              private categoryService: CategoryService) {
    super();
    this.categoryService.getAllCategory().subscribe(value => {
      this.categories = value;
      console.log(value);
    });
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') === undefined ? null : this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {
      //this.name = this.categories[].name;
      this.pageService.getAllPageByCategory(this.id).subscribe(data => {
        this.pages = data;
        console.log(data);
        this.minPagi = this.index;
        this.maxPagi = this.index;

        for (let i = this.minPagi + 1; i <= this.maxPagi - 1; i++) {
          this.pagi.push(i);
        }
      });
    }
  }
}
