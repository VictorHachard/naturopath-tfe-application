import {Component, OnInit} from '@angular/core';
import {ParatagTypeService} from '../../../../service/ParatagType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-adminparatagtypes',
  templateUrl: './adminparatagtypes.component.html',
  styleUrls: ['./adminparatagtypes.component.css']
})
export class AdminparatagtypesComponent extends AbstractComponents implements OnInit {
  paratagTypes: any[];

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private paratagtypeService: ParatagTypeService) {
    super();
  }

  ngOnInit(): void {
    this.paratagtypeService.getAllParatagType().subscribe(data => {
      this.paratagTypes = data;
      console.log(this.paratagTypes);
    });
  }

}
