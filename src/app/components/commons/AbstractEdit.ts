import {AbstractComponents} from './AbstractComponents';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {UserSecurityService} from '../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

export class AbstractEdit extends AbstractComponents {
  messageInnerForm: UntypedFormGroup;

  constructor() {
    super();
  }

  init(): void {
    this.messageInnerForm = new UntypedFormGroup({
      content: new UntypedFormControl('',
        [Validators.required, Validators.minLength(8), Validators.maxLength(2048)])
    });
  }

  canVote(inner: any): boolean {
    if (JSON.parse(localStorage.getItem('currentUser')).roleList.includes('ROLE_OWNER')) {
      return true;
    }
    if (!JSON.parse(localStorage.getItem('currentUser')).roleList.includes('ROLE_ADMINISTRATOR') ||
      inner.user.username === JSON.parse(localStorage.getItem('currentUser')).username) { //TODO error c'est du tag en question
      return false;
    }
    for (const vote of inner.voteList) {
      if (vote.user.username === JSON.parse(localStorage.getItem('currentUser')).username) {
        return false;
      }
    }
    return true;
  }

  userColor(UserId: number, Inner: any): string {
    if (Inner.user.id === UserId) {
      return 'primary';
    }
    for (const vote of Inner.voteList) {
      if (vote.user.id === UserId) {
        return vote.choice === 1 ? 'success' : 'danger';
      }
    }
    return 'info';
  }

}
