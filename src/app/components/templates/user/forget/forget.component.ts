import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertManager} from '../../../../model/my/AlertManager';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent extends AbstractComponents implements OnInit {
  alertManagerManager: AlertManager;
  setResetForm: UntypedFormGroup;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.init();
  }

  init(): void {
    this.setResetForm = new UntypedFormGroup({
      emailOrUsername: new UntypedFormControl('', Validators.required),
      forgetPassword: new UntypedFormControl('', Validators.required)
    });
  }

  setReset(): void {
    const setResetValue = this.setResetForm.value;

    this.userSecurityService.setResetAccount({emailOrUsername: setResetValue.emailOrUsername,
      forgetPassword: setResetValue.forgetPassword}).subscribe(value => {
        this.alertManagerManager.addAlert('An email with instructions has been sent to you', 'alert-success');
      }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });
  }
}
