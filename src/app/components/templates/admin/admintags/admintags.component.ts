import { Component, OnInit } from '@angular/core';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../../service/Page.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {TagService} from '../../../../service/Tag.service';

@Component({
  selector: 'app-admintags',
  templateUrl: './admintags.component.html',
  styleUrls: ['./admintags.component.css']
})
export class AdmintagsComponent  extends AbstractComponents implements OnInit {

  tags: any[];
  infos;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private tagService: TagService) {
    super();
  }

  ngOnInit(): void {
    this.infos = new Map();
    this.tagService.getAllEditTag().subscribe(data => {
      this.tags = data;
      console.log(this.tags);

      for (const tag of this.tags) {
        for (const inner of tag.innerTagList) {
          if (inner.state === 'VALIDATED') {
            this.infos.set(tag.id, 'VALIDATED');
            break;
          }
        }
      }

    });
  }
}
