import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {AlertManager} from '../../../../model/my/AlertManager';
import {User} from '../../../../model/view/User';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import { environment } from 'src/environments/environment';

// jQuery Sign $
declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractComponents implements OnInit {

  private default = {
    username: 'Paulin',
    password: 'Test123*',
  };

  loginForm: UntypedFormGroup;
  alertManagerManager: AlertManager;
  count = 1;
  doubleAuth;
  rememberMe;
  user: {username: string, password: string};

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.init();
    this.doubleAuth = false;
    this.rememberMe = false;
    this.user = {username: undefined, password: undefined};
  }

  init(): void {
    this.loginForm = new UntypedFormGroup({
      emailOrUsername: new UntypedFormControl(!environment.production ? this.default.username : '', Validators.required),
      password: new UntypedFormControl(!environment.production ? this.default.password : '',  Validators.required),
      rememberMe: new UntypedFormControl(false)
    });
  }

  login(): void {
    const loginValue = this.loginForm.value;

    this.userSecurityService.login(loginValue.emailOrUsername, loginValue.password, loginValue.rememberMe).subscribe(value => {
      if (value.emailAuthValidate === false && value.token === null) {
        this.rememberMe = loginValue.rememberMe;
        this.user.username = value.username;
        this.user.password = loginValue.password;
        this.doubleAuth = true;
        $('#emailAuthModal').modal('show');
      } else {
        const user: User = value;
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (value.cookieToken !== null) {
          this.cookieService.set('remember', user.username + '==' + value.cookieToken);
        }
        this.userSecurityService.logger.next(true);
        this.router.navigate(['/home']);
      }
    }, error => {
      this.alertManagerManager.addAlert('The username or password is incorrect', 'alert-danger');
    });
  }
}
