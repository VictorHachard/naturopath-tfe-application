import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/view/User';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private router: Router, private userSecurityService: UserSecurityService) {
    this.userSecurityService.isLoggedIn().subscribe(value => {
      this.logIn(value);
    });
  }

  ngOnInit(): void {
  }

  logIn(isLoggedIn: boolean): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.userSecurityService.logger.next(false);
  }

}
