import {Component, Injector, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../../service/Category.service';
import {Category} from '../../../../model/view/Category';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent extends AbstractComponents implements OnInit {
  addCategoryForm: UntypedFormGroup;
  categories: Category[];

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
    super();
  }

  ngOnInit(): void {
    this.categoryService.getAllParentCategoryDto().subscribe(data => {
      this.categories = data;
      this.init();
    });
  }

  init(): void {
    this.addCategoryForm = new UntypedFormGroup({
      isParent: new UntypedFormControl(false),
      category: new UntypedFormControl('No category', Validators.required),
      name: new UntypedFormControl('Lorem ipsum dolor.', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new UntypedFormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    });
  }

  addCategory(): void {
    const addCategoryValue = this.addCategoryForm.value;
    let categoryId: number;

    if (addCategoryValue.category === 'No category') {
      this.categoryService.addCategory({description: addCategoryValue.description,
        isParent: addCategoryValue.isParent,
        name: addCategoryValue.name}).subscribe(value => {
        this.router.navigate(['/editcategory/' + value.toString()]);
      });
    } else {
      this.categories.forEach(value => {
        if (addCategoryValue.category === value.name) {
          categoryId = value.id;
        }
      });
      this.categoryService.addCategory({description: addCategoryValue.description,
        isParent: addCategoryValue.isParent,
        name: addCategoryValue.name,
        parentCategoryId: categoryId.toString()}).subscribe(value => {
        this.router.navigate(['/editcategory/' + value.toString()]);
      });
    }
  }
}
