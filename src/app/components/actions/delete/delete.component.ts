import {Component, OnInit} from '@angular/core';
import {AlertManager} from '../../../model/my/AlertManager';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  alertManagerManager: AlertManager;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.userSecurityService.deleteAccount({token: this.route.snapshot.paramMap.get('token')}).subscribe(value => {
      this.alertManagerManager.addAlert('You account has been deleted', 'alert-success');
      this.logOut();
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.cookieService.delete('remember');
    this.userSecurityService.logger.next(false);
    this.userSecurityService.dark.next(false);
    this.router.navigate(['/home']);
  }
}
