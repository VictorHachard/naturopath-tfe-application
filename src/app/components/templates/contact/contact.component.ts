import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {AbstractComponents} from '../../commons/AbstractComponents';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends AbstractComponents implements OnInit {

  contactForm: FormGroup;

  constructor(route: ActivatedRoute,
              router: Router,
              private userSecuritySecurity: UserSecurityService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.contactForm = new FormGroup({

    });
  }

  contact(): void {

  }
}
