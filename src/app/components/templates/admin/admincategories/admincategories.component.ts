import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../../service/Category.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admincategories',
  templateUrl: './admincategories.component.html',
  styleUrls: ['./admincategories.component.css']
})
export class AdmincategoriesComponent extends AbstractComponents implements OnInit {
  categories: any[];

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
    super();
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }

}
