import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../service/Page.service';
import {CategoryService} from '../../../service/Category.service';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent extends AbstractComponents implements OnInit {

  private id: string;

  categories: any[] = [];
  pages: any;
  description: string;
  name: string;
  noId = false;

  pageEvent: PageEvent;
  dataSource: any[];
  pageIndex: number;
  pageSize: number;
  length: number;

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
      this.route.paramMap.subscribe(params => {
        this.ngOnInit();
      });
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') === undefined ? null : this.route.snapshot.paramMap.get('id');
      this.categoryService.getAllCategory().subscribe(value => {
        if (this.id === null) {
          this.noId = true;
          const cat = value[Math.floor(Math.random() * value.length)];
          if (cat.childCategory.length > 0) {
            this.id = cat.childCategory[Math.floor(Math.random() * cat.childCategory.length)].id;
          } else {
            this.id = cat.id;
          }
        }
        for (const c of value) {
          if (c.childCategory.length > 0) {
            for (const child of c.childCategory) {
              if (child.id == this.id) {
                this.name = child.name;
                this.description = child.description;
                break;
              }
            }
          } else {
            if (c.id == this.id) {
              this.name = c.name;
              this.description = c.description;
              break;
            }
          }
        }
        this.pageService.getAllPageByCategory(this.id).subscribe(data => {
          this.pages = data;
          console.log(data);
          this.pageIndex = 0;
          this.pageSize = 9;
          this.length = data.number;
          this.updateData(null);
        });
      });
  }

  public updateData(event?: PageEvent) {
    if (event !== null) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
    }
    const end = (this.pageIndex + 1) * this.pageSize;
    const start = this.pageIndex * this.pageSize;
    this.dataSource = this.pages.pageList.slice(start, end);
    return event;
  }
}
