import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {AlertManager} from '../../../model/my/AlertManager';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  alertManagerManager: AlertManager;
  resetForm: UntypedFormGroup;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.logOut();
    this.init();
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.cookieService.delete('remember');
    this.userSecurityService.logger.next(false);
    this.userSecurityService.dark.next(false);
  }

  init(): void {
    this.resetForm = new UntypedFormGroup({
      password: new UntypedFormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
      password_confirm: new UntypedFormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')])},
      { validators: this.matchPassword('password', 'password_confirm') });
  }

  reset(): void {
    const resetValue = this.resetForm.value;

    this.userSecurityService.resetAccount({token: this.route.snapshot.paramMap.get('token'),
    password: resetValue.password}).subscribe(value => {
      this.alertManagerManager.addAlert('You password has been change', 'alert-success');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });

  }

  matchPassword(firstControl, secondControl): ValidatorFn {
    return (control: UntypedFormGroup): { [key: string]: boolean } | null => {

      if (control.get(firstControl).value !== control.get(secondControl).value) {
        const err = {noMatch: true};
        control.get(firstControl).setErrors(err);
        return err;
      } else {
        const noMatchError = control.get(firstControl).hasError('noMatch');
        if (noMatchError){
          delete control.get(firstControl).errors.noMatch;
          control.get(firstControl).updateValueAndValidity();
        }
      }
    };
  }
}
