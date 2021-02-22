import {AbstractComponents} from './AbstractComponents';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

export class AbstractTicket extends AbstractComponents {
    username = JSON.parse(localStorage.getItem('currentUser')).username;
  ticketMessageForm: FormGroup;
  ticketCloseForm: FormGroup;
  ticketList: any;

  constructor() {
    super();
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
