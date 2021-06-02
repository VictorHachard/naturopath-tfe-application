import { Component, OnInit } from '@angular/core';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../service/Page.service';
import {TagService} from '../../../service/Tag.service';
import {CategoryService} from '../../../service/Category.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends AbstractComponents implements OnInit {

  searchList: any[];
  searchListCategoryUrl;
  str;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private pageService: PageService,
              private tagService: TagService,
              private categoryService: CategoryService) {
    super();
    this.route.paramMap.subscribe(params => {
      this.ngOnInitDebug();
      window.scroll(0, 0);
    });
  }

  ngOnInitDebug(): void {
    this.str = this.route.snapshot.paramMap.get('str') === undefined ? null : this.route.snapshot.paramMap.get('str');
    this.searchListCategoryUrl = new Map();
    this.pageService.getAllPageSearch({search: this.str}).subscribe(value => {
      this.searchList = value;
      for (const v of value) {
        this.searchListCategoryUrl.set(v.categoryViewDto.id, v.pageSimplifiedViewDto2List[Math.floor(Math.random() * v.pageSimplifiedViewDto2List.length)].image.url);
      }
      console.log(value);
    });
  }

  ngOnInit(): void { }

}
