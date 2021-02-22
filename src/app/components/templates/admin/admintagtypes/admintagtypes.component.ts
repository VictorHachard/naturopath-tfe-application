import {Component, OnInit} from '@angular/core';
import {TagTypeService} from '../../../../service/TagType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admintagtypes',
  templateUrl: './admintagtypes.component.html',
  styleUrls: ['./admintagtypes.component.css']
})
export class AdmintagtypesComponent extends AbstractComponents implements OnInit {
  tagTypes: any[];

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private tagTypeService: TagTypeService) {
    super();
  }

  ngOnInit(): void {
    this.tagTypeService.getAllTagType().subscribe(data => {
      this.tagTypes = data;
      console.log(this.tagTypes);
    });
  }

}
