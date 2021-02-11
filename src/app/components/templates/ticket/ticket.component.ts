import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../../service/Ticket.service';
import {AbstractTicket} from '../../commons/AbstractTicket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent extends AbstractTicket implements OnInit {
  constructor(route: ActivatedRoute,
              router: Router,
              private ticketService: TicketService) {
    super(route, router);
  }

  ngOnInit(): void {
    if (this.id === null) {
      this.ticketService.getAllForCurrentUser().subscribe(value => {
        console.log(value);
        this.ticketList = value;
        this.init();
      });
    } else {
      this.ticketService.getForCurrentUser(this.id).subscribe(value => {
        console.log(value);
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
