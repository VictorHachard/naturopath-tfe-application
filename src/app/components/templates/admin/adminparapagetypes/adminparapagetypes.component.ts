import {Component, OnInit} from '@angular/core';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-adminparapagetypes',
  templateUrl: './adminparapagetypes.component.html',
  styleUrls: ['./adminparapagetypes.component.css']
})
export class AdminparapagetypesComponent extends AbstractComponents implements OnInit {

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
  }

}
