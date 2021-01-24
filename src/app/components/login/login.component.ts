import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.init();
  }
  init(): void {
    this.formLogin = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('',  Validators.required)
    });
  }
  Login(): void {
    const LoginValue = this.formLogin.value;
    console.log(LoginValue.username, LoginValue.password);
  }
}
