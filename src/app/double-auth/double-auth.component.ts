import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserSecurityService} from '../service/security/UserSecurity.service';
import {AbstractComponents} from '../components/commons/AbstractComponents';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertManager} from '../model/my/AlertManager';
import {User} from '../model/view/User';
import {CookieService} from 'ngx-cookie-service';

// jQuery Sign $
declare let $: any;

@Component({
  selector: 'app-double-auth',
  templateUrl: './double-auth.component.html',
  styleUrls: ['./double-auth.component.css']
})
export class DoubleAuthComponent extends AbstractComponents implements OnInit {
  doubleForm: FormGroup;

  alertManagerManager: AlertManager;
  count = 1;

  @Input() user;
  @Input() rememberMe;

  constructor(route: ActivatedRoute,
              router: Router,
              private userSecurityService: UserSecurityService,
              private cookieService: CookieService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.init();
    console.log('test');
  }

  init(): void {
    this.doubleForm = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    });
  }

  complete(): void {
    console.log(this.user);
    this.userSecurityService.confirmAuth(this.user.username, this.user.password, this.doubleForm.get('code').value, this.rememberMe).subscribe(value => {

      const user: User = value;
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (value.cookieToken !== null) {
        console.log(user.username + '==' + value.cookieToken);
        this.cookieService.set('remember', user.username + '==' + value.cookieToken);
      }
      this.userSecurityService.logger.next(true);
      $('#emailAuthModal').modal('hide');
      this.router.navigate(['/home']);
    }, error => {
      this.alertManagerManager.addAlert('The code is incorrect', 'alert-danger');
    });
  }
}
