import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private router: Router, private userSecurity: UserSecurityService) { }

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
