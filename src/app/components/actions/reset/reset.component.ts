import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  error: any = '';
  resetForm: FormGroup;

  constructor(private route: ActivatedRoute, private userSecurityService: UserSecurityService) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
      password_confirm: new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')])},
      { validators: this.matchPassword('password', 'password_confirm') });
  }

  reset(): void {
    const resetValue = this.resetForm.value;

    this.userSecurityService.resetAccount({token: this.route.snapshot.paramMap.get('token'),
    password: resetValue.password}).subscribe(value => {
      console.log(value);
    }, error => {
      this.error = error;
      console.log(error);
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
        if (noMatchError){
          delete control.get(firstControl).errors.noMatch;
          control.get(firstControl).updateValueAndValidity();
        }
      }
    };
  }
}
