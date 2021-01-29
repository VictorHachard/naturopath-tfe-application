import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersecurityService} from '../../../service/usersecurity.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  formResetPassword: FormGroup;

  constructor(private router: Router, private userSecurity: UsersecurityService) { }

  ngOnInit(): void {
    this.init();
  }
  init(): void{
    this.formResetPassword = new FormGroup({
      emailOrUsername: new FormControl('', Validators.required),
      forgetPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')])
    });
  }
  SendEmail(): void{
    const EmailValue = this.formResetPassword.value;

    this.userSecurity.resetPassword({emailOrUsername: EmailValue.emailOrUsername,
      forgetPassword: EmailValue.forgetPassword});
  }
}
