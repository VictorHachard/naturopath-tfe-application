import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {User} from '../../../../model/view/User';
import {Response} from '../../../../model/my/Response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  response: Response;
  count = 1;

  private debug = true;
  private default = {
    username: 'paulin',
    email: 'test@test.test',
    password: 'Test123*',
  };

  constructor(private router: Router, private userSecurityService: UserSecurityService) { }

  ngOnInit(): void {
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
        /*if (error.status === 400 ) {*/
          if (this.response !== undefined) {
            this.count += 1;
            this.response = new Response('The user already exists - ' + this.count, 'alert-danger');
          } else {
            this.response = new Response('The user already exists', 'alert-danger');
          }
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
