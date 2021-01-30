import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserSecurityService} from '../../../service/UserSecurity.service';
import {Router} from '@angular/router';
import {Globalconstants} from '../../../helpers/globalconstants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  user: any;

  constructor(private router: Router, private userSecurity: UserSecurityService) { }

  ngOnInit(): void {
    this.init();
  }
  init(): void {
    this.formLogin = new FormGroup({
      emailOrUsername: new FormControl('', Validators.required),
      password: new FormControl('',  [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')])
    });
  }
  Login(): void {
    const LoginValue = this.formLogin.value;

    this.userSecurity.loginUser({emailOrUsername: LoginValue.emailOrUsername,
      password: LoginValue.password}).subscribe(data => {
        this.user = data;
        Globalconstants.addUserInformation(this.user.id, this.user.username);
        this.router.navigate(['/home']);
    });
  }
}
