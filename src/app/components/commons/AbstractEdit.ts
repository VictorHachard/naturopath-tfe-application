import {ActivatedRoute, Router} from '@angular/router';
import {AbstractComponents} from './AbstractComponents';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export class AbstractEdit extends AbstractComponents {
  id: string;
  messageInnerForm: FormGroup;

  constructor(protected route: ActivatedRoute,
              protected router: Router) {
    super(route, router);
    this.id = this.route.snapshot.paramMap.get('id');
  }

  init(): void {
    this.messageInnerForm = new FormGroup({
      content: new FormControl('',
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