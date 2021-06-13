import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../../../service/Ticket.service';
import {AbstractTicket} from '../../../commons/AbstractTicket';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-adminticket',
  templateUrl: './adminticket.component.html',
  styleUrls: ['./adminticket.component.css']
})
export class AdminticketComponent extends AbstractTicket implements OnInit {
  id: string;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private ticketService: TicketService) {
    super();
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id === null) {
      this.ticketService.getAllOpen().subscribe(value => {
        this.ticketList = value;
        this.init();
      });
    } else {
      this.ticketService.get(this.id).subscribe(value => {
        this.ticketList = value;
        this.init();
      });
    }
  }

  init(): void {
    super.init();
  }

  addMessage(): void {
    const ticketMessageValue = this.ticketMessageForm.value;
    this.ticketService.addMessage(this.id.toString(), {
      content: ticketMessageValue.content
    }).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  close(): void {
    this.ticketService.close(this.id.toString()).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }
}
