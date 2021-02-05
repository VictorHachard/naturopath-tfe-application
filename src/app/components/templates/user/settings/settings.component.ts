import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Response} from '../../../../model/my/response';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  param: string;
  user: any;
  response: Response;
  count = 1;
  responseDone = new Response('The modification has been done', 'alert-success');
  responseEmail = new Response('An email with instructions has been sent to you', 'alert-success');

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
    this.response = undefined;
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
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
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
      this.response = this.responseDone;
      this.userSecurityService.setValue(data);
      this.userSecurityService.user = data;
      this.initData();
    }, error => {
      this.response = new Response(error.error.message, 'alert-danger'); //TODO check email
    });
  }

  updateName(): void {
    const updateNameValue = this.updateNameForm.value;

    this.userSecurityService.updateName({firstName: updateNameValue.firstName,
      lastName: updateNameValue.lastName}).subscribe(data => {
      this.response = this.responseDone;
      this.initData();
    }, error => {
      this.response = new Response(error.error.message, 'alert-danger');
    });

  }

  updatePrivacy(): void {
    const updatePrivacyValue = this.updatePrivacyForm.value;

    this.userSecurityService.updatePrivacy({isPrivate: updatePrivacyValue.isPrivate}).subscribe(data => {
      this.response = this.responseDone;
      this.initData();
    }, error => {
      this.response = new Response(error.error.message, 'alert-danger');
    });
  }

  updateAppearance(): void {
    const updateAppearanceValue = this.updateAppearanceForm.value;

    this.userSecurityService.updateAppearance({dark: updateAppearanceValue.dark}).subscribe(data => {
      this.response = this.responseDone;
      this.initData();
    }, error => {
      this.response = new Response(error.error.message, 'alert-danger');
    });
  }

  setConfirmation(): void {
    this.userSecurityService.setConfirmAccount().subscribe(data => {
      this.response = this.responseEmail;
      this.initData();
    }, error => {
      this.response = new Response(error.error.message, 'alert-danger');
    });
  }

  setDelete(): void {
    const deleteValue = this.deleteForm.value;

    this.userSecurityService.setDeleteAccount({password: deleteValue.password}).subscribe(data => {
      this.response = this.responseEmail;
      this.initData();
    }, error => {
      console.log(error);
      if (this.response !== undefined) {
        this.count += 1;
        this.response = new Response('Wrong password - ' + this.count, 'alert-danger');
      } else {
        this.response = new Response('Wrong password', 'alert-danger');
      }
    });
  }
}
