import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertManager} from '../../../../model/my/AlertManager';
import {User} from '../../../../model/view/User';
import {AbstractComponents} from '../../../commons/AbstractComponents';

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

  updateUsernameEmailForm: FormGroup;
  updateNameForm: FormGroup;
  updatePrivacyForm: FormGroup;
  updateAppearanceForm: FormGroup;
  deleteForm: FormGroup;
  confirmForm: FormGroup;
  emailAuthForm: FormGroup;

  constructor(route: ActivatedRoute,
              router: Router,
              private userSecurityService: UserSecurityService) {
    super(route, router);
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
      console.log(this.user);
    });
  }

  init(): void {
    this.updateUsernameEmailForm = new FormGroup({
      username: new FormControl(this.user.username, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl('',  Validators.required)
    });

    this.updateNameForm = new FormGroup({
      firstName: new FormControl(this.user.firstName !== null ? this.user.firstName : ''),
      lastName: new FormControl(this.user.lastName !== null ? this.user.lastName : '')
    });

    this.deleteForm = new FormGroup({
      password: new FormControl('',  Validators.required)
    });

    this.updatePrivacyForm = new FormGroup({
      isPrivate: new FormControl(this.user.isPrivate)
    });

    this.emailAuthForm = new FormGroup({
      emailAuth: new FormControl(this.user.emailAuth)
    });

    this.updateAppearanceForm = new FormGroup({
      dark: new FormControl(this.user.dark)
    });

    this.confirmForm = new FormGroup({});
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
      console.log(error);
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
