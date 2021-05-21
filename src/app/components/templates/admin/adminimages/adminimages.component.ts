import { Component, OnInit } from '@angular/core';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {ImageService} from '../../../../service/Image.service';

@Component({
  selector: 'app-adminimages',
  templateUrl: './adminimages.component.html',
  styleUrls: ['./adminimages.component.css']
})
export class AdminimagesComponent extends AbstractComponents implements OnInit {

  images: any[];
  infos;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private ImagesService: ImageService) {
    super();
  }

  ngOnInit(): void {
    this.infos = new Map();
    this.ImagesService.getAllEditImageDto().subscribe(data => {
      this.images = data;
      console.log(this.images);

      for (const image of this.images) {
        for (const inner of image.innerImageList) {
          if (inner.state === 'VALIDATED') {
            this.infos.set(image.id, 'VALIDATED');
            break;
          }
        }
      }

    });
  }


}
