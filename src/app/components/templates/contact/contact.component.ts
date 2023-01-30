import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {TicketService} from '../../../service/Ticket.service';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends AbstractComponents implements OnInit {
  ticketForm: UntypedFormGroup;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private ticketService: TicketService) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.ticketForm = new UntypedFormGroup({
      subject: new UntypedFormControl('',
        [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      content: new UntypedFormControl('',
        [Validators.required, Validators.minLength(32), Validators.maxLength(1024)]),
    });
  }

  addTicket(): void {
    const ticketValue = this.ticketForm.value;
    this.ticketService.addTicket({
      content: ticketValue.content,
      subject: ticketValue.subject}).subscribe(value => {
        this.router.navigate(['/ticket']);
    }, error => {

    });
  }
}
