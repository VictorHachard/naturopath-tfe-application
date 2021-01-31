import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserSecurityService} from '../../../service/UserSecurity.service';
import {TestService} from '../../../test.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private router: Router, private userSecurityService: UserSecurityService, private test: TestService) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
      password_confirm: new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')])},
      { validators: this.matchPassword('password', 'password_confirm')});
  }

  register(): void {
    const RegisterValue = this.registerForm.value;

    this.userSecurityService.registerUser({email: RegisterValue.email,
      password: RegisterValue.password,
      username: RegisterValue.username}).subscribe(data => {
      this.userSecurityService.userSecurity = data;
      this.router.navigate(['/home']);
    });

    }

    matchPassword(firstControl, secondControl): ValidatorFn {
    return (control: FormGroup): { [key: string]: boolean } | null => {

      const password = control.get(firstControl).value;
      const confirm = control.get(secondControl).value;

      if (password !== confirm) {
        const err = {noMatch: true};
        control.get(firstControl).setErrors(err);
        return err;
      }else {
        const noMatchError = control.get(firstControl).hasError('noMatch');
        if (noMatchError){
            delete control.get(firstControl).errors.noMatch;
            control.get(firstControl).updateValueAndValidity();
        }
      }
    };
  }
}

