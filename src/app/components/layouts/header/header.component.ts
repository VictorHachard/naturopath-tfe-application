import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/view/User';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AbstractComponents} from '../../commons/AbstractComponents';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends AbstractComponents implements OnInit {

  user: User;

  constructor(route: ActivatedRoute,
              router: Router,
              private userSecurityService: UserSecurityService,
              private cookieService: CookieService) {
    super(route, router);
    this.userSecurityService.isLoggedIn().subscribe(value => {
      this.logIn();
    });
    this.userSecurityService.settingsChange().subscribe(value => {
      this.logIn();
    });
  }

  ngOnInit(): void {
  }

  logIn(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.cookieService.delete('remember');
    this.userSecurityService.logger.next(false);
    this.userSecurityService.dark.next(false);
    this.router.navigate(['/home']);
  }

}
