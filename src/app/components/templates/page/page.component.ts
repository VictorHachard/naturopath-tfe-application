import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../service/Page.service';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {LikeService} from '../../../service/Like.service';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {LegacyPageEvent as PageEvent} from '@angular/material/legacy-paginator';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent extends AbstractComponents implements OnInit {

  private id: string;
  messageForm: UntypedFormGroup;
  messageAdded;

  page: any;
  recommendedPage: any;
  like: any;
  user: any;
  warning;

  // pagi
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
              private likeService: LikeService) {
    super();
    this.route.paramMap.subscribe(params => {
      this.ngOnInitDebug();
      window.scroll(0, 0);
    });
  }

  public updateData(event?: PageEvent): PageEvent {
    if (event !== null) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
    }
    const end = (this.pageIndex + 1) * this.pageSize;
    const start = this.pageIndex * this.pageSize;
    this.dataSource = this.page.messageList.slice(start, end);
    return event;
  }

  ngOnInitDebug(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.messageForm = new UntypedFormGroup({
      content: new UntypedFormControl('',
        [Validators.required, Validators.minLength(8), Validators.maxLength(2048)])
    });
    this.pageService.getPage(this.id).subscribe(data => {
      this.page = data;
      this.warning = false;
      for (const t of this.page.paragraphList) {
        this.warning = this.warning || t.paragraphType.alert;
      }
      for (const t of this.page.paratagList) {
        this.warning = this.warning || t.paratagType.alert;
      }
      if (this.messageAdded) {
        this.messageAdded = false;
        this.pageIndex = Math.floor(this.page.messageList.length / this.pageSize) - (this.page.messageList.length % this.pageSize === 0 ? 1 : 0);
      } else {
        this.pageSize = 10;
        this.pageIndex = 0;
      }
      if (this.user) {
        this.likeService.getDto(this.page.id).subscribe(value => {
          this.like = value;
        });
      }
      this.length = this.page.messageList.length;
      this.updateData(null);
      this.pageService.getAllRecommendedPageSearch({search: data.title, limit: 7}).subscribe(data1 => {
        this.recommendedPage = data1.filter(obj => obj.pageSimplifiedRecommendedViewDtoList[0].id != this.id);
        if (this.recommendedPage.length > 6) {
          this.recommendedPage.splice(-1, 1);
        }
      });
    });
  }

  ngOnInit(): void { }

  addLike(): void {
    if (this.like) {
      this.likeService.updateLike(this.like.id, {like: !this.like.like}).subscribe(value => {
        this.like.like = !this.like.like;
      });
    } else {
      this.likeService.addLike({like: true, pageId: this.page.id}).subscribe(value => {
        this.ngOnInitDebug();
      });
    }
  }

  userColor(UserId: number): string {
    if (this.user && UserId === this.user.username) {
      return 'primary';
    } else {
      return 'info';
    }
  }

  addPageMessage(): void {
    const messageFormValue = this.messageForm.value;

    this.pageService.addMessage(this.page.id, {content: messageFormValue.content}).subscribe(value => {
      this.messageAdded = true;
      this.ngOnInitDebug();
    });
  }
}
