import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  FormResetPassword: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.init();
  }
  init(): void{
    this.FormResetPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  SendEmail(): void{
    const EmailValue = this.FormResetPassword.value;
    console.log(EmailValue.email);
  }
}
