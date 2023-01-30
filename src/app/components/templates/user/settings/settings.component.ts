import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {AlertManager} from '../../../../model/my/AlertManager';
import {User} from '../../../../model/view/User';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends AbstractComponents implements OnInit {

  param: string;
  user: any;
  notUser: boolean;
  alertManagerManager: AlertManager;

  updateUsernameEmailForm: UntypedFormGroup;
  updateNameForm: UntypedFormGroup;
  updatePrivacyForm: UntypedFormGroup;
  updateAppearanceForm: UntypedFormGroup;
  deleteForm: UntypedFormGroup;
  confirmForm: UntypedFormGroup;
  emailAuthForm: UntypedFormGroup;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router) {
    super();
    this.initData();
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.param = this.route.snapshot.paramMap.get('param');
  }

  initData(): void {
    this.userSecurityService.getEditDto().subscribe(value => {
      this.user = value;
      const user: User = value;
      user.token = JSON.parse(localStorage.getItem('currentUser')).token;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.userSecurityService.change.next(true);
      this.notUser = !(JSON.parse(localStorage.getItem('currentUser')).roleList.length > 1);
      this.init();
    });
  }

  init(): void {
    this.updateUsernameEmailForm = new UntypedFormGroup({
      username: new UntypedFormControl(this.user.username, Validators.required),
      email: new UntypedFormControl(this.user.email, [Validators.required, Validators.email]),
      password: new UntypedFormControl('',  Validators.required)
    });
    this.updateNameForm = new UntypedFormGroup({
      firstName: new UntypedFormControl(this.user.firstName !== null ? this.user.firstName : ''),
      lastName: new UntypedFormControl(this.user.lastName !== null ? this.user.lastName : '')
    });
    this.deleteForm = new UntypedFormGroup({
      password: new UntypedFormControl('',  Validators.required)
    });
    this.updatePrivacyForm = new UntypedFormGroup({
      isPrivate: new UntypedFormControl(this.user.isPrivate)
    });
    this.emailAuthForm = new UntypedFormGroup({
      emailAuth: new UntypedFormControl(this.user.emailAuth)
    });
    this.updateAppearanceForm = new UntypedFormGroup({
      dark: new UntypedFormControl(this.user.dark)
    });
    this.confirmForm = new UntypedFormGroup({});
  }

  updateUsernameEmail(): void {
    const updateUsernameEmailValue = this.updateUsernameEmailForm.value;

    this.userSecurityService.updateUsernameEmail({email: updateUsernameEmailValue.email,
      password: updateUsernameEmailValue.password,
      username: updateUsernameEmailValue.username}).subscribe(value => {
        this.alertManagerManager.addAlert('The modification has been done', 'alert-success');
        this.initData();
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger'); //TODO check email
    });
  }

  updateName(): void {
    const updateNameValue = this.updateNameForm.value;

    this.userSecurityService.updateName({firstName: updateNameValue.firstName,
      lastName: updateNameValue.lastName}).subscribe(value => {
      this.alertManagerManager.addAlert('The modification has been done', 'alert-success');
      this.initData();
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });

  }

  updatePrivacy(): void {
    const updatePrivacyValue = this.updatePrivacyForm.value;

    this.userSecurityService.updatePrivacy({isPrivate: updatePrivacyValue.isPrivate}).subscribe(value => {
      this.alertManagerManager.addAlert('The modification has been done', 'alert-success');
      this.initData();
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });
  }

  updateAppearance(): void {
    const updateAppearanceValue = this.updateAppearanceForm.value;

    this.userSecurityService.updateAppearance({dark: updateAppearanceValue.dark}).subscribe(value => {
      this.alertManagerManager.addAlert('The modification has been done', 'alert-success');
      this.initData();
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });
  }

  setConfirmation(): void {
    this.userSecurityService.setConfirmAccount().subscribe(value => {
      this.alertManagerManager.addAlert('An email with instructions has been sent to you', 'alert-success');
      this.initData();
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });
  }

  setDelete(): void {
    const deleteValue = this.deleteForm.value;

    this.userSecurityService.setDeleteAccount({password: deleteValue.password}).subscribe(value => {
      this.alertManagerManager.addAlert('An email with instructions has been sent to you', 'alert-success');
      this.initData();
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });
  }

  setEmailAuth(): void {
    const emailAuthValue = this.emailAuthForm.value;

    this.userSecurityService.updateSecurity({emailAuth: emailAuthValue.emailAuth}).subscribe(value => {
      this.alertManagerManager.addAlert('The modification has been done', 'alert-success');
      this.initData();
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });
  }
}
