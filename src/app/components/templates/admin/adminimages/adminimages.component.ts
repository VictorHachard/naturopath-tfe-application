import { Component, OnInit } from '@angular/core';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ParagraphTypeService} from '../../../../service/ParagraphType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {InnerImageService} from '../../../../service/InnerImage.service';
import {ImageService} from '../../../../service/Image.service';

@Component({
  selector: 'app-adminimages',
  templateUrl: './adminimages.component.html',
  styleUrls: ['./adminimages.component.css']
})
export class AdminimagesComponent extends AbstractComponents implements OnInit {

  images: any[];

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private ImagesService: ImageService) {
    super();
  }

  ngOnInit(): void {
    this.ImagesService.getAllImagesType().subscribe(data => {
      this.images = data;
      console.log(this.images);
    });
  }


}
