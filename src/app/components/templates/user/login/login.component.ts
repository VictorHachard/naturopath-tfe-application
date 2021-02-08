import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {Router} from '@angular/router';
import {AlertManager} from '../../../../model/my/AlertManager';
import {User} from '../../../../model/view/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  alertManagerManager: AlertManager;
  count = 1;

  constructor(private router: Router, private userSecurityService: UserSecurityService) { }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.init();
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
      const user: User = value;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.userSecurityService.logger.next(true);
      this.router.navigate(['/home']);
    }, error => {
      this.alertManagerManager.addAlert('The username or password is incorrect', 'alert-danger');
    });
  }
}
