import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertManager} from '../../../../model/my/AlertManager';
import {User} from '../../../../model/view/User';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  param: string;
  user: any;
  alertManagerManager: AlertManager;

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
    this.alertManagerManager = new AlertManager();
    this.param = this.route.snapshot.paramMap.get('param');
  }

  initData(): void {
    this.userSecurityService.getEditDto().subscribe(value => {
      this.user = value;
      this.userSecurityService.change.next(true);
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
      username: updateUsernameEmailValue.username}).subscribe(value => {
        this.alertManagerManager.addAlert('The modification has been done', 'alert-success');
        const user: User = value;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.initData();
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger'); //TODO check email
    });
  }

  updateName(): void {
    const updateNameValue = this.updateNameForm.value;

    this.userSecurityService.updateName({firstName: updateNameValue.firstName,
      lastName: updateNameValue.lastName}).subscribe(data => {
      this.alertManagerManager.addAlert('The modification has been done', 'alert-success');
      this.initData();
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });

  }

  updatePrivacy(): void {
    const updatePrivacyValue = this.updatePrivacyForm.value;

    this.userSecurityService.updatePrivacy({isPrivate: updatePrivacyValue.isPrivate}).subscribe(data => {
      this.alertManagerManager.addAlert('The modification has been done', 'alert-success');
      this.initData();
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });
  }

  updateAppearance(): void {
    const updateAppearanceValue = this.updateAppearanceForm.value;

    this.userSecurityService.updateAppearance({dark: updateAppearanceValue.dark}).subscribe(data => {
      this.userSecurityService.dark.next(updateAppearanceValue.dark);
      this.alertManagerManager.addAlert('The modification has been done', 'alert-success');
      this.initData();
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });
  }

  setConfirmation(): void {
    this.userSecurityService.setConfirmAccount().subscribe(data => {
      this.alertManagerManager.addAlert('An email with instructions has been sent to you', 'alert-success');
      this.initData();
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });
  }

  setDelete(): void {
    const deleteValue = this.deleteForm.value;

    this.userSecurityService.setDeleteAccount({password: deleteValue.password}).subscribe(data => {
      this.alertManagerManager.addAlert('An email with instructions has been sent to you', 'alert-success');
      this.initData();
    }, error => {
      console.log(error);
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });
  }
}
