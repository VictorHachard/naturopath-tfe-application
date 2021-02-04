import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {Router} from '@angular/router';
import {TestService} from '../../../../test.service';
import {Response} from '../../../../model/my/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  response: Response;
  count = 1;

  constructor(private router: Router, private userSecurityService: UserSecurityService, private test: TestService) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.formLogin = new FormGroup({
      emailOrUsername: new FormControl('Paulin', Validators.required),
      password: new FormControl('Test123*',  Validators.required)
    });
  }

  login(): void {
    const LoginValue = this.formLogin.value;

    this.userSecurityService.login({emailOrUsername: LoginValue.emailOrUsername,
      password: LoginValue.password}).subscribe(data => {
        console.log(data);
        this.userSecurityService.setValue(data);
        this.userSecurityService.user = data;
        this.router.navigate(['/home']);
    }, error => {
        if (this.response !== undefined) {
          this.count += 1;
          this.response = new Response('The username/email or password is incorrect - ' + this.count, 'alert-danger');
        } else {
          this.response = new Response('The username/email or password is incorrect', 'alert-danger');
        }
    });
  }
}
