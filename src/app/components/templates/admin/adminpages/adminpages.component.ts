import { Component, OnInit } from '@angular/core';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageService} from '../../../../service/Image.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {PageService} from '../../../../service/Page.service';

@Component({
  selector: 'app-adminpages',
  templateUrl: './adminpages.component.html',
  styleUrls: ['./adminpages.component.css']
})
export class AdminpagesComponent  extends AbstractComponents  implements OnInit {

  pages: any[];
  infos;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private pagesService: PageService) {
    super();
  }

  ngOnInit(): void {
    this.infos = new Map();
    this.pagesService.getAllEditPage().subscribe(data => {
      this.pages = data;
      console.log(this.pages);
    });
  }
}
