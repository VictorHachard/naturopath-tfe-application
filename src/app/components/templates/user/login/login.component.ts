import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertManager} from '../../../../model/my/AlertManager';
import {User} from '../../../../model/view/User';
import {AbstractComponents} from '../../../commons/AbstractComponents';

// jQuery Sign $
declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractComponents implements OnInit {
  loginForm: FormGroup;

  alertManagerManager: AlertManager;
  count = 1;
  doubleAuth;
  user: {username: string, password: string};

  constructor(route: ActivatedRoute,
              router: Router,
              private userSecurityService: UserSecurityService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.init();
    this.doubleAuth = false;
    this.user = {username: undefined, password: undefined};
  }

  init(): void {
    this.loginForm = new FormGroup({
      emailOrUsername: new FormControl('Paulin', Validators.required),
      password: new FormControl('Test123*',  Validators.required)
    });
  }

  login(): void {
    const loginValue = this.loginForm.value;

    this.userSecurityService.login(loginValue.emailOrUsername, loginValue.password).subscribe(value => {
      console.log(value);
      if (value.emailAuthValidate === false && value.token === null) {
        this.user.username = value.username;
        this.user.password = loginValue.password;
        this.doubleAuth = true;
        $('#emailAuthModal').modal('show');
      } else {
        const user: User = value;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSecurityService.logger.next(true);
        this.router.navigate(['/home']);
      }
    }, error => {
      this.alertManagerManager.addAlert('The username or password is incorrect', 'alert-danger');
    });
  }
}
