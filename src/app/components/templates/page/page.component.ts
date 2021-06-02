import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../service/Page.service';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {LikeService} from '../../../service/Like.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent extends AbstractComponents implements OnInit {

  private id: string;

  page: any;
  recommendedPage: any;
  like: any;
  user: any;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private pageService: PageService,
              private likeService: LikeService) {
    super();
    this.route.paramMap.subscribe(params => {
      this.ngOnInitDebug();
      window.scroll(0, 0);
    });
  }

  ngOnInitDebug(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageService.getPage(this.id).subscribe(data => {
      this.page = data;
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      if (this.user) {
        this.likeService.getDto(this.page.id).subscribe(value => {
          this.like = value;
        });
      }
      this.pageService.getAllExactPageSearch({search: data.title, limit: 7}).subscribe(data1 => {
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

  addLike(): void {
    if (this.like) {
      console.log('up');
      this.likeService.updateLike(this.like.id, {like: !this.like.like}).subscribe(value => {
        this.like.like = !this.like.like;
      });
    } else {
      console.log('add');
      this.likeService.addLike({like: true, pageId: this.page.id}).subscribe(value => {
        this.ngOnInitDebug();
      });
    }
  }
}
