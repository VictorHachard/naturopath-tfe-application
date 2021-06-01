import {Component, Injector, OnInit} from '@angular/core';
import {User} from '../../../model/view/User';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  searchFormHeader: FormGroup;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router) {
    this.userSecurityService.isLoggedIn().subscribe(value => {
      this.logIn();
    });
    this.userSecurityService.settingsChange().subscribe(value => {
      this.logIn();
    });
  }

  ngOnInit(): void {
    this.searchFormHeader = new FormGroup({
      input: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
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

  search(): void {
    this.router.navigate(['/search', this.searchFormHeader.get('input').value]);
  }
}
