import {Component, OnInit} from '@angular/core';
import {ParagraphTypeService} from '../../../../service/ParagraphType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-adminparagraphtypes',
  templateUrl: './adminparagraphtypes.component.html',
  styleUrls: ['./adminparagraphtypes.component.css']
})
export class AdminparagraphtypesComponent extends AbstractComponents implements OnInit {

  parapgraphTypes: any[];

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private paragraphTypeService: ParagraphTypeService) {
    super();
  }

  ngOnInit(): void {
    this.paragraphTypeService.getAllParagraphType().subscribe(data => {
      this.parapgraphTypes = data;
      console.log(this.parapgraphTypes);
    });
  }

}
