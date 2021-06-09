import {Component, HostListener, Injector, OnInit} from '@angular/core';
import {User} from '../../../model/view/User';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageService} from '../../../service/Page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  page;
  proposal;
  searchFormHeader: FormGroup;

  constructor(private userSecurityService: UserSecurityService,
              private pageService: PageService,
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
    this.pageService.getAllSimplifiedDto().subscribe(value => {
      this.page = value;
      this.searchFormHeader = new FormGroup({
        input: new FormControl('', [Validators.required, Validators.minLength(3)])
      });
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

  inputChange($event: any): void {
    this.proposal = [];
    this.proposal = this.page.filter(page => page.title.toLowerCase().indexOf(this.searchFormHeader.get('input').value.toLowerCase()) > -1);
  }

  select(p): void {
    this.searchFormHeader.get('input').setValue(p.title);
  }

  @HostListener('document:click', ['$event'])
  documentClick(event): void {
    if (!(event.target as Element).className.includes('no-click-ish')) {
      this.proposal = [];
    }
  }
}
