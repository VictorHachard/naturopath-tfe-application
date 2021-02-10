import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {User} from '../../../../model/view/User';
import {AlertManager} from '../../../../model/my/AlertManager';
import {AbstractComponents} from '../../../commons/AbstractComponents';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AbstractComponents implements OnInit {
  registerForm: FormGroup;

  alertManagerManager: AlertManager;
  count = 1;

  private debug = true;
  private default = {
    username: 'paulin',
    email: 'test@test.test',
    password: 'Test123*',
  };

  constructor(route: ActivatedRoute,
              router: Router,
              private userSecurityService: UserSecurityService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.init();
  }

  init(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(this.debug ? this.default.username : '', Validators.required),
      email: new FormControl(this.debug ? this.default.email : '', [Validators.required, Validators.email]),
      password: new FormControl(this.debug ? this.default.password : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
      password_confirm: new FormControl(this.debug ? this.default.password : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')])},
      { validators: this.matchPassword('password', 'password_confirm')});
  }

  register(): void {
    const registerValue = this.registerForm.value;

    this.userSecurityService.register({email: registerValue.email,
      password: registerValue.password,
      username: registerValue.username}).subscribe(value => {
        const user: User = value;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSecurityService.logger.next(true);
        this.router.navigate(['/home']);
    }, error => {
        this.alertManagerManager.addAlert('The user already exists', 'alert-danger');
    });
  }

  matchPassword(firstControl, secondControl): ValidatorFn {
    return (control: FormGroup): { [key: string]: boolean } | null => {

      if (control.get(firstControl).value !== control.get(secondControl).value) {
        const err = {noMatch: true};
        control.get(firstControl).setErrors(err);
        return err;
      } else {
        const noMatchError = control.get(firstControl).hasError('noMatch');
        if (noMatchError) {
            delete control.get(firstControl).errors.noMatch;
            control.get(firstControl).updateValueAndValidity();
        }
      }
    };
  }
}

