import {Component, OnDestroy, Renderer2} from '@angular/core';
import {UserSecurityService} from './service/security/UserSecurity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'tfe-application';

  constructor(private renderer: Renderer2, private userSecurityService: UserSecurityService) {
    this.userSecurityService.isLoggedIn().subscribe(value => {
      this.switchTheme();
    });
    this.userSecurityService.settingsChange().subscribe(value => {
      this.switchTheme();
    });
  }

  private switchTheme(): void {
    if (localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).dark) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'dark');
  }
}
