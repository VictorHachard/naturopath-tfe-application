import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent extends AbstractComponents implements OnInit {

  setResetForm: FormGroup;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.setResetForm = new FormGroup({
      emailOrUsername: new FormControl('', Validators.required),
      forgetPassword: new FormControl('', Validators.required)
    });
  }

  setReset(): void {
    const setResetValue = this.setResetForm.value;

    this.userSecurityService.setResetAccount({emailOrUsername: setResetValue.emailOrUsername,
      forgetPassword: setResetValue.forgetPassword}).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
    });
  }
}
