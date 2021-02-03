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

  setResetForm: FormGroup;

  constructor(private router: Router, private userSecurity: UserSecurityService) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void{
    this.setResetForm = new FormGroup({
      emailOrUsername: new FormControl('', Validators.required),
      forgetPassword: new FormControl('', Validators.required)
    });
  }

  setReset(): void{
    const setResetValue = this.setResetForm.value;

    this.userSecurity.setResetAccount({emailOrUsername: setResetValue.emailOrUsername,
      forgetPassword: setResetValue.forgetPassword}).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
    });
  }
}
