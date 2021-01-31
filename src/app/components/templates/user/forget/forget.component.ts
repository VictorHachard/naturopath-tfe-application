import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  formResetPassword: FormGroup;

  constructor(private router: Router, private userSecurity: UserSecurityService) { }

  ngOnInit(): void {
    this.init();
  }
  init(): void{
    this.formResetPassword = new FormGroup({
      emailOrUsername: new FormControl('', Validators.required),
      forgetPassword: new FormControl('', Validators.required)
    });
  }
  SendEmail(): void{
    const EmailValue = this.formResetPassword.value;

    this.userSecurity.setResetAccount({emailOrUsername: EmailValue.emailOrUsername,
      forgetPassword: EmailValue.forgetPassword});
  }
}
