import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  formResetPassword: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.init();
  }
  init(): void{
    this.formResetPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  SendEmail(): void{
    const EmailValue = this.formResetPassword.value;
    console.log(EmailValue.email);
  }
}
