import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../service/Page.service';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent extends AbstractComponents implements OnInit {

  private id: string;

  page: any;
  recommendedPage: any;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private pageService: PageService) {
    super();
    this.route.paramMap.subscribe(params => {
      this.ngOnInitDebug();
    });
  }

  ngOnInitDebug(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageService.getPage(this.id).subscribe(data => {
      this.pageService.getAllExactPageSearch({search: data.title, limit: 7}).subscribe(data1 => {
        this.page = data;
        this.recommendedPage = data1.filter(obj => obj.pageSimplifiedViewDto2List[0].id != this.id);
        if (this.recommendedPage.length > 6) {
          this.recommendedPage.splice(-1, 1);
        }
        console.log(this.page);
        console.log(this.recommendedPage);
      });
    });
  }

  ngOnInit(): void { }

}
