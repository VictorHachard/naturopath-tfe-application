import {Component, OnInit} from '@angular/core';
import {AlertManager} from '../../../model/my/AlertManager';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  alertManagerManager: AlertManager;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.userSecurityService.confirmAccount({token: this.route.snapshot.paramMap.get('token')}).subscribe(value => {
      this.alertManagerManager.addAlert('You account has been validated', 'alert-success');
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });
  }
}
