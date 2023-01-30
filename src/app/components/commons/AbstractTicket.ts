import {AbstractComponents} from './AbstractComponents';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

export class AbstractTicket extends AbstractComponents {
    username = JSON.parse(localStorage.getItem('currentUser')).username;
  ticketMessageForm: UntypedFormGroup;
  ticketCloseForm: UntypedFormGroup;
  ticketList: any;

  constructor() {
    super();
  }

  init(): void {
    this.ticketMessageForm = new UntypedFormGroup({
      content: new UntypedFormControl('',
        [Validators.required, Validators.minLength(32), Validators.maxLength(1024)])
    });
    this.ticketCloseForm = new UntypedFormGroup({
      check: new UntypedFormControl(false, [Validators.required])
    });
  }



}
