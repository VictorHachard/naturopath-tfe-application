import {ActivatedRoute, Router} from '@angular/router';
import {AbstractComponents} from './AbstractComponents';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export class AbstractTicket extends AbstractComponents {
  id: string;
  username = JSON.parse(localStorage.getItem('currentUser')).username;
  ticketMessageForm: FormGroup;
  ticketCloseForm: FormGroup;
  ticketList: any;

  constructor(protected route: ActivatedRoute,
              protected router: Router) {
    super(route, router);
    this.id = this.route.snapshot.paramMap.get('id');
  }

  init(): void {
    this.ticketMessageForm = new FormGroup({
      content: new FormControl('',
        [Validators.required, Validators.minLength(32), Validators.maxLength(1024)])
    });
    this.ticketCloseForm = new FormGroup({
      check: new FormControl(false, [Validators.required])
    });
  }



}
