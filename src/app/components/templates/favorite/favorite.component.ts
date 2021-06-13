import { Component, OnInit } from '@angular/core';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../service/Page.service';
import {TagService} from '../../../service/Tag.service';
import {CategoryService} from '../../../service/Category.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent extends AbstractComponents implements OnInit {

  pages: any[];
  searchListCategoryUrl;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private pageService: PageService) {
    super();
  }

  ngOnInit(): void {
    this.searchListCategoryUrl = new Map();
    this.pageService.getFavoriteAllDto().subscribe(value => {
      this.pages = value;
      for (const v of value) {
        this.searchListCategoryUrl.set(v.categoryViewDto.id, v.pageSimplifiedRecommendedViewDtoList[Math.floor(Math.random() * v.pageSimplifiedRecommendedViewDtoList.length)].image.url);
      }
    });
  }

}
