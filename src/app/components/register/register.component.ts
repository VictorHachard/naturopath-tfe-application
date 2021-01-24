import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.init();
  }
  init(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password_confirm: new FormControl('', Validators.required)});
  }
  Register(): void{
    const RegisterValue = this.registerForm.value;
    console.log(RegisterValue.username, RegisterValue.email, RegisterValue.password);
  }
}

