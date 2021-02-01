import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  param: string;

  user: any;

  updateUsernameEmailForm: FormGroup;

  constructor(private route: ActivatedRoute, private userSecurityService: UserSecurityService) {
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('param');
    this.userSecurityService.getEditDto().subscribe(data => {
      this.user = data;
      console.log(data);
      this.init();
    });
  }

  init(): void {
    this.updateUsernameEmailForm = new FormGroup({
      username: new FormControl(this.user.username, Validators.required),
      email: new FormControl(this.user.email, Validators.required),
      password: new FormControl('',  Validators.required)
    });
  }

  updateUsernameEmail(): void {
    const updateUsernameEmailValue = this.updateUsernameEmailForm.value;

    this.userSecurityService.updateUsernameEmail({email: updateUsernameEmailValue.email,
      password: updateUsernameEmailValue.password,
      username: updateUsernameEmailValue.username}).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
