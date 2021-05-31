import {Component, OnInit} from '@angular/core';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageService} from '../../../service/Image.service';
import {TagService} from '../../../service/Tag.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends AbstractComponents implements OnInit {

  imageList: any[];
  tagList: any[];

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private imagesService: ImageService,
              private tagService: TagService) {
    super();
  }

  ngOnInit(): void {
    this.imagesService.getAllUserImageDto().subscribe(value => {
      this.imageList = value;
      console.log(value);
      this.tagService.getAllUserTagDto().subscribe(value1 => {
        this.tagList = value1;
        console.log(value1);

      });
    });
  }

}
