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
  updateNameForm: FormGroup;
  updatePrivacyForm: FormGroup;
  updateAppearanceForm: FormGroup;
  deleteForm: FormGroup;
  confirmForm: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, private userSecurityService: UserSecurityService) {
    this.initData();
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('param');
  }

  initData(): void {
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

    this.updateNameForm = new FormGroup({
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName)
    });

    this.deleteForm = new FormGroup({
      password: new FormControl('',  Validators.required)
    });

    this.updatePrivacyForm = new FormGroup({
      isPrivate: new FormControl(this.user.isPrivate)
    });

    this.updateAppearanceForm = new FormGroup({
      dark: new FormControl(this.user.dark)
    });
  }

  updateUsernameEmail(): void {
    const updateUsernameEmailValue = this.updateUsernameEmailForm.value;

    this.userSecurityService.updateUsernameEmail({email: updateUsernameEmailValue.email,
      password: updateUsernameEmailValue.password,
      username: updateUsernameEmailValue.username}).subscribe(data => {
      console.log(data);
      this.userSecurityService.setValue(data);
      this.userSecurityService.user = data;
      this.initData();
    }, error => {
      console.log(error);
    });
  }

  updateName(): void {
    const updateNameValue = this.updateNameForm.value;

    this.userSecurityService.updateName({firstName: updateNameValue.firstName,
      lastName: updateNameValue.lastName}).subscribe(data => {
      console.log(data);
      this.initData();
    }, error => {
      console.log(error);
    });

  }

  updatePrivacy(): void {
    const updatePrivacyValue = this.updatePrivacyForm.value;

    this.userSecurityService.updatePrivacy({isPrivate: updatePrivacyValue.isPrivate}).subscribe(data => {
      console.log(data);
      this.initData();
    }, error => {
      console.log(error);
    });
  }

  updateAppearance(): void {
    const updateAppearanceValue = this.updateAppearanceForm.value;

    this.userSecurityService.updateAppearance({dark: updateAppearanceValue.dark}).subscribe(data => {
      console.log(data);
      this.initData();
    }, error => {
      console.log(error);
    });
  }

  setConfirmation(): void {
    this.userSecurityService.setConfirmAccount().subscribe(data => {
      console.log(data);
      this.initData();
    }, error => {
      console.log(error);
    });
  }

  setDelete(): void {
    const deleteValue = this.deleteForm.value;

    this.userSecurityService.setDeleteAccount({password: deleteValue.password}).subscribe(data => {
      console.log(data);
      this.initData();
    }, error => {
      console.log(error);
    });
  }
}
