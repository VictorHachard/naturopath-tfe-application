import {Component, OnInit} from '@angular/core';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-addparapagetype',
  templateUrl: './addparapagetype.component.html',
  styleUrls: ['./addparapagetype.component.css']
})
export class AddparapagetypeComponent extends AbstractComponents implements OnInit {

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
  }

}
