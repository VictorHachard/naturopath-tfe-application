import { Component, OnInit } from '@angular/core';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {ActivatedRoute, Router} from '@angular/router';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../../../../model/view/User';

@Component({
  selector: 'app-connect-from-cookie',
  templateUrl: './connect-from-cookie.component.html',
  styleUrls: ['./connect-from-cookie.component.css']
})
export class ConnectFromCookieComponent extends AbstractComponents implements OnInit {

  constructor(route: ActivatedRoute,
              router: Router,
              private userSecurityService: UserSecurityService,
              private cookieService: CookieService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.connectFromCookie();
  }

  private connectFromCookie(): void {
    if (localStorage.getItem('currentUser') === null && this.cookieService.check('remember')) {
      const token: string = this.cookieService.get('remember');
      const splitted = token.split('==');
      this.userSecurityService.connectFromCookie(splitted[0], splitted[1]).subscribe(value => {
        console.log(value);
        const user: User = value;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSecurityService.logger.next(true);
        this.router.navigate(['/home']);
      });
    }
  }
}
