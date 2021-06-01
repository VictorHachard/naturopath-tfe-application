import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../../service/Category.service';
import {Category} from '../../../../model/view/Category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageService} from '../../../../service/Page.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-addpageselectcategory',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.css']
})
export class AddpageComponent extends AbstractComponents implements OnInit {

  addPageForm: FormGroup;
  categories: Category[];

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private pageService: PageService) {
    super();
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(value => {
      this.categories = value;
      console.log(this.categories);
      this.init();
    });
  }

  init(): void {
    this.addPageForm = new FormGroup({
      category: new FormControl('none', Validators.required),
      title: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      description: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]),
    });
  }

  addPage(): void {
    const addPageValue = this.addPageForm.value;
    let categoryId: number;

    this.categories.forEach(value => {
      if (addPageValue.category === value.name) {
        categoryId = value.id;
      }
    });

    this.pageService.addPage({categoryId: categoryId.toString(),
      description: addPageValue.description,
      title: addPageValue.title}).subscribe(value => {
        this.router.navigate(['/editpage/' + value.toString()]);
    });
  }
}
